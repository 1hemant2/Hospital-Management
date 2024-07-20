import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { Doctor } from "../models/Doctor";
import { Patient } from "../models/Patient";
const doctorRepository = AppDataSource.getRepository(Doctor);
const patientRepository = AppDataSource.getRepository(Patient);
import { StatusCodes } from "http-status-codes";

/**constat */
let statusCode: number;
let message: string;
let success: boolean;

/**
 * Retrieves user details based on the provided ID.
 *
 * This function checks if a user with the specified `id` exists in either the `doctorRepository` or `patientRepository`.
 * If the user is found in the `doctorRepository`, it returns the doctor's details. If the user is found in the `patientRepository`,
 * it returns the patient's details. If the user is not found in either repository, it returns a "user doesn't exist" message.
 *
 * @param {Request} req - The request object, containing the user `id` in the body.
 * @param {Response} res - The response object used to send the response.
 * @returns {Promise<void>} - A promise that resolves when the user details have been retrieved and the response has been sent.
 *
 * @throws {Error} - If an error occurs during the retrieval of user details or if the user does not exist.
 */

export const userDetails = async (req: Request, res: Response) => {
    try {
        const input = req.body;
        const doctor = await doctorRepository.findOne({ where: { id: input.id } });
        const patient = await patientRepository.findOne({ where: { id: input.id } });
        if (doctor) {
            res.status(StatusCodes.OK).send({ data: doctor, success: true });
        } else if (patient) {
            res.status(StatusCodes.OK).send({ data: patient, success: true });
        } else {
            message = "user doesn't exist";
            statusCode = StatusCodes.NOT_FOUND;
            success = false;
            throw { message, StatusCodes, success }
        }
    } catch (error: any) {
        statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
        res.status(error.statusCode).send({ message: message || 'something went wrong', success: false })
    }
}