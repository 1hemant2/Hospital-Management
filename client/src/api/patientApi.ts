import { axiosInstances } from "./axiosInstanc";

interface registerPayload {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

interface loginPayload {
    email: string,
    password: string
}

/**
 * Registers a new patient by sending their details to the server.
 *
 * This function sends a POST request to the `/patient/register` endpoint with the patient details provided in the payload.
 * It returns the server's response or an error response if something goes wrong.
 *
 * @param {registerPayload} payload - The payload containing the patient's registration details.
 * @param {string} payload.email - The email address of the patient.
 * @param {string} payload.password - The password for the patient account.
 * @param {string} payload.name - The name of the patient (optional).
 * @returns {Promise<any>} - A promise that resolves with the server's response or an error response.
 *
 * @throws {Error} - If an error occurs during the request, the error response is returned.
 * 
 * Status Codes:
 * - 200 OK: If the registration is successful and the patient record is created.
 * - 400 Bad Request: If the request payload is invalid or missing required fields.
 * - 409 Conflict: If a patient with the same email already exists.
 * - 500 Internal Server Error: If an unexpected error occurs on the server.
 */
export const registerApi = async (payload: registerPayload) => {
    try {
        const res = await axiosInstances.post('/patient/register', payload);
        return res.data;
    } catch (error: any) {
        return error.response.data;
    }
}


/**
 * Authenticates a patient by sending login credentials to the server.
 *
 * This function sends a POST request to the `/patient/login` endpoint with the patient's login credentials provided in the payload.
 * It returns the server's response or an error response if something goes wrong.
 *
 * @param {loginPayload} payload - The payload containing the patient's login credentials.
 * @param {string} payload.email - The email address of the patient.
 * @param {string} payload.password - The password of the patient.
 * @returns {Promise<any>} - A promise that resolves with the server's response or an error response.
 *
 * @throws {Error} - If an error occurs during the request, the error response is returned.
 * 
 * Status Codes:
 * - 200 OK: If the login is successful and a JWT token is returned.
 * - 401 Unauthorized: If the provided credentials are invalid.
 * - 404 Not Found: If no patient with the provided email exists.
 * - 500 Internal Server Error: If an unexpected error occurs on the server.
 */
export const loginApi = async (payload: loginPayload) => {
    try {
        const res = await axiosInstances.post('/patient/login', payload);
        return res.data;
    } catch (error: any) {
        return error.response.data;
    }
}
