import { axiosInstances } from "./axiosInstanc"
interface upladPdfPayload {
    name: string;
    pdf: File
}

/**
 * Uploads a PDF file to the server.
 *
 * This function sends a POST request to the `/pdf/upload` endpoint with a FormData payload containing the PDF file and its name.
 * It returns the response from the server or an error response if something goes wrong.
 *
 * @param {upladPdfPayload} payload - The payload containing the PDF file and its metadata.
 * @param {string} payload.name - The name of the PDF file.
 * @param {File} payload.pdf - The PDF file to be uploaded.
 * @returns {Promise<any>} - A promise that resolves with the server's response or an error response.
 *
 * @throws {Error} - If an error occurs during the request, the error response is returned.
 * 
 * Status Codes:
 * - 200 OK: If the request is successful and the PDF file is uploaded successfully.
 * - 400 Bad Request: If the request payload is invalid or missing required fields.
 * - 500 Internal Server Error: If an unexpected error occurs on the server.
 */
export const uploadPdfApi = async (payload: upladPdfPayload) => {
    try {
        const formData = new FormData();
        formData.append('name', payload.name);
        formData.append('pdf', payload.pdf);
        const res = await axiosInstances.post('/pdf/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return res.data;
    } catch (error: any) {
        return error.response.data;
    }
}


/**
 * Retrieves PDF files for a specific page.
 *
 * This function sends a GET request to the `/pdf/upload/${page}` endpoint to fetch PDF files for the given page number.
 * It returns the data for the requested page or an error response if something goes wrong.
 *
 * @param {number} page - The page number to retrieve PDF files for.
 * @returns {Promise<any>} - A promise that resolves with the PDF files for the specified page or an error response.
 *
 * @throws {Error} - If an error occurs during the request, the error response is returned.
 * 
 * Status Codes:
 * - 200 OK: If the request is successful and the PDF files for the specified page are returned.
 * - 404 Not Found: If the specified page does not exist or no PDF files are found for that page.
 * - 500 Internal Server Error: If an unexpected error occurs on the server.
 */
export const getPdfApi = async (page: number) => {
    try {
        const data = await axiosInstances.get(`/pdf/upload/${page}`);
        return data.data;
    } catch (error: any) {
        return error.response.data;
    }
}

/**
 * Retrieves the total number of pages for PDF files.
 *
 * This function sends a GET request to the '/pdf/page' endpoint to fetch the total number of pages across all PDF files.
 * It returns the total number of pages or an error response if something goes wrong.
 *
 * @returns {Promise<any>} - A promise that resolves with the total number of pages or an error response.
 *
 * @throws {Error} - If an error occurs during the request, the error response is returned.
 * 
 * Status Codes:
 * - 200 OK: If the request is successful and the total number of pages is returned.
 * - 500 Internal Server Error: If an unexpected error occurs on the server.
 */
export const totalPageApi = async () => {
    try {
        const data = await axiosInstances.get(`/pdf/page`);
        return data.data;
    } catch (error: any) {
        return error.response.data;
    }
}

/**
 * Searches for PDF files based on the provided name.
 *
 * This function sends a GET request to the '/pdf/search' endpoint with the specified `name` as a query parameter.
 * It retrieves the list of PDF files that match the search criteria.
 *
 * @param {string} name - The name of the PDF files to search for.
 * @returns {Promise<any>} - A promise that resolves with the search results or an error response.
 *
 * @throws {Error} - If an error occurs during the request, the error response is returned.
 * 
 * Status Codes:
 * - 200 OK: If the request is successful and the search results are returned.
 * - 400 Bad Request: If the request parameters are invalid or missing.
 * - 404 Not Found: If the endpoint '/pdf/search' does not exist or no matching PDFs are found.
 * - 500 Internal Server Error: If an unexpected error occurs on the server.
 */
export const searchPdfApi = async (name: string) => {
    try {
        const data = await axiosInstances.get('/pdf/search', {
            params: { name }
        });
        return data.data;
    } catch (error: any) {
        return error.response.data;
    }
}