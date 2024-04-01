  import  express  from "express";
  import {
    cancelPaymentPaypal,
    captureOrderPaypal,
    createOrderMP,
    createOrderPaypal,
    // GetWebhookMP,
    successMP,
    webhookMP,
  } from "../controllers/payment.controller.js";

  const router = express.Router();

  // paypal
  router.post("/create-order-paypal", createOrderPaypal);
  router.get("/create-order-paypal", createOrderPaypal);
  router.get("/capture-order-paypal", captureOrderPaypal); // ← when payment accepted
  router.post("/capture-order-paypal", captureOrderPaypal);
  router.get("/cancel-order-paypal", cancelPaymentPaypal);

  // mercado pago
  router.post("/create-order-mp", createOrderMP)
  router.post("/webhook-mp", webhookMP)//listen to events
  // router.get("/webhook-mp", GetWebhookMP)

 //listen to events
  router.get("/success-mp", successMP)
  router.get("/pending-mp", (req, res)=>res.send("pending"))
  router.get("/failure-mp", (req, res)=>res.send("failure"))

  export default router ;
