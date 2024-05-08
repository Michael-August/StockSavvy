import { Router } from "express";
import { getBusinesses, registerBusiness } from "../controllers/business.controller";

const businessRoutes = Router()

businessRoutes.get('/', getBusinesses)
businessRoutes.post('/', registerBusiness)

export default businessRoutes;