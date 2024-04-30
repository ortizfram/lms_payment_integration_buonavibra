import mongoose from "mongoose";
import { FRONTEND_URL } from "../config.js";
import Plan from "../models/plan.model.js";
import UserPlan from "../models/user_plan.model.js";

// this is after btn subscription success redirect link
export const asignPlanToUserMP = async (req, res,uid) => {//api/membership/success-mp
  const paymentType = req.query.type;
  const planId = req.query.id;
  const userId = uid;

  if (paymentType === "mp" && planId) {
    // Fetch plan details based on the planId using Mongoose
    const plan = await Plan.findById(new mongoose.Types.ObjectId(planId));
    if (!plan) {
      console.log("Plan not found");
      return res.status(404).json({ message: "Plan not found" });
    }

    console.log(userId, typeof(userId))
    console.log(planId, typeof(planId))

    if (plan && userId) {
      const newUserPlan = new UserPlan({
        user_id: userId,
        plan_id: planId,
      });
      await newUserPlan.save();

      console.log(
        `👌🏽 --Inserted into UserPlan: user_id: ${userId}, plan_id: ${planId}`
      );

      // here we must redirect in frontend
      // Return the HTML button to redirect to the course
      const redirectUrl = `${FRONTEND_URL}/course/all?q=${planId}`;
      return res.status(201).send(redirectUrl);
    }
  }
};

export const asignPlanToUserPP = async (req,res,uid)=> {//api/membership/success-pp
  const paymentType = req.query.type;
  const planId = req.query.id;
  const userId = uid;

  if (paymentType === "pp" && planId) {
    // Fetch plan details based on the planId using Mongoose
    const plan = await Plan.findById(new mongoose.Types.ObjectId(planId));
    if (!plan) {
      console.log("Plan not found");
      return res.status(404).json({ message: "Plan not found" });
    }

    console.log(userId, typeof(userId))
    console.log(planId, typeof(planId))

    if (plan && userId) {
      const newUserPlan = new UserPlan({
        user_id: userId,
        plan_id: planId,
      });
      await newUserPlan.save();

      console.log(
        `👌🏽 --Inserted into UserPlan: user_id: ${userId}, plan_id: ${planId}`
      );

      // here we must redirect in frontend
      // Return the HTML button to redirect to the course
      const redirectUrl = `${FRONTEND_URL}/course/all?q=${planId}`;
      return res.status(201).send(redirectUrl);
    }
  }
}
