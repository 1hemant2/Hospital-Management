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
 * function to store pdf to cloud.
 * 
 * @returns If successful, returns a url of pdf; otherwise, returns an error message .
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
 * function to set the destination of file in server.
 * 
 * @returns If successful, returns a void ; otherwise, returns an error message  .
 */
const storage = multer.diskStorage({
    destination: 'pdfUpload',
    filename: function (req: Request, file: Express.Multer.File, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
})

/**
 * function to check if file is type of pdf.
 * @params - {file}
 * @returns If successful, returns a void; otherwise, returns an error message .
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
 * function to ensure single pdf selected & accept.
 * @params -{storage,fileFilter}
 * @returns If successful, returns a void; otherwise, returns an error message .
 * 
 */

const upload = multer({
    storage: storage,
    fileFilter: function (req: Request, file: Express.Multer.File, cb: FileFilterCallback) {
        checkFileType(file, cb);
    }
}).single('pdf');


/**
 * function to store pdf to server.
 * 
 * @params {req.file}
 * @returns If successful, returns a url of pdf; otherwise, returns an error message .
 */

const uploadPdf = async (req: Request, res: Response) => {
    try {
        const result = await new Promise<string | { message: string, statusCode: number }>((resolve, reject) => {
            upload(req, res, (err) => {
                if (err instanceof multer.MulterError) {
                    return reject({ message: err.message, statusCode: StatusCodes.BAD_REQUEST });
                } else if (err) {
                    return reject({ message: err.message, statusCode: StatusCodes.BAD_REQUEST });
                } else {
                    if (req.file == undefined) {
                        return reject({ message: 'No file selected', statusCode: StatusCodes.BAD_REQUEST });
                    } else {
                        const filePath = path.join(__dirname, '../../', 'pdfUpload', req.file.filename);
                        uploadToCloud(filePath)
                            .then((url) => {
                                // console.log(url);
                                fs.unlink(filePath, (err) => {
                                    if (err) throw err;
                                });
                                return resolve(url);
                            })
                            .catch((uploadError) => {
                                return reject({ message: uploadError.message, statusCode: StatusCodes.INTERNAL_SERVER_ERROR });
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
        const url = await uploadPdf(req, res);
        const result = pdfRepository.create({
            doctor: id,
            filePath: url,
        })
        await pdfRepository.save(result);
        res.status(StatusCodes.CREATED).send('pdf uploaded successfully');
    } catch (error: any) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error.message);
    }
}