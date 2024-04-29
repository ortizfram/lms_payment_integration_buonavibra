import express from "express"
import { createMembershipMP } from "../controllers/membership.controller.js"
const router = express.Router()


router.post("/create-mp", createMembershipMP)//api/membership/create-mp

export default router