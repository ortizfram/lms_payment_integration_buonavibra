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
    thumbnail: { type: String, default: null },
    video: { type: String, default: null }, // Including the video field
    author_id: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Assuming there's a User model
  },
  { timestamps: true }
);

const Course = mongoose.model('Course', courseSchema);

export default Course;
