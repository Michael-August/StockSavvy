import User from "../models/User.js";

export const getUsers = async (req, res) => {
	const users = User.findAll();
	res.json(users);
};
