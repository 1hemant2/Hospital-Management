import { Request, Response } from "express";
import multer, { FileFilterCallback } from 'multer';
import path from "path";
import { StatusCodes } from "http-status-codes";
import cloudinary from "../config/cloudinary";
import fs from "fs";
import { Pdf } from "../models/Pdf";
import { AppDataSource } from "../config/data-source";
const pdfRepository = AppDataSource.getRepository(Pdf);


/**
 * Function to store PDF to Cloudinary.
 * 
 * @param {string} filePath - The path of the file to be uploaded.
 * @returns {Promise<string>} If successful, returns the URL of the uploaded PDF; otherwise, throws an error message.
 * @throws {Error} If the file upload fails.
 */

const uploadToCloud = async (filePath: any): Promise<string> => {
    try {
        const result = await cloudinary.uploader.upload(filePath, {
            folder: 'doctorPdf'
        });
        return result.secure_url;
    } catch (error) {
        throw new Error('Failed to upload file to Cloudinary');
    }
};

/**
 * Multer configuration for setting the destination and filename of the uploaded file.
 * 
 * @returns {void} Configures multer with the destination and filename for storing the uploaded PDF.
 */
const storage = multer.diskStorage({
    destination: 'pdfUpload',
    filename: function (req: Request, file: Express.Multer.File, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.originalname + '-' + uniqueSuffix);
    }
})

/**
 * Function to check if the uploaded file is of type PDF.
 * 
 * @param {Express.Multer.File} file - The file to be checked.
 * @param {FileFilterCallback} cb - The callback to be called after the check.
 * @returns {void} Calls the callback with an error if the file is not a PDF.
 */
const checkFileType = (file: Express.Multer.File, cb: FileFilterCallback): void => {
    const extname = path.extname(file.originalname).toLowerCase();
    if (extname === '.pdf') {
        cb(null, true);
    } else {
        cb(new Error('Error: PDFs Only!'));
    }
}

/**
 * Multer configuration to ensure a single PDF file is selected and accepted.
 * 
 * @returns {void} Configures multer with storage and file filter for uploading a single PDF.
 */

const upload = multer({
    storage: storage,
    fileFilter: function (req: Request, file: Express.Multer.File, cb: FileFilterCallback) {
        checkFileType(file, cb);
    }
}).single('pdf');



/**
 * Function to handle PDF upload and store it on the server.
 * 
 * @param {Request} req - The request object containing the file to be uploaded.
 * @param {Response} res - The response object.
 * @returns {Promise<string | { message: string, success: boolean, fileName: string }>} If successful, returns the URL of the uploaded PDF; otherwise, returns an error message.
 * @throws {Error} If the file upload fails.
 */

const uploadPdf = async (req: Request, res: Response) => {
    try {
        const result = await new Promise<string | { message: string, success: boolean, fileName: string }>((resolve, reject) => {
            upload(req, res, (err) => {
                if (err instanceof multer.MulterError) {
                    return reject({ message: err.message, fileName: '', success: false });
                } else if (err) {
                    return reject({ message: err.message, fileName: '', success: false });
                } else {
                    if (req.file === undefined) {
                        return reject({ message: 'No file selected', fileName: '', success: false });
                    } else {
                        const filePath = path.join(__dirname, '../../', 'pdfUpload', req.file.filename);
                        const fileName = req.file.originalname;
                        uploadToCloud(filePath)
                            .then((url) => {
                                fs.unlink(filePath, (err) => {
                                    if (err) throw err;
                                });
                                return resolve({ message: url, fileName: fileName, success: true });
                            })
                            .catch((uploadError) => {
                                return reject({ message: uploadError.message, fileName: '', success: false });
                            });
                    }
                }
            });
        });
        return result;
    } catch (error: any) {
        return error;
    }
};

