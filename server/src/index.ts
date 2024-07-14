import "reflect-metadata";
import express from "express";
import userRoutes from "./routes/userRoutes";
import { AppDataSource } from "./database/data-source";

const app = express();
app.use(express.json());

AppDataSource.initialize().then(() => {
    console.log("Data Source has been initialized!");

    app.use("/api", userRoutes);

    app.listen(8082, () => {
        console.log("Server is running on port 8082");
    });
}).catch((error) => console.log(error));
