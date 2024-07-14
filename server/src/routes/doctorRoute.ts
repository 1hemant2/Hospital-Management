import { Router } from "express";
import { createDoctor } from "../controllers/doctorController";

const router = Router();

router.post("/doctor", createDoctor);

export default router;