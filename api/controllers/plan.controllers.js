import mongoose from "mongoose";
import Plan from "../models/plan.model.js";
import { FRONTEND_URL } from "../../client/src/config.js";

// Controller functionss
const createPlan = async (req, res) => {
  //   console.log(req.body);
  //   console.log(req.files);
  try {
    const imageUrl =
      req.files && req.files["image"]
        ? "/uploads/imgs/" + req.files["image"][0].filename
        : null;

    // if (!imageUrl) {
    //   return res.status(400).json({ message: " miniatura is required" });
    // }
    const {
      title,
      description,
      ars_price,
      usd_price,
      discount_ars,
      discount_usd,
      payment_link_ars,
      payment_link_usd,
    } = req.body;

    const requiredFields = ["title", "description", "ars_price", "usd_price"];
    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res
          .status(400)
          .json({ message: `The field '${field}' is required.` });
      }
    }
    let planTitle = title;
    if (typeof title !== "string") {
      planTitle = String(title);
    }

    const discountArs = discount_ars || null;
    const discountUsd = discount_usd || null;

    const newPlan = new Plan({
      title: planTitle,
      description,
      ars_price,
      usd_price,
      discount_ars: discountArs,
      discount_usd: discountUsd,
      payment_link_ars,
      payment_link_usd,
      thumbnail: imageUrl,
    });

    await newPlan.save();

    console.log("\nCreating plan...");
    console.log("Plan:", newPlan);

    return res
      .status(201)
      .json({ message: "Plan created successfully", planId: newPlan._id });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "titulo del plan ya existe, busca uno nuevo", error });
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

    // Fetch existing course from the database
    const plan = await Plan.findById(planId);

    if (!plan) {
      return next(errorHandler(400, `Course not found.`));
    }

    let imageUrl = course.thumbnail; // Preserve existing thumbnail URL

    // Check if new files are provided in the request
    if (req.files) {
      imageUrl = req.files["image"]
        ? "/uploads/imgs/" + req.files["image"][0].filename
        : imageUrl;
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
      author_id,
    } = req.body;

    if (typeof title !== "string") {
      String(title);
    }

    const discountArs = discount_ars || null;
    const discountUsd = discount_usd || null;

    const currentTimestamp = moment().format("YYYY-MM-DD HH:mm:ss");

    // Fetch the user object from the database using the author_id

    const updateData = {
      ...req.body,
      title,
      discount_ars: discountArs,
      discount_usd: discountUsd,
      thumbnail: imageUrl,
      updated_at: currentTimestamp,
    };

    // Update course details
    const updatePlan = await Plan.findByIdAndUpdate(new mongoose.Types.ObjectId(planId), updateData, {
      new: true,
    });

    const updatedPlan = await updatePlan.save();

    console.log("\nUpdating plan...");
    console.log("\Plan:", updatedPlan);

    return res.status(200).json({
      message: "Plan updated successfully",
      planId,
      redirectUrl: `${FRONTEND_URL}/plans/${planId}`,
    });
  } catch (error) {
    return res.json({message:"error updating plan", error});
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
