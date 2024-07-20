import {
    assignPatient,
    unassignedPatients,
    assignedPatients,
    removePatient,
    assignedDoctor,
    searchAssignedPatients,
    searchUnassignedPatients
} from "../controllers/doctorPatientController";
import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware";

const router = Router();

/**
 * @route POST /assignPatient
 * @description Assign a patient to a doctor.
 * @middleware authMiddleware - Ensures the request is authenticated.
 * @body {Object} patient - The patient details to be assigned.
 * @returns {object} 200 - Success message and assigned patient details.
 * @returns {object} 400 - Bad request if patient details are exist.
 * @returns {object} 500 - Bad request invalid or internally something went wrong.
 */

router.post("/assignPatient", authMiddleware, assignPatient)

/**
 * @route DELETE /removePatient
 * @description Remove a patient assignment.
 * @middleware authMiddleware - Ensures the request is authenticated.
 * @body {Object} patientId - The ID of the patient to be removed.
 * @returns {object} 200 - Success message.
 * @returns {object} 404 - Not found if the patient or assignment does not exist.
 * @returns {object} 400 - Not found if the id of patient or doctor not available.
 */
router.delete('/removePatient', authMiddleware, removePatient)

/**
 * @route GET /unassignedPatients/:pageNo
 * @description Retrieve a paginated list of unassigned patients.
 * @middleware authMiddleware - Ensures the request is authenticated.
 * @param {number} pageNo - The page number for pagination.
 * @returns {object} 200 - A list of unassigned patients.
 * @returns {object} 500 - if any internal error occous.
 */
router.get('/unassignedPatients/:pageNo', authMiddleware, unassignedPatients)

/**
 * @route GET /assignedPatients/:pageNo
 * @description Retrieve a paginated list of assigned patients.
 * @middleware authMiddleware - Ensures the request is authenticated.
 * @param {number} pageNo - The page number for pagination.
 * @returns {object} 200 - A list of assigned patients.
 * @returns {object} 404 - Not found if no assigned patients exist.
 * @returns {object} 500 - if any internal error occous.
 */
router.get('/assignedPatients/:pageNo', authMiddleware, assignedPatients)

/**
 * @route GET /assignedDoctor
 * @description Retrieve information about the assigned doctor.
 * @middleware authMiddleware - Ensures the request is authenticated.
 * @returns {object} 200 - Details of the assigned doctor.
 * @returns {object} 400 - Not found if no doctor is assigned.
 */
router.get('/assignedDoctor', authMiddleware, assignedDoctor)

/**
 * @route GET /searchUnassignedPatients
 * @description Search for unassigned patients based on query parameters.
 * @middleware authMiddleware - Ensures the request is authenticated.
 * @query {string} query - The search query to filter unassigned patients.
 * @returns {object} 200 - A list of unassigned patients matching the search criteria.
 * @returns {object} 400 - Not found if no unassigned patients match the criteria.
 */
router.get('/searchUnassignedPatients', authMiddleware, searchUnassignedPatients)

/**
 * @route GET /searchAssignedPatients
 * @description Search for assigned patients based on query parameters.
 * @middleware authMiddleware - Ensures the request is authenticated.
 * @query {string} query - The search query to filter assigned patients.
 * @returns {object} 200 - A list of assigned patients matching the search criteria.
 * @returns {object} 400 - Not found if no assigned patients match the criteria.
 */
router.get('/searchAssignedPatients', authMiddleware, searchAssignedPatients)
export default router;  