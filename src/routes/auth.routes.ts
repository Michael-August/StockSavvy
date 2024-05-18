import { Router } from "express";
import { login, passwordSetup, registerUser, verifyEmail } from "../controllers/auth.controller";
import {
	createUserValidator,
	loginValidator,
} from "../middlewares/user.validators";
import { authorizeUser } from "../middlewares/authorizeUser";
import { verifyJWT } from "../middlewares/verifyJWT.middleware";

const authRoutes = Router();

authRoutes.post("/", loginValidator, login);
authRoutes.post("/register", verifyJWT, authorizeUser('ADMIN'), createUserValidator, registerUser);
authRoutes.get("/verify-email", verifyEmail);
authRoutes.post('/setup-password', passwordSetup);


export default authRoutes;
