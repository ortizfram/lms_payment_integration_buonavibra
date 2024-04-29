import express from "express";
import {
  createPlan,
  deletePlan,
  getPlanById,
  getPlans,
  updatePlan,
} from "../controllers/plan.controllers.js";
import upload from "../useMulter.js";

const route = express.Router();

// Routes for CRUD operations on plans
route.post("/", upload.fields([{ name: "image" }]), createPlan);
route.get("/", getPlans);
route.get("/:id", getPlanById);
route.put("/update/:id", upload.fields([{ name: "image"}]), updatePlan);
route.delete("/delete/:id", deletePlan);
// list 1 from id
route.get("/:id/fetch", getPlanById);

export default route;
