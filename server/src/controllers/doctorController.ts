import { Request, Response } from "express";
import { AppDataSource } from "../database/data-source";
import { Doctor } from "../models/Doctor";
const userRepository = AppDataSource.getRepository(Doctor);
import { StatusCodes } from "http-status-codes";
import bcrypt from 'bcrypt';

/**
 * Create a new doctor.
 * 
 * @returns If successful, returns a JSON object containing the created doctor; otherwise, returns an error message with status code.
 * @route POST /api/doctors
 * @param {Request.body} req.body {name,email,password,specialty} - Doctor information to create 
 * @returns {Doctor} 201 - Created doctor object
 * @returns {string} 409 - Conflict if the doctor already exists
 * @returns {string} 500 - Internal server error
 */

export const createDoctor = async (req: Request, res: Response) => {
    try {
        const input = req.body;
        const doctor = await userRepository.findOne({ where: { email: input.email } });
        if (!doctor) {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (regex.test(input.email)) {
                throw { message: 'Please enter a valid email', statusCode: StatusCodes.BAD_REQUEST };
            }
            if (input.password.length < 4) {
                throw { message: 'password length must be 4 digit', statusCode: StatusCodes.BAD_REQUEST };
            }
            input.password = await bcrypt.hash(input.password, 10);
            const newDoctor = userRepository.create(input);
            await userRepository.save(newDoctor);
            res.status(StatusCodes.CREATED).send(newDoctor);
        } else {
            throw { message: 'Doctor already exist', statusCode: StatusCodes.CONFLICT };
        }
    } catch (error: any) {
        const messsage = error.message || 'Something went wrong';
        const statuscode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
        res.status(statuscode).send(messsage);
    }
}

export const getDoctor = async (req: Request, res: Response) => {
    try {
        const input = req.body;
        const doctor = await userRepository.findOne({ where: { email: input.email } });
        if (doctor) {

        } else {

        }
    } catch (error) {

    }
}