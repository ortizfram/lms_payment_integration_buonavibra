import mongoose from "mongoose";
import { FRONTEND_URL } from "../config.js";
import Plan from "../models/plan.model.js";
import UserPlan from "../models/user_plan.model.js";

// this is after btn subscription success redirect link
export const asignPlanToUserMP = async (req, res) => {
  //api/membership/success-mp
  console.log("\n\napi asignPlanToUserMP\n\n");

  const { user_id, id, type } = req.body;
  // console.log("Received user_id:", user_id);
  // console.log("Received id:", id);
  // console.log("Received type:", type);

  if (type === "mp" && id) {
    console.log("enter validation");
    // Fetch plan details based on the id using Mongoose
    const plan = await Plan.findById(new mongoose.Types.ObjectId(id));
    if (!plan) {
      console.log("Plan not found");
      return res.status(404).json({ message: "Plan not found" });
    }
    console.log("plan exists");

    if (plan && user_id) {
      console.log("asignPlanToUserMP");
      const newUserPlan = new UserPlan({
        user_id: user_id,
        plan_id: id,
      });
      await newUserPlan.save();

      console.log(
        `👌🏽 --Inserted into UserPlan: user_id: ${user_id}, plan_id: ${id}`
      );

      // here we must redirect in frontend
      // Return the HTML button to redirect to the course
      const redirectUrl = `${FRONTEND_URL}/course/all?q=${id}`;
      return res.status(201).json({ redirectUrl });
    }
  }
};
