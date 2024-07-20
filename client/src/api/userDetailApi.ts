import { axiosInstances } from "./axiosInstanc";

/**
 * Fetches user details from the backend API.
 *
 * This function sends a GET request to the `/user/details` endpoint to retrieve user details. It uses an Axios instance configured for making HTTP requests.
 * 
 * @async
 * @function getUserDetialsApi
 * @returns {Promise<{status: number, data: Object, success: boolean, message?: string}>} - A promise that resolves to an object containing:
 *   - `status`: The HTTP status code of the response.
 *   - `data`: The response data from the API.
 *   - `success`: A boolean indicating the success of the request.
 *   - `message` (optional): A message from the API, if any.
 *
 * @throws {Object} - If an error occurs during the request, the promise will be rejected with an object containing:
 *   - `status`: The HTTP status code of the error response.
 *   - `data`: The error response data.
 *   - `message` (optional): An error message from the API, if any.
 */
export const getUserDetialsApi = async () => {
    try {
        const res = await axiosInstances.get('/user/detials');
        return res.data;
    } catch (error: any) {
        return error.response.data;
    }
}  