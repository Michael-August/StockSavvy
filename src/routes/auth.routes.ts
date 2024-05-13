import { Router } from "express";
import { login, passwordSetup, registerUser, verifyEmail } from "../controllers/auth.controller";
import {
	createUserValidator,
	loginValidator,
} from "../middlewares/user.validators";

const authRoutes = Router();

authRoutes.post("/", loginValidator, login);
authRoutes.post("/register", createUserValidator, registerUser);
authRoutes.get("/verify-email", verifyEmail);
authRoutes.post('/setup-password', passwordSetup);


export default authRoutes;
