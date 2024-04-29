import mongoose from "mongoose";
import {
  BACKEND_URL,
  FRONTEND_URL,
  isDev,
  MP_ACCESS_TOKEN,
  MP_NOTIFICATION_URL,
} from "../config.js";
import Plan from "../models/plan.model.js";
import { MercadoPagoConfig, Preference } from "mercadopago";

export const createMembershipMP = async (req, res) => {
  console.log("\n\ncreateMembershipMP\n\n");
  const { planId, userId } = req.query;

  console.log(new mongoose.Types.ObjectId(planId));

  // Fetch course details based on the courseId using Mongoose
  const plan = await Plan.findById(new mongoose.Types.ObjectId(planId));
  if (!plan) {
    console.log("plan not found");
    return res.status(404).json({ message: "plan not found" });
  }
  console.log("\n\nFetched plan:", plan);

  // Step 2: Initialize the client object
  const client = new MercadoPagoConfig({
    accessToken: MP_ACCESS_TOKEN,
  });

  // calculate discount ARS for MP
  let adjustedDiscount = null;
  let withDiscount = null;
  if (plan.discount_ars !== null && plan.discount_ars > 0) {
    adjustedDiscount =
      plan.ars_price - (plan.ars_price * plan.discount_ars) / 100;
  }
  // Render the value based on the conditions
  {
    adjustedDiscount !== null ? (withDiscount = adjustedDiscount) : null;
  }

  let approvalLink;
  await new Preference(client)
    .create({
      body: {
        items: [
          {
            title: `Plan: ${plan.title} | ${plan.description}`,
            description: plan.description,
            quantity: 1,
            currency_id: "ARS",
            unit_price:
              adjustedDiscount !== null
                ? parseFloat(withDiscount)
                : parseFloat(plan.ars_price),
          },
        ],

        notification_url: `${MP_NOTIFICATION_URL}?planId=${planId}&userId=${userId}`,

        auto_recurring: {
          frequency: 1, // Specify frequency of the recurring payment
          frequency_type: "months", // Specify frequency type (days, weeks, months, years)
          start_date: new Date(),
          end_date: null,
          transaction_amount:
            adjustedDiscount !== null
              ? parseFloat(withDiscount)
              : parseFloat(plan.ars_price),
          currency_id: "ARS",
        },
        back_urls: {
            // success: `${MP_NOTIFICATION_URL}?courseId=${course._id}&userId=${userId}`,
            success: `${FRONTEND_URL}/thanks?q=${planId}`,
            failure: `${BACKEND_URL}/api/order/failure-mp`,
            pending: `${BACKEND_URL}/api/order/pending-mp`,
          },
      },
    })
    .then((preference) => {
      console.log("preference ", preference);
      if (isDev) {
        approvalLink = `${preference.sandbox_init_point}`;
      } else {
        approvalLink = `${preference.init_point}`;
      }
      res.status(200).json({ approvalLink });
    })
    .catch(console.log);
};



export default createMembershipMP;
