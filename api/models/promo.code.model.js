import mongoose from "mongoose";

const promoCodeSchema = new mongoose.Schema(
  {
    exp_date: {
      type: Date,
      required: true,
    },
    perc_int: {
      type: Number,
      required: true,
    },
    currency: { // can be applied to prices in x currency or all
      type: String,
      enum: ["USD", "ARS", "BOTH"],
      required: true,
    },
  },
  { timestamps: true }
);

const PromoCode = mongoose.model("promoCode", promoCodeSchema);

export default PromoCode;
