import { Router } from "express";
import { getBusinessProducts, } from "../controllers/product.controller";

const productRoutes = Router()

productRoutes.get('/', getBusinessProducts)
// productRoutes.post('/', createProduct)
// productRoutes.post('/', updateProduct)

export default productRoutes;