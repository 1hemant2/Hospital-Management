import "reflect-metadata";
import { DataSource } from "typeorm";
import { Doctor } from "../models/Doctor";
import { Patient } from "../models/Patient";
import { Pdf } from "../models/Pdf";
import { DoctorPatient } from "../models/DoctorPatient";


export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "root",
    database: "hospital-managment",
    synchronize: true,
    logging: false,
    entities: [Doctor, Patient, Pdf, DoctorPatient],
    migrations: [],
    subscribers: [],
});

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!");
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err);
    });
