import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { AppDataSource } from "./database/data-source";
import doctorRoutes from './routes/doctorRoute';

const app = express();
app.use(express.json());

AppDataSource.initialize().then(() => {
    console.log("Data Source has been initialized!");

    app.use("/doctor/", doctorRoutes);
    const PORT = process.env.PORT || 8084
    app.listen(PORT, () => {
        console.log("Server is running 😀😀✅😁", PORT);
    });
}).catch((error: Error) => console.log(error));
