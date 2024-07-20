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

/**
 * Searches for patients who are not assigned to any doctor and matches the provided email.
 * 
 * This function performs the following operations:
 * - Extracts the email from the request query.
 * - Validates if the email is provided; if not, throws an error with a `NOT_FOUND` status code.
 * - Queries the `Patient` repository to find patients who do not have an associated entry in the `DoctorPatient` table.
 * - Filters the patients based on the provided email.
 * - Calculates the total number of pages based on a page size of 4.
 * - Returns the list of available patients along with the total number of pages if any patients are found.
 * - Handles errors and sends an appropriate response.
 * 
 * @param req - The request object containing query parameters, including the email.
 * @param res - The response object used to send the result or error response.
 * 
 * @throws {Object} - Throws an error with status code `NOT_FOUND` and a message if the email is not provided.
 * 
 * @returns {Object} - A JSON response with a success flag, the list of available patients, and the total number of pages if successful.
 */

export const searchUnassignedPatients = async (req: Request, res: Response) => {
    try {
        const email: string = req.query.email as string;
        if (!email) {
            throw { statusCode: StatusCodes.NOT_FOUND, message: 'enter valid email please' }
        }
        const patientRepository = AppDataSource.getRepository(Patient);
        const query = patientRepository.createQueryBuilder('patient')
            .leftJoinAndSelect('patient.doctorPatient', 'doctorPatient')
            .where('doctorPatient.id IS NULL')
            .andWhere('patient.email = :email', { email })
        let [availablePatients, total] = await query.getManyAndCount();
        total = total % 4 === 0 ? total / 4 : Math.ceil((total / 4));
        if (availablePatients) {
            return res.status(StatusCodes.OK).send({ success: true, availablePatients, total });
        }
    } catch (error: any) {
        res.status(error.statusCode).send({ error, success: false });
    }
}


/**
 * Assigns a patient to a doctor by creating a relationship between the two if it does not already exist.
 * 
 * This function performs the following operations:
 * - Extracts `doctorId` and `patientId` from the request body.
 * - Validates that both `doctorId` and `patientId` are provided; if not, throws a `BAD_REQUEST` error.
 * - Checks if a relationship between the provided patient and any doctor already exists in the `DoctorPatientRepository`.
 * - If no relationship exists, creates a new relationship and saves it in the repository.
 * - Returns a success message with a `CREATED` status if the assignment is successful.
 * - If a relationship already exists, throws a `BAD_REQUEST` error with a message indicating that the patient is already assigned.
 * - Handles errors and sends an appropriate response with a default `INTERNAL_SERVER_ERROR` status if no status code is provided.
 * 
 * @param {Request} req - The request object containing the `doctorId` and `patientId` in the request body.
 * @param {Response} res - The response object used to send the result or error response.
 * 
 * @throws {Object} - Throws an error with status code `BAD_REQUEST` and a message if `doctorId` or `patientId` is missing or if the patient is already assigned.
 * @throws {Object} - Throws an error with status code `INTERNAL_SERVER_ERROR` and a message for unexpected internal errors.
 * 
 * @returns {void} - A JSON response with a success flag and a message indicating the result of the operation.
 */

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
        statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
        return res.status(statusCode).send({ message: error.message || 'Internal Server Error', success: false })
    }
}

/**
 * Removes a patient from a doctor's list by deleting the relationship between the two if it exists.
 * 
 * This function performs the following operations:
 * - Extracts `doctorId` and `patientId` from the request body.
 * - Validates that both `doctorId` and `patientId` are provided; if not, throws a `BAD_REQUEST` error.
 * - Checks if a relationship between the provided patient and any doctor exists in the `DoctorPatientRepository`.
 * - If a relationship exists, deletes it from the repository.
 * - Returns a success message with a `CREATED` status if the removal is successful.
 * - If no relationship exists, throws a `BAD_REQUEST` error with a message indicating that the patient does not exist.
 * - Handles errors and sends an appropriate response with a default `INTERNAL_SERVER_ERROR` status if no status code is provided.
 * 
 * @param {Request} req - The request object containing the `doctorId` and `patientId` in the request body.
 * @param {Response} res - The response object used to send the result or error response.
 * 
 * @throws {Object} - Throws an error with status code `BAD_REQUEST` and a message if `doctorId` or `patientId` is missing or if the patient does not exist.
 * @throws {Object} - Throws an error with status code `INTERNAL_SERVER_ERROR` and a message for unexpected internal errors.
 * 
 * @returns {void} - A JSON response with a success flag and a message indicating the result of the operation.
 */

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
            throw { message: 'patient not exist', statusCode: StatusCodes.NOT_FOUND };
        }
    } catch (error: any) {
        statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
        return res.status(statusCode).send({ message: error.message || 'Internal Server Error', success: false })
    }
}

