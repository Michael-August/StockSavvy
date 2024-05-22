import { Request, Response } from "express"
import db from "../config/database"
import Product, { ProductAttributes } from "../models/Product"
import { errorResponse, successResponse } from "../middlewares/responses.middlewares"


export const getBusinessProducts = async (request: Request, response: Response) => {
    try {
        const products = await Product.findAll()
        successResponse(response, products, 'Products fetched Successfully', 200)
    } catch (error) {
        errorResponse(response, undefined, 'Try again later', 500)
    }
}