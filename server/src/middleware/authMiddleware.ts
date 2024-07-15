import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from "express";
const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers['authorization'];
        if (!authHeader) {
            throw new Error("Authorization header is missing");
        }
        const token = authHeader.split(" ")[1];
        if (!token) {
            throw new Error("Token is missing from Authorization header");
        }
        const secret = process.env.SECRET_KEY || "dasfas";

        const decryptedToken = jwt.verify(token, secret);
        if (typeof decryptedToken === "string" || typeof decryptedToken === "number") {
            throw new Error("Invalid token");
        }
        req.body.id = decryptedToken.id;
        next();
    } catch (error: any) {
        if (error.message === "jwt expired") {
            return res.status(401).send("Token has expired");
        } else {
            // console.error(error);
            return res.status(401).send(error.message);
        }
    }
}

export default authMiddleware;