/**
 * Retrieves a paginated list of patients assigned to a specific doctor.
 * 
 * This function performs the following operations:
 * - Extracts `doctorId` from the request body and `pageNo` from the request parameters.
 * - Validates that `doctorId` is provided; if not, throws a `BAD_REQUEST` error.
 * - Fetches a paginated list of patients assigned to the doctor from the `DoctorPatientRepository`, including the patient details.
 * - Calculates the total number of pages based on a page size of 4.
 * - Returns the list of patients and the total number of pages if successful.
 * - Throws an `INTERNAL_SERVER_ERROR` if something goes wrong during the operation.
 * 
 * @param {Request} req - The request object containing the `doctorId` in the request body and the `pageNo` in the request parameters.
 * @param {Response} res - The response object used to send the result or error response.
 * 
 * @throws {Object} - Throws an error with status code `BAD_REQUEST` and a message if `doctorId` is missing.
 * @throws {Object} - Throws an error with status code `INTERNAL_SERVER_ERROR` and a message for unexpected internal errors.
 * 
 * @returns {void} - A JSON response with a success flag, the list of assigned patients, and the total number of pages.
 */
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
            throw { message: 'something went wrong', statusCode: StatusCodes.NOT_FOUND };
        }
    } catch (error: any) {
        statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR; // Set a default status code
        return res.status(statusCode).send({ message: error.message || 'Internal Server Error', success: false })
    }
}

/**
 * Searches for patients assigned to a specific doctor based on the provided email.
 * 
 * This function performs the following operations:
 * - Extracts `doctorId` from the request body and `email` from the query parameters.
 * - Validates that both `email` and `doctorId` are provided; if not, throws a `BAD_REQUEST` error.
 * - Fetches a paginated list of patients assigned to the doctor who match the provided email from the `DoctorPatientRepository`.
 * - Calculates the total number of pages based on a page size of 4.
 * - Returns the list of patients and the total number of pages if any patients are found.
 * - If no patients are found, throws a `NOT_FOUND` error with a message indicating that no patients were found.
 * - Handles errors and sends an appropriate response with a default `INTERNAL_SERVER_ERROR` status if no status code is provided.
 * 
 * @param {Request} req - The request object containing the `doctorId` in the request body and the `email` in the query parameters.
 * @param {Response} res - The response object used to send the result or error response.
 * 
 * @throws {Object} - Throws an error with status code `BAD_REQUEST` and a message if `email` or `doctorId` is missing.
 * @throws {Object} - Throws an error with status code `NOT_FOUND` and a message if no patients are found.
 * @throws {Object} - Throws an error with status code `INTERNAL_SERVER_ERROR` and a message for unexpected internal errors.
 * 
 * @returns {void} - A JSON response with a success flag, the list of assigned patients, and the total number of pages.
 */

export const searchAssignedPatients = async (req: Request, res: Response) => {
    try {
        const doctorId: string = req.body.id;
        const email: string | undefined = req.query.email as string;
        // console.log(email);
        if (!email) {
            throw { statusCode: StatusCodes.BAD_REQUEST, message: 'Enter a valid email, please' };
        }
        if (!doctorId) {
            throw { statusCode: StatusCodes.BAD_REQUEST, message: 'Doctor ID is required' };
        }

        let page: number = 1;

        const [patients, count] = await DoctorPatientRepository.findAndCount({
            where: {
                doctor: { id: doctorId },
                patient: { email: email }
            },
            relations: ['patient'],
            skip: (page - 1) * 4,
            take: 4
        });

        const totalPage = count % 4 === 0 ? count / 4 : Math.ceil(count / 4);

        if (patients.length > 0) {
            return res.status(StatusCodes.OK).send({ success: true, data: patients, totalPage });
        } else {
            throw { message: 'No patients found', statusCode: StatusCodes.NOT_FOUND };
        }
    } catch (error: any) {
        const statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
        return res.status(statusCode).send({ message: error.message || 'Internal Server Error', success: false });
    }
}

/**
 * Retrieves the doctor assigned to a specific patient.
 * 
 * This function performs the following operations:
 * - Extracts `patientId` from the request body.
 * - Validates that `patientId` is provided; if not, throws a `BAD_REQUEST` error.
 * - Fetches the doctor assigned to the patient from the `DoctorPatientRepository`, including doctor details.
 * - Returns the doctor information if found, with a status of `OK`.
 * - If no doctor is found, throws a `NOT_FOUND` error with a message indicating that no doctor is assigned yet.
 * - Handles errors and sends an appropriate response with a default `INTERNAL_SERVER_ERROR` status if no status code is provided.
 * 
 * @param {Request} req - The request object containing the `patientId` in the request body.
 * @param {Response} res - The response object used to send the result or error response.
 * 
 * @throws {Object} - Throws an error with status code `BAD_REQUEST` and a message if `patientId` is missing.
 * @throws {Object} - Throws an error with status code `NOT_FOUND` and a message if no doctor is found.
 * @throws {Object} - Throws an error with status code `INTERNAL_SERVER_ERROR` and a message for unexpected internal errors.
 * 
 * @returns {void} - A JSON response with a success flag and the doctor information if found.
 */

export const assignedDoctor = async (req: Request, res: Response) => {
    try {
        const patientId = req.body.id;
        // console.log(patientId);
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