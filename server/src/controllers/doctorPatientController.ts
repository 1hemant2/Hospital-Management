import { DoctorPatient } from "../models/DoctorPatient";
import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
const DoctorPatientRepository = AppDataSource.getRepository(DoctorPatient);
import { StatusCodes } from "http-status-codes";

/**
 * constants
 */
let statusCode: number;
let message: string;

/**
 * Create a new patient.
 * 
 * @returns If successful, returns a JSON object containing the created doctor; otherwise, returns an error message with status code.
 * @route POST /doctorPatient/create
 * @param {Request.body} req.body {doctorId->authMiddleware,patientID} - DoctorPatient information to create 
 * @returns {createDoctorPatient} 201 - Created doctor object
 * @returns {string} 409 - Conflict if the doctor already exists
 * @returns {string} 500 - Internal server error
 */
export const createDoctorPatient = async (req: Request, res: Response) => {
    try {
        const doctorId = req.body.id;
        const patientId = req.body.patientId;
        const relation = await DoctorPatientRepository.findOne({ where: { doctor: doctorId, patient: patientId } });
        if (!relation) {
            const newRelation = DoctorPatientRepository.create({ doctor: doctorId, patient: patientId });
            await DoctorPatientRepository.save(newRelation);
            res.status(StatusCodes.CREATED).send('patient assigned successfull');
        } else {
            throw { message: 'already patient assigned', statusCode: StatusCodes.CONFLICT };
        }
    } catch (error) {
        res.status(statusCode).send(message);
    }
}
