import { Router } from "express";
const router = Router();
import { getDrFile, getTotalPage, uploadDrFile } from "../controllers/pdfController";
import authMiddleware from "../middleware/authMiddleware";

router.post('/upload', authMiddleware, uploadDrFile);
router.get('/upload/:pageNo', authMiddleware, getDrFile);
router.get('/page', authMiddleware, getTotalPage);

export default router;
