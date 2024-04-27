import mongoose from "mongoose";

const userCourseSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    course_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
  },
  { timestamps: true }
);

const UserCourse = mongoose.model("userCourse", userCourseSchema);

export default UserCourse;
