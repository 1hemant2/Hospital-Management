import { Router } from "express";
import { userDetails } from "../controllers/userDetailController";
import authMiddleware from "../middleware/authMiddleware";
const router = Router();

router.get("/detials", authMiddleware, userDetails)

export default router;