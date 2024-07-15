import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { Doctor } from "../models/Doctor";
const doctorRepository = AppDataSource.getRepository(Doctor);
import { StatusCodes } from "http-status-codes";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

/**
 * constants
 */
let statusCode: number;
let message: string;

/**
 * Create a new doctor.
 * 
 * @returns If successful, returns a JSON object containing the created doctor; otherwise, returns an error message with status code.
 * @route POST /doctor/register
 * @param {Request.body} req.body {name,email,password,specialty} - Doctor information to create 
 * @returns {Doctor} 201 - Created doctor object
 * @returns {string} 409 - Conflict if the doctor already exists
 * @returns {string} 500 - Internal server error
 */

export const createDoctor = async (req: Request, res: Response) => {
    try {
        const input = req.body;
        const doctor = await doctorRepository.findOne({ where: { email: input.email } });
        if (!doctor) {
            const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!regex.test(input.email)) {
                throw { message: 'Please enter a valid email', statusCode: StatusCodes.BAD_REQUEST };
            }
            if (input.password.length < 4) {
                throw { message: 'password length must be 4 digit', statusCode: StatusCodes.BAD_REQUEST };
            }
            input.password = await bcrypt.hash(input.password, 10);
            const newDoctor = doctorRepository.create(input);
            await doctorRepository.save(newDoctor);
            res.status(StatusCodes.CREATED).send(newDoctor);
        } else {
            throw { message: 'Doctor already exist', statusCode: StatusCodes.CONFLICT };
        }
    } catch (error: any) {
        message = error.message || 'Something went wrong';
        statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
        res.status(statusCode).send(message);
    }
}

/**
 * get a Doctor.
 * @returns If successful, returns a JSON object containing the message successfull and jwt token; otherwise, returns an error message with status code.
 * @route POST /doctor/login
 * @param {Request.body} req.body {email,password} - to validate doctor
 * @returns {object} 200 - login successfull
 * @returns {string} 401 - unauthorized doctor
 * @returns {string} 500 - Internal server error
 * @returns {string} 404 - doctor doesn't exist
 */

export const getDoctor = async (req: Request, res: Response) => {
    try {
        interface doctorPayload {
            id: string;
            email: string;
        }
        const input = req.body;
        const doctor = await doctorRepository.findOne({ where: { email: input.email } });
        if (doctor) {
            const result = await bcrypt.compare(input.password, doctor.password);
            if (result) {
                const doctorPayload: doctorPayload = {
                    id: doctor.id,
                    email: doctor.email
                };
                const secretKey: string = process.env.SECRET_KEY || "dasfas";
                const token = jwt.sign(doctorPayload, secretKey, { expiresIn: '30d' });
                res.status(StatusCodes.OK).send({ message: 'login successful', token });
            } else {
                throw { message: 'Invalid doctorname or password.', statusCode: StatusCodes.UNAUTHORIZED }
            }
        } else {
            throw { message: `Doctor doesn't exist`, statusCode: StatusCodes.NOT_FOUND }
        }
    } catch (error: any) {
        statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR
        message = error.message || 'Something went wrong';
        res.status(statusCode).send(message);
    }
}