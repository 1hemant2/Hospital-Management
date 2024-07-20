import { Router } from "express";
const router = Router();
import { getDrFile, getTotalPage, uploadDrFile, searchDrFile } from "../controllers/pdfController";
import authMiddleware from "../middleware/authMiddleware";

/**
 * @route POST /upload
 * @description Upload a new document file for a doctor.
 * @middleware authMiddleware - Ensures the request is authenticated.
 * @body {Object} file - The file to be uploaded.
 * @body {string} file.name - The name of the file.
 * @body {string} file.filePath - The path where the file is stored.
 * @returns {object} 200 - Success message and file details.
 * @returns {object} 400 - Bad request if the file is invalid or upload fails.
 * @returns {object} 500 - if anything unexpected occur.
 */
router.post('/upload', authMiddleware, uploadDrFile);

/**
 * @route GET /upload/:pageNo
 * @description Retrieve a paginated list of uploaded document files.
 * @middleware authMiddleware - Ensures the request is authenticated.
 * @param {number} pageNo - The page number for pagination.
 * @returns {object} 200 - A list of uploaded files for the specified page.
 * @returns {object} 500 - if anything unexpected occur.
 */
router.get('/upload/:pageNo', authMiddleware, getDrFile);

/**
 * @route GET /page
 * @description Retrieve the total number of pages available for pagination.
 * @middleware authMiddleware - Ensures the request is authenticated.
 * @returns {object} 200 - The total number of pages.
 * @returns {object} 500 - if anything unexpected occur.
 * 
 */
router.get('/page', authMiddleware, getTotalPage)

/**
 * @route GET /search
 * @description Search for uploaded document files based on query parameters.
 * @middleware authMiddleware - Ensures the request is authenticated.
 * @query {string} query - The search query to filter files.
 * @returns {object} 200 - A list of files matching the search criteria.
 * @returns {object} 404 - Not found if no files match the search criteria.
 * @returns {object} 500 - if anything unexpected occur.
 */
router.get('/search', authMiddleware, searchDrFile)

export default router;
