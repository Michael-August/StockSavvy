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

import { v4 as uuidv4 } from 'uuid';
import { mailTransporter } from "../utils/mailTransporter";

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
			{ email: user.email, role: user.role, businessId: user.businessId },
			process.env.JWT_SECRET as string,
			{ expiresIn: "1d" }
		);
		const response = { user, token };
		successResponse(res, response, "Login successful");
	} catch (error) {
		errorResponse(res, undefined, "Server error!", 500);
	}
};

export const registerUser = async (req: Request, res: Response) => {
	const validationErrors = validationResult(req);

	if (validationErrors.array().length > 0) {
		return errorResponse(
			res,
			validationErrors.array(),
			"Check your form, make sure all fields are valid",
			422
		);
	}

	const verificationToken = uuidv4()
	const verificationLink = `http://localhost:4000/verify-email/?token=${verificationToken}`

	const newUser = {
		...req.body,
		verificationToken
	};

	try {
		const created_user = await User.create(newUser);

		// @ts-ignore
		delete created_user?.password;

		const mailData = {
			from: `${process.env.EMAIL}`,
			to: created_user.email,
			subject: 'StockSavy Verification',
			html: `<h1>Click the link below to verify your email with stock savvy</h1>
					<a href="${verificationLink}">Verify Email.</a>`
		}

		mailTransporter.sendMail(mailData, (error, info) => {
			if (error) {
				console.log(error)
				errorResponse(res, error, "verification email couldn't send, try registering again", 400);
			} else {
				console.log('Email sent:', info.response);
				successResponse(
					res,
					created_user,
					`User ${created_user.firstName} created successfully, Check email for verification`,
					201
				);
			}
		})
	} catch (error: any) {
		errorResponse(res, error, "Server error!", 500);
	}
};

export const verifyEmail = async (req: Request, res: Response) => {
  const token = req.query.token as string;
  
	try {
		const user = await User.findOne({ where: { verificationToken: token } });
		
		if (!user) {
			return res.status(401).json({ message: 'Invalid token' });
		}

		user.verified = true;
		user.verificationToken = "";

		await user.save();

		res.json({ message: 'Email verified successfully. Please set up your password.' });
	} catch (error: any) {
		errorResponse(res, error, "Server error!", 500);
	}
}

export const passwordSetup = async (req: Request, res: Response) => {
	const salt = await bcrypt.genSalt(10);
	const { password, confirmPassword } = req.body;

	try {
		const user = await User.findOne({ where: { verified: true } });

		if (!user) {
			return res.status(401).json({ message: 'User not found, please signup first' });
		}
		
		if (password !== confirmPassword) {
			return res.status(400).json({ message: 'Passwords do not match' });
		}
		
		user.password = bcrypt.hashSync(password, salt),
		
		await user.save();
		res.json({ message: 'Password set up successfully' });
	} catch (error: any) {
		errorResponse(res, error, "Server error!", 500);
	}
}
