import {
    assignPatient,
    unassignedPatients,
    assignedPatients,
    removePatient,
    assignedDoctor
} from "../controllers/doctorPatientController";
import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware";

const router = Router();

router
    .post("/assignPatient", authMiddleware, assignPatient)
    .delete('/removePatient', authMiddleware, removePatient)
    .get('/unassignedPatients/:pageNo', authMiddleware, unassignedPatients)
    .get('/assignedPatients/:pageNo', authMiddleware, assignedPatients)
    .get('/assignedDoctor', authMiddleware, assignedDoctor)
export default router; 