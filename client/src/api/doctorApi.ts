import { axiosInstances } from "./axiosInstanc";


interface registerPayload {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    specialty: string;
}
/**
 * Registers a new doctor by sending the provided payload to the `/doctor/register` endpoint.
 * 
 * This function performs the following operations:
 * - Accepts a payload containing all necessary properties for registering a doctor.
 * - Sends a POST request to the `/doctor/register` endpoint with the payload.
 * - Returns the server's response, which includes the status code and a message indicating the result of the registration.
 * 
 * @param {registerPayload} payload - An object containing the properties required for registering a doctor. This includes details such as email, password, and first name.
 * 
 * @returns {Promise<{statusCode: number, message: string}>} - A promise that resolves with an object containing the status code and a message from the server.
 * 
 * @throws {Error} - If an error occurs during the request, the error response from the server is returned.
 * 
 * Status Codes:
 * - 200 OK: If the registration is successful and the response includes the new doctor's details.
 * - 400 BAD_REQUEST: If the request payload is invalid or missing required fields.
 * - 409 CONFLICT: If a doctor with the same email already exists.
 * - 500 INTERNAL_SERVER_ERROR: If an unexpected error occurs on the server.
 */
export const registerApi = async (payload: registerPayload) => {
    try {
        const res = await axiosInstances.post('/doctor/register', payload);
        return res.data;
    } catch (error: any) {
        return error.response.data;
    }
}

interface loginPayload {
    email: string,
    password: string
}

/**
 * Logs in a doctor by sending the provided login credentials to the `/doctor/login` endpoint.
 * 
 * This function performs the following operations:
 * - Accepts a payload containing the doctor's email and password for login.
 * - Sends a POST request to the `/doctor/login` endpoint with the payload.
 * - Returns the server's response, which includes a message, a token if login is successful, and a success flag.
 * 
 * @param {loginPayload} payload - An object containing the properties required for logging in a doctor. This includes the `email` and `password` of the doctor.
 * 
 * @returns {Promise<{message: string, token?: string, success: boolean}>} - A promise that resolves with an object containing:
 * - `message` (string): A message indicating the result of the login attempt.
 * - `token` (string, optional): A JWT token if the login is successful.
 * - `success` (boolean): A flag indicating whether the login was successful or not.
 * 
 * @throws {Error} - If an error occurs during the request, the error response from the server is returned.
 * 
 * Status Codes:
 * - 200 OK: If the login is successful and the response includes a success message and a token.
 * - 400 BAD_REQUEST: If the request payload is invalid or missing required fields.
 * - 401 UNAUTHORIZED: If the email or password is incorrect.
 * - 404 NOT_FOUND: If no doctor is found with the provided email.
 * - 500 INTERNAL_SERVER_ERROR: If an unexpected error occurs on the server.
 */
export const loginApi = async (payload: loginPayload) => {
    try {
        const res = await axiosInstances.post('/doctor/login', payload);
        return res.data;
    } catch (error: any) {
        return error.response.data;
    }
}
