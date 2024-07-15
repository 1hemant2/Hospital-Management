import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { AppDataSource } from "./config/data-source";
import doctorRoutes from './routes/doctorRoute';
import pdfRoutes from './routes/pdfRoute';
import patientRoutes from './routes/patientRoute';
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

AppDataSource.initialize().then(() => {
    app.use("/doctor/", doctorRoutes);
    app.use('/doctor/', pdfRoutes);
    app.use('/patient', patientRoutes);
    const PORT = process.env.PORT || 8084
    app.listen(PORT, () => {
        console.log("Server is running 😀😀✅😁", PORT);
    });
}).catch((error: Error) => console.log(error));
