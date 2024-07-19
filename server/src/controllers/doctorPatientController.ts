import { DoctorPatient } from "../models/DoctorPatient";
import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
const DoctorPatientRepository = AppDataSource.getRepository(DoctorPatient);
import { StatusCodes } from "http-status-codes";
import { Patient } from "../models/Patient";
/**
 * constants
 */
let statusCode: number;
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


export const unassignedPatients = async (req: Request, res: Response) => {
    try {
        let page: number = parseInt(req.params.pageNo);
        const patientRepository = AppDataSource.getRepository(Patient);
        const query = patientRepository.createQueryBuilder('patient')
            .leftJoinAndSelect('patient.doctorPatient', 'doctorPatient')
            .where('doctorPatient.id IS NULL')
            .skip((page - 1) * 4)
            .take(4);
        let [availablePatients, total] = await query.getManyAndCount();
        total = total % 4 === 0 ? total / 4 : Math.ceil((total / 4));
        if (availablePatients) {
            return res.status(StatusCodes.OK).send({ success: true, availablePatients, total });
        }
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error, success: false });
    }
}


export const assignPatient = async (req: Request, res: Response) => {
    try {
        const doctorId = req.body.id;
        const patientId = req.body.patientId;
        if (!patientId || !doctorId) {
            throw { statusCode: StatusCodes.BAD_REQUEST, message: 'doctor & patientId required' };
        }
        const relation = await DoctorPatientRepository.findOne({ where: { patient: { id: patientId } } });
        if (!relation) {
            const newRelation = DoctorPatientRepository.create({ doctor: doctorId, patient: patientId });
            await DoctorPatientRepository.save(newRelation);
            return res.status(StatusCodes.CREATED).send({ success: true, message: 'patient assigned successfull' });
        } else {
            throw { message: 'already patient assigned', statusCode: StatusCodes.BAD_REQUEST };
        }
    } catch (error: any) {
        statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR; // Set a default status code
        return res.status(statusCode).send({ message: error.message || 'Internal Server Error', success: false })
    }
}

export const removePatient = async (req: Request, res: Response) => {
    try {
        const doctorId = req.body.id;
        const patientId = req.body.patientId;
        if (!patientId || !doctorId) {
            throw { statusCode: StatusCodes.BAD_REQUEST, message: 'doctor & patientId required' };
        }
        const relation = await DoctorPatientRepository.findOne({ where: { patient: { id: patientId } } });
        if (relation) {
            await DoctorPatientRepository.delete({ doctor: doctorId, patient: patientId });
            return res.status(StatusCodes.CREATED).send({ success: true, message: 'patient assigned successfull' });
        } else {
            throw { message: 'patient not exist', statusCode: StatusCodes.BAD_REQUEST };
        }
    } catch (error: any) {
        statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
        return res.status(statusCode).send({ message: error.message || 'Internal Server Error', success: false })
    }
}

export const assignedPatients = async (req: Request, res: Response) => {
    try {
        const doctorId = req.body.id;
        let page: number = parseInt(req.params.pageNo);
        if (!doctorId) {
            throw { statusCode: StatusCodes.BAD_REQUEST, message: 'doctorid is  required' };
        }
        const [patients, count] = await DoctorPatientRepository.findAndCount({
            where: { doctor: { id: doctorId } },
            relations: ['patient'],
            skip: (page - 1) * 4,
            take: 4
        });
        // console.log(patients);
        const totalPage = count % 4 === 0 ? count / 4 : Math.ceil(count / 4);
        if (patients) {
            return res.status(StatusCodes.OK).send({ success: true, data: patients, totalPage });
        } else {
            throw { message: 'something went wrong', statusCode: StatusCodes.INTERNAL_SERVER_ERROR };
        }
    } catch (error: any) {
        statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR; // Set a default status code
        return res.status(statusCode).send({ message: error.message || 'Internal Server Error', success: false })
    }
}

export const assignedDoctor = async (req: Request, res: Response) => {
    try {
        const patientId = req.body.id;
        console.log(patientId);
        if (!patientId) {
            throw { statusCode: StatusCodes.BAD_REQUEST, message: 'patiendId is  required' };
        }
        const doctor = await DoctorPatientRepository.findOne({
            where: { patient: { id: patientId } },
            relations: ['doctor']
        });
        if (doctor) {
            return res.status(StatusCodes.OK).send({ success: true, data: doctor });
        } else {
            throw { message: 'Doctor not assign yes', statusCode: StatusCodes.NOT_FOUND };
        }
    } catch (error: any) {
        statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR; // Set a default status code
        return res.status(statusCode).send({ message: error.message || 'Internal Server Error', success: false })
    }
}