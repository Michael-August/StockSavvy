import { Router } from "express";
import { login, registerUser } from "../controllers/auth.controller.js";
import {
	createUserValidator,
	loginValidator,
} from "../utils/user.validators.js";

const authRoutes = Router();

authRoutes.post("/login", loginValidator, login);
authRoutes.post("/register", createUserValidator, registerUser);

export default authRoutes;
