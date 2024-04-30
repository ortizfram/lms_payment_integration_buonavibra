import express from "express"
import { asignPlanToUserMP, asignPlanToUserPP } from "../controllers/membership.controller.js"
const router = express.Router()

//api/membership
router.post("/success-mp", asignPlanToUserMP)
router.post("/success-pp", asignPlanToUserPP)

export default router