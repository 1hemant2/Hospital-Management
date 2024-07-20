import { Patient } from "../models/Patient";
import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
const patientRepository = AppDataSource.getRepository(Patient);
import { StatusCodes } from "http-status-codes";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

/**
 * constants
 */
let statusCode: number;
let message: string;

/**
 * Creates a new patient record.
 * 
 * This function performs the following operations:
 * - Extracts patient details from the request body.
 * - Checks if a patient with the provided email already exists in the repository.
 * - Validates the email format and password length; if invalid, throws a `BAD_REQUEST` error.
 * - Hashes the password using `bcrypt` for secure storage.
 * - Creates and saves the new patient record in the repository.
 * - Returns the newly created patient record with a status of `CREATED` if successful.
 * - If a patient with the same email already exists, throws a `CONFLICT` error.
 * - Handles errors and sends an appropriate response with a default `INTERNAL_SERVER_ERROR` status if no status code is provided.
 * 
 * @param {Request} req - The request object containing the patient details in the request body.
 * @param {Response} res - The response object used to send the result or error response.
 * 
 * @throws {Object} - Throws an error with status code `BAD_REQUEST` and a message if the email is invalid or password length is insufficient.
 * @throws {Object} - Throws an error with status code `CONFLICT` and a message if a patient with the same email already exists.
 * @throws {Object} - Throws an error with status code `INTERNAL_SERVER_ERROR` and a message for unexpected internal errors.
 * 
 * @returns {void} - A JSON response with the newly created patient record and a success flag.
 */

export const createPatient = async (req: Request, res: Response) => {
    try {
        const input = req.body;
        const patient = await patientRepository.findOne({ where: { email: input.email } });
        if (!patient) {
            const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!regex.test(input.email)) {
                throw { message: 'Please enter a valid email', statusCode: StatusCodes.BAD_REQUEST };
            }
            if (input.password.length < 4) {
                throw { message: 'password length must be 4 digit', statusCode: StatusCodes.BAD_REQUEST };
            }
            input.password = await bcrypt.hash(input.password, 10);
            const newPatient = patientRepository.create(input);
            await patientRepository.save(newPatient);
            res.status(StatusCodes.CREATED).send({ newPatient, success: true });
        } else {
            throw { message: 'Patient already exist', statusCode: StatusCodes.CONFLICT };
        }
    } catch (error: any) {
        message = error.message || 'Something went wrong';
        statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
        res.status(statusCode).send({ message, success: false });
    }
}

/**
 * Authenticates a patient based on the provided email and password.
 * 
 * This function performs the following operations:
 * - Extracts patient credentials (email and password) from the request body.
 * - Searches for a patient in the repository with the provided email.
 * - If the patient is found, compares the provided password with the stored hashed password using `bcrypt`.
 * - If the password matches, generates a JWT token with the patient's ID and email, and sends a success response with the token.
 * - If the password does not match, throws an `UNAUTHORIZED` error with a message indicating invalid credentials.
 * - If the patient is not found, throws a `NOT_FOUND` error with a message indicating that the patient does not exist.
 * - Handles errors and sends an appropriate response with a default `INTERNAL_SERVER_ERROR` status if no status code is provided.
 * 
 * @param {Request} req - The request object containing the patient's email and password in the request body.
 * @param {Response} res - The response object used to send the result or error response.
 * 
 * @throws {Object} - Throws an error with status code `UNAUTHORIZED` and a message if the password is invalid.
 * @throws {Object} - Throws an error with status code `NOT_FOUND` and a message if no patient is found with the provided email.
 * @throws {Object} - Throws an error with status code `INTERNAL_SERVER_ERROR` and a message for unexpected internal errors.
 * 
 * @returns {void} - A JSON response with a success flag, a message indicating login success, and a JWT token if authentication is successful.
 */

export const getPatient = async (req: Request, res: Response) => {
    try {
        interface doctorPayload {
            id: string;
            email: string;
        }
        const input = req.body;
        const patient = await patientRepository.findOne({ where: { email: input.email } });
        if (patient) {
            const result = await bcrypt.compare(input.password, patient.password);
            if (result) {
                const doctorPayload: doctorPayload = {
                    id: patient.id,
                    email: patient.email
                };
                const secretKey: string = process.env.SECRET_KEY || "dasfas";
                const token = jwt.sign(doctorPayload, secretKey, { expiresIn: '30d' });
                res.status(StatusCodes.OK).send({ message: 'login successful', token, success: true });
            } else {
                throw { message: 'Invalid patient email or password.', statusCode: StatusCodes.UNAUTHORIZED }
            }
        } else {
            throw { message: `Patient doesn't exist`, statusCode: StatusCodes.NOT_FOUND }
        }
    } catch (error: any) {
        statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR
        message = error.message || 'Something went wrong';
        res.status(statusCode).send({ message, success: false });
    }
}