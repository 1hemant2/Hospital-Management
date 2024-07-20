import { axiosInstances } from "./axiosInstanc";

/**
 * Retrieves a list of unassigned patients for a specific page.
 *
 * This function sends a GET request to the `/doctoPatient/unassignedPatients/{page}` endpoint to fetch patients who are not yet assigned to any doctor.
 * It returns the server's response, which includes the list of unassigned patients and pagination information.
 *
 * @param {number} page - The page number to retrieve the unassigned patients from. The results are paginated with a fixed number of patients per page.
 * @returns {Promise<any>} - A promise that resolves with the server's response, including the list of unassigned patients and total pages, or an error response if something goes wrong.
 *
 * @throws {Error} - If an error occurs during the request, the error response is returned.
 * 
 * Status Codes:
 * - 200 OK: If the request is successful and the list of unassigned patients along with pagination information is returned.
 * - 500 Internal Server Error: If an unexpected error occurs on the server.
 */
export const avilablePatientApi = async (page: number) => {
    try {
        const res = await axiosInstances.get(`/doctoPatient/unassignedPatients/${page}`);
        return res.data;
    } catch (error: any) {
        return error.response.data;
    }
}

/**
 * Searches for unassigned patients by email.
 *
 * This function sends a GET request to the `/doctoPatient/searchUnassignedPatients` endpoint with the provided email as a query parameter.
 * It retrieves patients who are not assigned to any doctor and match the given email.
 * Returns the server's response, which includes the list of matching unassigned patients and pagination information.
 *
 * @param {string} email - The email to search for unassigned patients.
 * @returns {Promise<any>} - A promise that resolves with the server's response, which includes the list of matching unassigned patients and total pages, or an error response if something goes wrong.
 *
 * @throws {Error} - If an error occurs during the request, the error response is returned.
 * 
 * Status Codes:
 * - 200 OK: If the request is successful and the list of matching unassigned patients along with pagination information is returned.
 * - 404 Not Found: If the email parameter is missing or invalid.
 * - 500 Internal Server Error: If an unexpected error occurs on the server.
 */
export const searchAvailablePatientApi = async (email: string) => {
    try {
        const data = await axiosInstances.get('/doctoPatient/searchUnassignedPatients', {
            params: { email }
        });
        return data.data;
    } catch (error: any) {
        return error.response.data;
    }
}

/**
 * Assigns a patient to a doctor by sending a request to create a relationship between the two.
 *
 * This function sends a POST request to the `/doctoPatient/assignPatient` endpoint with the provided patient ID in the request body.
 * The API will handle the assignment of the patient to the doctor if the relationship does not already exist.
 *
 * @param {string} id - The ID of the patient to be assigned.
 * @returns {Promise<any>} - A promise that resolves with the server's response, which includes a success message if the assignment is successful, or an error message if something goes wrong.
 *
 * @throws {Error} - If an error occurs during the request, the error response is returned.
 * 
 * Status Codes:
 * - 201 Created: If the assignment is successful and the patient is assigned to the doctor.
 * - 400 Bad Request: If the assignment cannot be completed due to missing or invalid parameters, or if the patient is already assigned.
 * - 500 Internal Server Error: If an unexpected error occurs on the server.
 */
export const assignPatientApi = async (id: string) => {
    try {
        const res = await axiosInstances.post(`/doctoPatient/assignPatient`, { patientId: id });
        return res.data;
    } catch (error: any) {
        return error.response.data;
    }
}

/**
 * Retrieves a paginated list of patients assigned to a specific doctor.
 * 
 * This function sends a GET request to the `/doctoPatient/assignedPatients/:page` endpoint to fetch patients assigned to a doctor.
 * The `page` parameter specifies which page of results to retrieve. The backend API will handle the pagination and return the list of assigned patients along with the total number of pages.
 *
 * @param {number} page - The page number to retrieve. This determines which set of patients will be fetched.
 * @returns {Promise<any>} - A promise that resolves with the server's response, which includes the list of assigned patients and the total number of pages if the request is successful, or an error message if something goes wrong.
 *
 * @throws {Error} - If an error occurs during the request, the error response is returned.
 * 
 * Status Codes:
 * - 200 OK: If the request is successful and the data is retrieved.
 * - 500 Internal Server Error: If an unexpected error occurs on the server.
 */
