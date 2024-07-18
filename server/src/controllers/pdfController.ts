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
        const result = await new Promise<string | { message: string, success: boolean }>((resolve, reject) => {
            upload(req, res, (err) => {
                if (err instanceof multer.MulterError) {
                    return reject({ message: err.message, success: false });
                } else if (err) {
                    return reject({ message: err.message, success: false });
                } else {
                    if (req.file === undefined) {
                        return reject({ message: 'No file selected', success: false });
                    } else {
                        const filePath = path.join(__dirname, '../../', 'pdfUpload', req.file.filename);
                        uploadToCloud(filePath)
                            .then((url) => {
                                // console.log(url);
                                fs.unlink(filePath, (err) => {
                                    if (err) throw err;
                                });
                                return resolve({ message: url, success: true });
                            })
                            .catch((uploadError) => {
                                return reject({ message: uploadError.message, success: false });
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
        // const name = req.body.name;
        const name = 'Hemant Resume';
        // console.log();
        // console.log('126', name);
        console.log(req.body);
        const url = await uploadPdf(req, res);
        // console.log(url);
        if (!url.success) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(url.message);
        } else {
            const result = pdfRepository.create({
                doctor: id,
                filePath: url.message,
                name: name
            })
            await pdfRepository.save(result);
            res.status(StatusCodes.CREATED).send('pdf uploaded successfully');
        }
    } catch (error: any) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error.message);
    }
}

export const getDrFile = async (req: Request, res: Response) => {
    try {
        const id = req.body.id;
        let page: number = parseInt(req.params.pageNo);
        const data = await pdfRepository.find({
            where: { doctor: { id: id } },
            skip: (page - 1) * 4,
            take: 4
        });

        res.status(StatusCodes.OK).send({ success: true, data: data });
    } catch (error) {
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ success: false, message: 'something went wrong' });
    }
}
export const getTotalPage = async (req: Request, res: Response) => {
    try {
        const id = req.body.id;
        const data = await pdfRepository.find({
            where: { doctor: { id: id } },
        });
        const sz = data.length % 4 === 0 ? data.length / 4 : (data.length / 4) + 1;
        res.status(StatusCodes.OK).send({ success: true, data: sz });
    } catch (error) {
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ success: false, message: 'something went wrong' });
    }
}