import { Request, Response } from "express";
import { AppDataSource } from "../database/data-source";
import { User } from "../models/User";
const userRepository = AppDataSource.getRepository(User);

export const createUser = async (req: Request, res: Response) => {
    const user = userRepository.create(req.body);
    await userRepository.save(user);
    res.status(201).send(user);
};

export const getUsers = async (req: Request, res: Response) => {
    const users = await userRepository.find();
    res.status(200).send(users);
};
