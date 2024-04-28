import { Request, Response } from "express";
import User from "../models/User";

export const getUsers = async (request: Request, response: Response) => {
	const users = await User.findAll();
	response.json(users)
};
