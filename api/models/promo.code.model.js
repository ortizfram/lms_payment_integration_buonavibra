import mongoose from "mongoose";

const PromoCodeSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
    },
    exp_date: {
      type: Date,
      required: true,
    },
    available: {
      type: Boolean,
      default: true,
    },
    perc_int: {
      type: Number,
      required: true,
    },
    currency: {
      // can be applied to prices in x currency or all
      type: String,
      enum: ["USD", "ARS", "BOTH"],
      required: true,
    },
  },
  { timestamps: true }
);

const PromoCode = mongoose.model("PromoCode", PromoCodeSchema);

export default PromoCode;
