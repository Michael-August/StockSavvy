import dotenv from "dotenv";
dotenv.config();

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
	errorResponse,
	successResponse,
} from "../middlewares/responses.middlewares";
import { validationResult } from "express-validator";
import User from "../models/User";
import { Request, Response } from "express";

export const login = async (req:Request, res: Response) => {
	try {
		const user = await User.findOne({ where: { email: req.body.email } });

		if (!user) {
			return errorResponse(res, undefined, `Invalid email or password`, 404);
		}

		const password_valid = bcrypt.compareSync(
			req.body.password,
			user.password
		);
		if (!password_valid)
			errorResponse(res, undefined, "Invalid email or password", 404);

		let token = jwt.sign(
			{ email: user.email, role: user.role },
			process.env.JWT_SECRET as string,
			{ expiresIn: "1h" }
		);
		const response = { user, token };
		successResponse(res, response, "Login successful");
	} catch (error) {
		errorResponse(res, undefined, "Server error!", 500);
	}
};

export const registerUser = async (req: Request, res: Response) => {
	// const salt = await bcrypt.genSalt(10);
	const validationErrors = validationResult(req);

	if (validationErrors.array().length > 0) {
		return errorResponse(
			res,
			validationErrors.array(),
			"Check your form, make sure all fields are valid",
			422
		);
	}

	const newUser = {
		...req.body,
		// password: bcrypt.hashSync(req.body.password, salt),
	};

	try {
		const created_user = await User.create(newUser);

		// @ts-ignore
		delete created_user?.password;
		successResponse(
			res,
			created_user,
			`User ${created_user.firstName} created successfully`,
			201
		);
	} catch (error: any) {
		errorResponse(res, error, "Server error!", 500);
	}
};
