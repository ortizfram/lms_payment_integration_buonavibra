import { Router } from "express";
import emailContactForm from "../controllers/index.controller.js";

const router = Router();

router.post("/send-email", emailContactForm);

export default router;
