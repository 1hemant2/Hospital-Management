import express from "express";
import { AppDataSource } from "./database/data-source";
import doctorRoutes from './routes/doctorRoute';

const app = express();
app.use(express.json());

AppDataSource.initialize().then(() => {
    console.log("Data Source has been initialized!");

    app.use("/api/", doctorRoutes);

    app.listen(8080, () => {
        console.log("Server is running 😀😀✅😁");
    });
}).catch((error: Error) => console.log(error));
