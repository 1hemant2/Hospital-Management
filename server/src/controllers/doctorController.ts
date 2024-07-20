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
 * Creates a new doctor record.
 * 
 * This function performs the following operations:
 * - Extracts the doctor details from the request body.
 * - Checks if a doctor with the provided email already exists in the repository.
 * - Validates the email format and password length; if invalid, throws a `BAD_REQUEST` error.
 * - Hashes the password using `bcrypt` for secure storage.
 * - Prefixes the doctor's first name with "Dr.".
 * - Creates and saves the new doctor record in the repository.
 * - Returns the newly created doctor record with a status of `CREATED` if successful.
 * - If a doctor with the same email already exists, throws a `CONFLICT` error.
 * - Handles errors and sends an appropriate response with a default `INTERNAL_SERVER_ERROR` status if no status code is provided.
 * 
 * @param {Request} req - The request object containing the doctor details in the request body.
 * @param {Response} res - The response object used to send the result or error response.
 * 
 * @throws {Object} - Throws an error with status code `BAD_REQUEST` and a message if the email is invalid or password length is insufficient.
 * @throws {Object} - Throws an error with status code `CONFLICT` and a message if a doctor with the same email already exists.
 * @throws {Object} - Throws an error with status code `INTERNAL_SERVER_ERROR` and a message for unexpected internal errors.
 * 
 * @returns {void} - A JSON response with the newly created doctor record and a success flag.
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
            input.firstName = 'Dr.' + input.firstName;
            const newDoctor = doctorRepository.create(input);
            await doctorRepository.save(newDoctor);
            res.status(StatusCodes.CREATED).send({ newDoctor, success: true });
        } else {
            throw { message: 'Doctor already exist', statusCode: StatusCodes.CONFLICT };
        }
    } catch (error: any) {
        message = error.message || 'Something went wrong';
        statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
        res.status(statusCode).send({ message, success: false });
    }
}

/**
 * Authenticates a doctor based on the provided email and password.
 * 
 * This function performs the following operations:
 * - Extracts doctor credentials (email and password) from the request body.
 * - Searches for a doctor in the repository with the provided email.
 * - If the doctor is found, compares the provided password with the stored hashed password using `bcrypt`.
 * - If the password matches, generates a JWT token with the doctor's ID and email, and sends a success response with the token.
 * - If the password does not match, throws an `UNAUTHORIZED` error with a message indicating invalid credentials.
 * - If the doctor is not found, throws a `NOT_FOUND` error with a message indicating that the doctor does not exist.
 * - Handles errors and sends an appropriate response with a default `INTERNAL_SERVER_ERROR` status if no status code is provided.
 * 
 * @param {Request} req - The request object containing the doctor's email and password in the request body.
 * @param {Response} res - The response object used to send the result or error response.
 * 
 * @throws {Object} - Throws an error with status code `UNAUTHORIZED` and a message if the password is invalid.
 * @throws {Object} - Throws an error with status code `NOT_FOUND` and a message if no doctor is found with the provided email.
 * @throws {Object} - Throws an error with status code `INTERNAL_SERVER_ERROR` and a message for unexpected internal errors.
 * 
 * @returns {void} - A JSON response with a success flag, a message indicating login success, and a JWT token if authentication is successful.
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
                res.status(StatusCodes.OK).send({ message: 'login successful', token, success: true });
            } else {
                throw { message: 'Invalid email or password.', statusCode: StatusCodes.UNAUTHORIZED }
            }
        } else {
            throw { message: `Doctor doesn't exist`, statusCode: StatusCodes.NOT_FOUND }
        }
    } catch (error: any) {
        statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR
        message = error.message || 'Something went wrong';
        res.status(statusCode).send({ message, success: false });
    }
}