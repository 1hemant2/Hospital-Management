import { Router } from "express";
import { createPatient, getPatient } from "../controllers/patientController";
const router = Router();

/**
 * @route POST /register
 * @description Register a new patient.
 * @body {Object} patient - The details of the patient to be registered.
 * @body {string} patient.firstName - The first name of the patient.
 * @body {string} patient.lastName - The last name of the patient.
 * @body {string} patient.email - The email address of the patient (unique).
 * @body {string} patient.password - The password for the patient's account.
 * @returns {object} 201 - Success message and registered patient details.
 * @returns {object} 400 - Bad request if the provided details are invalid.
 * @returns {object} 409 - Conflict if the email is already registered.
 */
router.post("/register", createPatient)

/**
 * @route POST /login
 * @description Authenticate a patient and provide a token.
 * @body {Object} credentials - The login credentials of the patient.
 * @body {string} credentials.email - The email address of the patient.
 * @body {string} credentials.password - The password of the patient.
 * @returns {object} 200 - Success message and authentication token.
 * @returns {object} 401 - Unauthorized if the email or password is incorrect.
 * @returns {object} 404 - Not found if the email does not exist.
 */
router.post("/login", getPatient);

export default router;