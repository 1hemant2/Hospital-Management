import { Router } from "express";
const router = Router();
import { uploadDrFile } from "../controllers/pdfController";
import authMiddleware from "../middleware/authMiddleware";

router.post('/upload', authMiddleware, uploadDrFile);

export default router;
