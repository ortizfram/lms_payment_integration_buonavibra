import  express  from "express";
import {
  cancelSubscriptionPaypal,
  captureSubscriptionPaypal,
  createOrderMP,
  createSubscriptionPaypal,
  // GetWebhookMP,
  successMP,
  webhookMP,
} from "../controllers/subscription.controller.js";

const router = express.Router();

// paypal
router.post("/create-subscription-paypal", createSubscriptionPaypal);
router.get("/create-subscription-paypal", createSubscriptionPaypal);
router.get("/capture-subscription-paypal", captureSubscriptionPaypal); // ← when payment accepted
router.post("/capture-subscription-paypal",   captureSubscriptionPaypal);
router.get("/cancel-subscription-paypal", cancelSubscriptionPaypal);

// mercado pago
router.post("/create-order-mp", createOrderMP)
router.post("/webhook-mp", webhookMP)//listen to events
// router.get("/webhook-mp", GetWebhookMP)

//listen to events
router.get("/success-mp", successMP)
router.get("/pending-mp", (req, res)=>res.send("pending"))
router.get("/failure-mp", (req, res)=>res.send("failure"))

export default router ;
