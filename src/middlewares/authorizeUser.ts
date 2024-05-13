import { NextFunction, Request, Response } from "express";
import { IRole } from "../interfaces/role.model";
import { CustomRequest } from "./verifyJWT.middleware";

export const authorizeUser = (requiredRole: IRole) => {
    return (req: CustomRequest, res:Response, next: NextFunction) => {
        // Check if user has required role
        if (req.user.role !== requiredRole) {
            return res.status(403).json({ message: 'Unauthorized' });
        }
        next();
    };
};