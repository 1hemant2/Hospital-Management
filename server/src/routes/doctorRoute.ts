import { createDoctor, getDoctor } from "../controllers/doctorController";
import { Router } from "express";

const router = Router();

router.post("/register", createDoctor)
    .post("/login", getDoctor);

export default router;