import mongoose from "mongoose";
import UserPlan from "../models/user_plan.model.js";

export const getNewestEnrolledPlan = async (userId) => {
    console.log(`getNewestEnrolledPlan(${userId})`)
  try {
    // Find the newest enrolled plan for the user
    let newestEnrolledPlan = await UserPlan.find({ user_id: new mongoose.Types.ObjectId(userId) })
      .sort({ createdAt: -1 })
      .populate("plan_id"); // Populate the plan details if needed
      console.log("result ", newestEnrolledPlan)

       // Extract the first plan_id if the array is not empty
    const planId = newestEnrolledPlan.length > 0 ? newestEnrolledPlan[0].plan_id._id : null;

    return planId;
  } catch (error) {
    console.error("Error fetching newest enrolled plan:", error);
    throw error;
  }
};
