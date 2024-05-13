import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'

import dotenv from "dotenv";
dotenv.config();

export interface CustomRequest extends Request {
  user: any;
}

export const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
    // Check if authorization header is present
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization header missing! Provide authorization header' });
    }

    // Extract token from header
    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Token missing! Provide token' });
    }

    try {
        // Verify JWT token
        const decoded = jwt.verify(token, `${process.env.JWT_SECRET}`);
        (req as any).user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
}