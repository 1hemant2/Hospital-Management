import { createDoctor, getDoctor } from "../controllers/doctorController";
import { Router } from "express";

const router = Router();

/**
 * @route POST /register
 * @description Register a new doctor.
 * @body {Object} doctor - The details of the doctor to be registered.
 * @body {string} doctor.firstName - The first name of the doctor.
 * @body {string} doctor.lastName - The last name of the doctor.
 * @body {string} doctor.email - The email address of the doctor (unique).
 * @body {string} doctor.password - The password for the doctor's account.
 * @body {string} doctor.specialty - The specialty of the doctor.
 * @returns {object} 201 - Success message and registered doctor details.
 * @returns {object} 400 - Bad request if the provided details are invalid.
 * @returns {object} 409 - Conflict if the email is already registered.
 */
router.post("/register", createDoctor);

/**
 * @route POST /login
 * @description Authenticate a doctor and provide a token.
 * @body {Object} credentials - The login credentials of the doctor.
 * @body {string} credentials.email - The email address of the doctor.
 * @body {string} credentials.password - The password of the doctor.
 * @returns {object} 200 - Success message and authentication token.
 * @returns {object} 401 - Unauthorized if the email or password is incorrect.
 * @returns {object} 404 - Not found if the email does not exist.
 */
router.post("/login", getDoctor);

export default router;