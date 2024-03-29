import { Router } from "express";
import emailContactForm from "../controllers/index.controller";

const router = Router();

router.post("/send-email", emailContactForm);

export default router;
