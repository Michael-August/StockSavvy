import { Request, Response } from "express"
import Business from "../models/Business"
import db from "../config/database"
import User, { UserAttributes } from "../models/User"
import { errorResponse, successResponse } from "../middlewares/responses.middlewares"

import { v4 as uuidv4 } from 'uuid';
import { mailTransporter } from "../utils/mailTransporter"

export const getBusinesses = async (request: Request, response: Response) => {
    const businesses = await Business.findAll()
    response.json(businesses)
}

export const registerBusiness = async (request: Request, response: Response) => {

    const newBusiness = {
        ...request.body?.business
    }

    const transaction = await db.transaction();

    try {

        const business = await Business.create(newBusiness, { transaction })

        const verificationToken = uuidv4()
	    const verificationLink = `http://localhost:4000/verify-email/?token=${verificationToken}`

        const newUser: UserAttributes = {
            ...request.body?.user,
            verificationToken,
            verified: false,
            role: 'ADMIN',
            businessId: business.id
        }
        const user = await User.create(newUser, { transaction })

        const mailData = {
			from: `${process.env.EMAIL}`,
			to: newUser.email,
			subject: 'StockSavy Verification',
			html: `<h1>Click the link below to verify your email with stock savvy</h1>
					<a href="${verificationLink}">Verify Email.</a>`
		}

		mailTransporter.sendMail(mailData, (error, info) => {
			if (error) {
				console.log(error)
				errorResponse(response, error, "verification email couldn't send, try registering again", 400);
			}
		})

        await transaction.commit();

        successResponse(
			response,
			{business, user},
			`Business ${business.businessName} created successfully`,
			201
		);
        
    } catch (error: any) {
        await transaction.rollback()
        errorResponse(response, error, "Server error!", 500);
    }

}