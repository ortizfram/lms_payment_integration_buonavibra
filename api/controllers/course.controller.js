import Course from "../models/course.model.js";
import { errorHandler } from "../utils/error.js";
import slugify from "slugify";
import moment from "moment";
import User from "../models/user.model.js";
import UserCourse from "../models/user_course.model.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import PromoCode from "../models/promo.code.model.js";

// create
export const courseCreate = async (req, res, next) => {
  console.log(req.body);
  console.log(req.files);

  try {
    const imageUrl =
      req.files && req.files["image"]
        ? "/uploads/imgs/" + req.files["image"][0].filename
        : null;
    const videoUrl =
      req.files && req.files["video"]
        ? "/uploads/videos/" + req.files["video"][0].filename
        : null;

    if (!imageUrl && !videoUrl) {
      return next(errorHandler(400, "Video and miniatura are required"));
    }

    const {
      title,
      description,
      text_content,
      ars_price,
      usd_price,
      discount_ars,
      discount_usd,
    } = req.body;

    const requiredFields = [
      "title",
      "description",
      "text_content",
      "ars_price",
      "usd_price",
    ];
    for (const field of requiredFields) {
      if (!req.body[field]) {
        return next(errorHandler(400, `The field '${field}' is required.`));
      }
    }

    let courseTitle = title;
    if (typeof title !== "string") {
      courseTitle = String(title);
    }

    const courseSlug = slugify(courseTitle, { lower: true, strict: true });

    const discountArs = discount_ars || null;
    const discountUsd = discount_usd || null;

    const currentDate = new Date();
    const currentTimestamp = moment().format("YYYY-MM-DD HH:mm:ss");

    const { author_id } = req.body;

    const author = await User.findById(author_id);

    const newCourse = new Course({
      title: courseTitle,
      slug: courseSlug,
      description,
      text_content,
      ars_price,
      usd_price,
      discount_ars: discountArs,
      discount_usd: discountUsd,
      thumbnail: imageUrl,
      video: videoUrl,
      created_at: currentTimestamp,
      updated_at: currentTimestamp,
      author: author,
    });

    await newCourse.save();

    console.log("\nCreating course...");
    console.log("\nCourse:", newCourse);

    return res.status(201).json({
      message: "Course created successfully",
      courseId: newCourse._id,
    });
  } catch (error) {
    return next(error);
  }
};
// Update
export const courseUpdate = async (req, res, next) => {
  console.log(req.files);

  try {
    const courseId = req.params.id;

    // Fetch existing course from the database
    const course = await Course.findById(courseId);

    if (!course) {
      return next(errorHandler(400, `Course not found.`));
    }

    const imageUrl =
      (await req.files) && req.files["image"]
        ? "/uploads/imgs/" + req.files["image"][0].filename
        : null;
    console.log(imageUrl);
    const videoUrl =
      (await req.files) && req.files["video"]
        ? "/uploads/videos/" + req.files["video"][0].filename
        : null;
    console.log(videoUrl);

    // Extract necessary data from request body
    const {
      title,
      description,
      text_content,
      ars_price,
      usd_price,
      discount_ars,
      discount_usd,
    } = req.body;

    if (typeof title !== "string") {
      String(title);
    }

    const courseSlug = slugify(title, { lower: true, strict: true });

    const discountArs = discount_ars || null;
    const discountUsd = discount_usd || null;

    const currentTimestamp = moment().format("YYYY-MM-DD HH:mm:ss");

    const { author_id } = req.body;

    // Fetch the user object from the database using the author_id
    const author = await User.findById(author_id);

    const updateData = {
      ...req.body,
      title,
      slug: courseSlug,
      discount_ars: discountArs,
      discount_usd: discountUsd,
      thumbnail: imageUrl,
      video: videoUrl,
      updated_at: currentTimestamp,
      author: author_id,
    };

    // Update course details
    const updateCourse = await Course.findByIdAndUpdate(courseId, updateData, {
      new: true,
    });

    const updatedCourse = await updateCourse.save();

    console.log("\nUpdating course...");
    console.log("\nCourse:", updatedCourse);

    return res.status(200).json({
      message: "Course updated successfully",
      courseId: updatedCourse._id,
      redirectUrl: `/course/${courseId}`,
    });
  } catch (error) {
    return next(error);
  }
};
// courselist
export const courselist = async (req, res, next) => {
  try {
    const message = req.query.message;
    const user = req.user;

    // Fetch enrolled course IDs for the current user
    const enrolledCourses = await UserCourse.find({ user_id: user }).distinct(
      "course_id"
    );

    // Fetch courses that the user has not enrolled in
    const coursesNotEnrolled = await Course.find({
      _id: { $nin: enrolledCourses },
    })
      .populate("author", "name username avatar")
      .sort({ updated_at: -1 })
      .lean();

    // Map courses to desired response format
    const formattedCourses = coursesNotEnrolled.map((course) => ({
      _id: course._id,
      title: course.title,
      slug: course.slug,
      description: course.description,
      ars_price: course.ars_price,
      usd_price: course.usd_price,
      discount_ars: course.discount_ars,
      discount_usd: course.discount_usd,
      thumbnail: `http://localhost:2020${course.thumbnail}`,
      thumbnailPath: course.thumbnail,
      created_at: new Date().toLocaleString(),
      updated_at: new Date().toLocaleString(),
      next: `/course/${course._id}`, // Dynamic course link
      author: {
        username: course.author.username,
        email: course.author.email,
        avatar: course.author.avatar,
      },
    }));

    res.status(200).json({
      courses: formattedCourses,
      totalItems: formattedCourses.length,
      message,
    });
  } catch (error) {
    console.log("Error fetching courses:", error);
    next(error);
  }
};
// checkEnroll
export const checkEnroll = async (req, res) => {
  console.log("middleware checkEnroll");
  const courseId = req.params.id;
  const token = await req.cookies.token;

  // check if token exists
  if (!token)
    return res
      .status(401)
      .json({ message: "Unauthorized", details: "checkEnroll: not token" });

  try {
    // check token is valid
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    // generate a user for browser
    req.user = verified.user;
    console.log("req.user ", req.user);
    const userId = req.user;
    console.log("userId", userId);
    if (!userId) {
      return res
        .status(401)
        .json({ message: "Unauthorized", detail: "checkEnroll: no user" });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json("Course not found");
    }

    // make them mongoose objt to be compared with the ones on UserCourse table
    const enrollCheck = await UserCourse.find({
      user_id: new mongoose.Types.ObjectId(userId),
      course_id: new mongoose.Types.ObjectId(course._id),
    });

    if (enrollCheck.length > 0) {
      return res.status(200).json("OK enrolled");
    } else {
      return res.status(401).json("User is not enrolled in the course");
    }
  } catch (error) {
    console.error("Error checkEnroll:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
// courseEnroll
export const courseEnroll = async (req, res) => {
  console.log("courseEnroll");
  const courseId = req.params.id;

  const user = req.user;
  if (!user) {
    return res.status(401).json("Unauthorized");
  }

  const course = await Course.findById(courseId);
  if (!course) {
    return res.status(404).json("Course not found");
  }

  if (course) {
    const courseData = {
      id: course.id,
      title: course.title,
      slug: course.slug,
      description: course.description,
      ars_price: course.ars_price,
      usd_price: course.usd_price,
      discount: course.discount,
      thumbnail: course.thumbnail,
      author: {
        // Include author details in courseData
        name: course.author_name,
        username: course.author_username,
        avatar: course.author_avatar,
      },
    };

    res.status(200).json({ course: courseData });
  } else {
    res.status(404).json("Course not found");
  }
};
// courseOwned
export const courseOwned = async (req, res, next) => {
  try {
    const message = req.query.message;
    const user = req.user;

    // Fetch enrolled course IDs for the current user
    const enrolledCourses = await UserCourse.find({ user_id: user }).distinct(
      "course_id"
    );

    // Fetch courses based on enrolled course IDs
    const courses = await Course.find({ _id: { $in: enrolledCourses } })
      .populate("author", "name username avatar")
      .sort({ updated_at: -1 })
      .lean();

    // Map courses to desired response format
    const formattedCourses = courses.map((course) => ({
      _id: course._id,
      title: course.title,
      slug: course.slug,
      description: course.description,
      ars_price: course.ars_price,
      usd_price: course.usd_price,
      discount_ars: course.discount_ars,
      discount_usd: course.discount_usd,
      thumbnail: `http://localhost:2020${course.thumbnail}`,
      thumbnailPath: course.thumbnail,
      created_at: new Date().toLocaleString(),
      updated_at: new Date().toLocaleString(),
      next: `/course/${course._id}`, // Dynamic course link
      author: {
        username: course.author.username,
        email: course.author.email,
        avatar: course.author.avatar,
      },
    }));

    res.status(200).json({
      courses: formattedCourses,
      totalItems: formattedCourses.length,
      message,
    });
  } catch (error) {
    console.log("Error fetching courses:", error);
    next(error);
  }
};
// courseDetail
export const courseDetail = async (req, res, next) => {
  console.log("courseDetail||fetchCourse");
  const courseId = req.params.id;
  const user = req.user;
  const message = req.query.message;

  try {
    // Fetch course details including author information
    const course = await Course.findById(courseId)
      .populate("author", "name username avatar")
      .lean();

    if (!course) {
      return res.status(404).json(`Course not found`);
    }

    // Fetching author details
    const author = await User.findById(course.author).lean();

    if (!author) {
      return res.status(404).json(`Author details not found`);
    }

    // Extend course with author details
    course.author = {
      name: author.username,
      email: author.email,
      avatar: author.profilePicture,
    };

    // add host predix to video\
    if (course.video) {
      course.video = `http://localhost:2020${course.video}`;
    }

    // Fetch enrolled courses for the user
    let enrolledCourses = [];
    if (user) {
      const enrolledCoursesIds = await UserCourse.find({
        user_id: user._id,
      }).distinct("course_id");
      enrolledCourses = await Course.find({
        _id: { $in: enrolledCoursesIds },
      }).lean();
    }

    // Send JSON response with the fetched data
    res.status(200).json({
      course,
      message,
      user,
      enrolledCourses,
    });
  } catch (error) {
    console.log("Error fetching the course");
    console.error(error);
    // next(error);
  }
};
// courseDelete
export const courseDelete = async (req, res, next) => {
  try {
    const courseId = req.params.id;

    // Find the course by its ID and delete it
    const deletedCourse = await Course.findByIdAndDelete(courseId);

    // Check if the course was found and deleted
    if (!deletedCourse) {
      return next(errorHandler(404, "Course not found"));
    }

    // Respond with a success message
    return res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    console.error("Error deleting course:");
    return next(error);
  }
};
// promoCode
export const createPromoCode = async (req, res) => {
  try {
    const { currency, code, exp_date, perc_int } = req.body;

    if (!currency || !code || !exp_date || !perc_int) {
      return res
        .status(400)
        .json({ message: "Todos los campos son requeridos" });
    }

    const promoCode = new PromoCode({ currency, code, exp_date, perc_int });

    await promoCode.save();

    return res
      .status(201)
      .json({ message: "Promo code created successfully", promoCode });
  } catch (error) {
    console.log(error);
    return res.status(500).json("Error creating promo code ", error.message);
  }
};
// get promoCodes
export const getPromoCodes = async (req, res) => {
  let promoCodes = [];
  promoCodes = PromoCode.find();
  if (promoCodes.length === 0) {
    console.log("promoCodes ", promoCodes);
    return res
      .status(200)
      .json({ message: "No hay Codigos Promocionales registrados" });
  }
  return res.status(200).json({ promoCodes });
};
// update promoCode
export const updatePromoCode = async (req, res) => {
  res.send("update promo COde");
};
// delete promoCode
export const deletePromoCode = async (req, res) => {
  res.send("delete promo COde");
};
