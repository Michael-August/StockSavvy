import { body } from "express-validator";

export const loginValidator = [
	body("email", "Invalid can not be Empty").not().isEmpty(),
	body("email", "Invalid email").isEmail(),
	body("password", "The minimum password length is 8 characters").isLength({
		min: 8,
	}),
];

export const createUserValidator = [
	body("email", "Email can not be Empty").not().isEmpty(),
	body("email", "Invalid email").isEmail(),
	body("phoneNumber", "Phone number does not Empty").not().isEmpty(),
	body("firstName", "firstname can not be Empty").not().isEmpty(),
	body("lastName", "lastname can not be Empty").not().isEmpty(),
	body("phoneNumber", "The minimum phone number length is 11 characters").isLength({
		min: 11,
	}),
];
