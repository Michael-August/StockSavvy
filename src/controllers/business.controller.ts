import { Request, Response } from "express"
import Business from "../models/Business"
import db from "../config/database"
import User, { UserAttributes } from "../models/User"
import { errorResponse, successResponse } from "../middlewares/responses.middlewares"

import { v4 as uuidv4 } from 'uuid';

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

        const newUser: UserAttributes = {
            ...request.body?.user,
            verificationToken,
            verified: false,
            role: 'ADMIN',
            businessId: business.id
        }
        const user = await User.create(newUser, { transaction })

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