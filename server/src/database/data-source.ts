import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../models/User";
// import {Doc}

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "root",
    database: "hospital-managment",
    synchronize: true,
    logging: false,
    entities: [User],
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
