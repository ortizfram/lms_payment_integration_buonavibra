import mongoose from "mongoose";

const planSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: null },
    ars_price: { type: Number, required: true },
    usd_price: { type: Number, required: true },
    discount_ars: { type: Number, default: null },
    discount_usd: { type: Number, default: null },
    payment_link_usd: { type: String, default: null, required:false },
    payment_link_ars: { type: String, default: null, required:false },
    thumbnail: { type: String, default: null, required:false },
  },
  { timestamps: true }
);

const Plan = mongoose.model("Plan", planSchema);

export default Plan;