/**
 * upload a pdf.
 * 
 * @returns If successful, returns a success message; otherwise, returns an error message with status code.
 * @route POST /doctor/upload
 * @param {Request.body} req.body {pdf-file,id->by authMiddleware} - upload pdf to cloud
 * @returns {Doctor} 201 - Created doctor object
 * @returns {string} 500 - something went wrong
 */
export const uploadDrFile = async (req: Request, res: Response) => {
    try {
        const id = req.body.id;
        const data = await uploadPdf(req, res);
        if (!data.success) {
            res.status(StatusCodes.BAD_REQUEST).send(data.message);
        } else {
            const result = pdfRepository.create({
                doctor: id,
                filePath: data.message,
                name: data.fileName
            })
            await pdfRepository.save(result);
            res.status(StatusCodes.CREATED).send({ message: 'pdf uploaded successfully', success: true });
        }
    } catch (error: any) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error.message);
    }
}

/**
 * Uploads a PDF file for a doctor.
 *
 * This function handles the upload of a PDF file for a doctor specified by the `id` in the request body.
 * It uses the `uploadPdf` function to handle the file upload and saves the file information in the `pdfRepository`.
 *
 * @param {Request} req - The request object, containing the `id` of the doctor in the body.
 * @param {Response} res - The response object used to send the response.
 * @returns {Promise<void>} - A promise that resolves when the file has been uploaded and the response has been sent.
 *
 * @throws {Error} - If an error occurs during the file upload or saving the file information.
 */
export const getDrFile = async (req: Request, res: Response) => {
    try {
        const id = req.body.id;
        let page: number = parseInt(req.params.pageNo);
        const data = await pdfRepository.find({
            where: { doctor: { id: id } },
            skip: (page - 1) * 4,
            take: 4,
            order: {
                createdAt: "DESC"
            }
        });

        res.status(StatusCodes.OK).send({ success: true, data: data });
    } catch (error) {
        // console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ success: false, message: 'something went wrong' });
    }
}

/**
 * Searches for a PDF file for a doctor by name.
 *
 * This function handles the search for a PDF file based on the doctor's `id` in the request body
 * and the `name` query parameter. It retrieves the file information from the `pdfRepository`.
 *
 * @param {Request} req - The request object, containing the `id` of the doctor in the body and the `name` of the file in the query parameters.
 * @param {Response} res - The response object used to send the response.
 * @returns {Promise<void>} - A promise that resolves when the search is complete and the response has been sent.
 *
 * @throws {Error} - If an error occurs during the search or if the file name is not provided.
 */

export const searchDrFile = async (req: Request, res: Response) => {
    try {
        const id = req.body.id;
        const input: string = req.query.name as string;
        if (!input) {
            throw { statusCode: StatusCodes.NOT_FOUND, message: 'No file found' }
        }
        const data = await pdfRepository.find({
            where: { doctor: { id: id }, name: input },
        });
        return res.status(StatusCodes.OK).send({ success: true, data: data });
    } catch (error: any) {
        const statuCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
        res.status(statuCode).send({ success: false, mesage: error.message || 'Something went wrong' });
    }
}

/**
 * Retrieves the total number of pages of PDF files for a doctor.
 *
 * This function calculates the total number of pages based on the number of PDF files associated with the doctor
 * specified by the `id` in the request body. Each page contains up to 4 files.
 *
 * @param {Request} req - The request object, containing the `id` of the doctor in the body.
 * @param {Response} res - The response object used to send the response.
 * @returns {Promise<void>} - A promise that resolves when the total number of pages has been calculated and the response has been sent.
 *
 * @throws {Error} - If an error occurs during the retrieval of PDF files.
 */

export const getTotalPage = async (req: Request, res: Response) => {
    try {
        const id = req.body.id;
        const data = await pdfRepository.find({
            where: { doctor: { id: id } },
        });
        const sz = data.length % 4 === 0 ? data.length / 4 : (data.length / 4) + 1;
        res.status(StatusCodes.OK).send({ success: true, data: sz });
    } catch (error) {
        // console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ success: false, message: 'something went wrong' });
    }
}