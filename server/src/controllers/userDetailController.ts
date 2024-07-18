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
        res.status(error.statusCode).send({ message, success })
    }
}