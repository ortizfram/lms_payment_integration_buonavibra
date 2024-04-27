import mongoose from 'mongoose';


const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, default: null },
    text_content: { type: String, default: null },
    ars_price: { type: Number, required: true },
    usd_price: { type: Number, required: true },
    discount_ars: { type: Number, default: null },
    discount_usd: { type: Number, default: null },
    thumbnail: { type: String, default: null, required:false },
    video: { type: String, default: null, required:false }, // Including the video field
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const Course = mongoose.model('Course', courseSchema);

export default Course;
