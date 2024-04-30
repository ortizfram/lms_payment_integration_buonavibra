import express from "express"
import { asignPlanToUserMP } from "../controllers/membership.controller.js"
const router = express.Router()

//api/membership
router.post("/success-mp", asignPlanToUserMP)

export default router