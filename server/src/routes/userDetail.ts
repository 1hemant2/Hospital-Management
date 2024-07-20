import { Router } from "express";
import { userDetails } from "../controllers/userDetailController";
import authMiddleware from "../middleware/authMiddleware";
const router = Router();

/**
 * @route GET /details
 * @description Retrieve the details of the currently authenticated user.
 * @middleware authMiddleware - Ensures the request is authenticated.
 * @returns {object} 200 - Success message and user details.
 * @returns {object} 401 - Unauthorized if the request is not authenticated.
 */
router.get("/detials", authMiddleware, userDetails)

export default router;