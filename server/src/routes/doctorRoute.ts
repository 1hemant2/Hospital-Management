import { Router } from "express";
import { createDoctor, getDoctor } from "../controllers/doctorController";

const router = Router();

router.post("/register", createDoctor)
    .post("/login", getDoctor);

export default router;