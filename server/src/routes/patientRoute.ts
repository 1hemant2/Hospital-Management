import { Router } from "express";
import { createPatient, getPatient } from "../controllers/patientController";
const router = Router();

router.post("/register", createPatient)
    .post("/login", getPatient);

export default router;