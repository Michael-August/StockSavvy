import { Router } from "express";
import { login, registerUser } from "../controllers/auth.controller";
import {
	createUserValidator,
	loginValidator,
} from "../middlewares/user.validators";

const authRoutes = Router();

authRoutes.post("/login", loginValidator, login);
authRoutes.post("/register", createUserValidator, registerUser);

export default authRoutes;