export const assignedPatientsApi = async (page: number) => {
    try {
        const res = await axiosInstances.get(`/doctoPatient/assignedPatients/${page}`);
        return res.data;
    } catch (error: any) {
        return error.response.data;
    }
}

/**
 * Searches for patients assigned to a specific doctor based on the provided email.
 * 
 * This function sends a GET request to the `/doctoPatient/searchassignedPatients` endpoint with the email as a query parameter.
 * The backend API will handle the search and return a list of patients assigned to the doctor that match the provided email.
 *
 * @param {string} email - The email of the patient to search for. This email will be used to filter the list of assigned patients.
 * @returns {Promise<any>} - A promise that resolves with the server's response, which includes the list of assigned patients and the total number of pages if the request is successful, or an error message if something goes wrong.
 *
 * @throws {Error} - If an error occurs during the request, the error response is returned.
 * 
 * Status Codes:
 * - 200 OK: If the request is successful and the data is retrieved.
 * - 400 BAD_REQUEST: If the email is not provided or is invalid.
 * - 404 NOT_FOUND: If no patients are found matching the provided email.
 * - 500 Internal Server Error: If an unexpected error occurs on the server.
 */
export const searchAssignedPatientApi = async (email: string) => {
    try {
        const data = await axiosInstances.get('/doctoPatient/searchassignedPatients', {
            params: { email }
        });
        return data.data;
    } catch (error: any) {
        return error.response.data;
    }
}


/**
 * Unassigns a patient from a doctor by removing their relationship.
 * 
 * This function sends a DELETE request to the `/doctoPatient/removePatient` endpoint with the patient ID in the request body.
 * The backend API will handle the removal of the patient's assignment and return a success message if the operation is successful.
 *
 * @param {string} id - The ID of the patient to be unassigned. This ID is used to identify and remove the patient's relationship with the doctor.
 * @returns {Promise<any>} - A promise that resolves with the server's response, which includes a success message if the request is successful, or an error message if something goes wrong.
 *
 * @throws {Error} - If an error occurs during the request, the error response is returned.
 * 
 * Status Codes:
 * - 201 CREATED: If the patient is successfully unassigned.
 * - 400 BAD_REQUEST: If the request body is missing required information (i.e., doctor ID or patient ID).
 * - 404 NOT_FOUND: If the patient does not exist in the doctor's assignment list.
 * - 500 Internal Server Error: If an unexpected error occurs on the server.
 */
export const unassignPatientApi = async (id: string) => {
    try {
        const res = await axiosInstances.delete(`/doctoPatient/removePatient`, {
            data: { patientId: id }
        });
        return res.data;
    } catch (error: any) {
        return error.response.data;
    }
}

/**
 * Retrieves the doctor assigned to a specific patient.
 * 
 * This function sends a GET request to the `/doctoPatient/assignedDoctor` endpoint. The backend API will handle fetching the doctor assigned to the patient, identified by the patient ID in the request body.
 *
 * @returns {Promise<any>} - A promise that resolves with the server's response, which includes the assigned doctor's information if the request is successful, or an error message if something goes wrong.
 *
 * @throws {Error} - If an error occurs during the request, the error response is returned.
 * 
 * Status Codes:
 * - 200 OK: If the doctor is successfully retrieved and returned in the response.
 * - 400 BAD_REQUEST: If the request body is missing the patient ID.
 * - 404 NOT_FOUND: If no doctor is assigned to the patient.
 * - 500 INTERNAL_SERVER_ERROR: If an unexpected error occurs on the server.
 */
export const assignedDoctorApi = async () => {
    try {
        const res = await axiosInstances.get('/doctoPatient/assignedDoctor');
        return res.data;
    } catch (error: any) {
        return error.response.data;
    }
}




