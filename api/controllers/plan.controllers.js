import mongoose from "mongoose";
import Plan from "../models/plan.model.js";
import { FRONTEND_URL } from "../../client/src/config.js";

// Controller functionss
const createPlan = async (req, res) => {
  try {
    const imageUrl =
      req.files && req.files["image"]
        ? "/uploads/imgs/" + req.files["image"][0].filename
        : null;

    const {
      title,
      description,
      ars_price,
      usd_price,
      discount_ars,
      discount_usd,
      payment_link_ars,
      payment_link_usd,
      stock // Add stock to the destructuring
    } = req.body;

    const requiredFields = ["title", "description", "ars_price", "usd_price"];
    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res
          .status(400)
          .json({ message: `El campo '${field}' es requerido.` });
      }
    }

    const discountArs = discount_ars || null;
    const discountUsd = discount_usd || null;

    const newPlan = new Plan({
      title,
      description,
      ars_price,
      usd_price,
      discount_ars: discountArs,
      discount_usd: discountUsd,
      payment_link_ars,
      payment_link_usd,
      thumbnail: imageUrl,
      stock: stock === 'true' // Ensure stock is set correctly
    });

    await newPlan.save();

    return res
      .status(201)
      .json({ message: "Plan created successfully", planId: newPlan._id });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Error creating plan", error });
  }
};

const getPlans = async (req, res) => {
  try {
    const plans = await Plan.find();
    return res.status(200).json({ success: true, data: plans });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

const getPlanById = async (req, res) => {
  try {
    const plan = await Plan.findById(req.params.id);
    if (!plan) {
      return res.status(404).json({ success: false, error: "Plan not found" });
    }
    return res.status(200).json({ plan });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

const updatePlan = async (req, res) => {
  try {
    const planId = req.params.id;

    // Fetch existing plan from the database
    const plan = await Plan.findById(planId);

    if (!plan) {
      return res.status(404).json({ message: `Plan not found.` });
    }

    let imageUrl = plan.thumbnail; // Preserve existing thumbnail URL

    // Check if new files are provided in the request
    if (req.files && req.files["image"]) {
      imageUrl = "/uploads/imgs/" + req.files["image"][0].filename;
    }

    // Extract necessary data from request body
    const {
      title,
      description,
      ars_price,
      usd_price,
      discount_ars,
      discount_usd,
      payment_link_ars,
      payment_link_usd,
      stock,  // Add stock to destructured values
      author_id,
    } = req.body;

    // Convert title to string if it's not already
    const updatedTitle = typeof title === "string" ? title : String(title);

    // Validate and set discount values
    const discountArs = parseInt(discount_ars) || null;
    const discountUsd = parseInt(discount_usd) || null;

    // Construct update data object
    const updateData = {
      title: updatedTitle,
      description,
      ars_price,
      usd_price,
      discount_ars: discountArs,
      discount_usd: discountUsd,
      payment_link_ars,
      payment_link_usd,
      stock: stock === "true" || stock === true,  // Ensure stock is boolean
      author_id,
      thumbnail: imageUrl,
    };

    console.log("Updating plan...");

    // Update plan details
    const updatedPlan = await Plan.findByIdAndUpdate(
      new mongoose.Types.ObjectId(planId),
      updateData,
      {
        new: true,
      }
    );

    console.log("Plan updated successfully");

    return res.status(200).json({
      message: "Plan updated successfully",
      planId: updatedPlan._id,
      redirectUrl: `/#/plans/${updatedPlan._id}`,
    });
  } catch (error) {
    console.error("Error updating plan:", error);
    return res.status(500).json({ message: "Error updating plan", error });
  }
};



const deletePlan = async (req, res) => {
  try {
    const plan = await Plan.findByIdAndDelete(req.params.id);
    if (!plan) {
      return res.status(404).json({ success: false, error: "Plan not found" });
    }
    return res.status(200).json({ success: true, data: {} });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export { createPlan, getPlans, getPlanById, updatePlan, deletePlan };
