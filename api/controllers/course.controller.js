import Course from "../models/course.model.js";
import { errorHandler } from "../utils/error.js";

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
      author: authorId,
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
      author_id: authorId,
    });

    await newCourse.save();

    console.log("\nCreating course...");
    console.log("\nCourse:", newCourse);

    return res.status(201).json({
      message: "Course created successfully",
    });
  } catch (error) {
    return next(error);
  }
};

// Update
export const courseUpdate = async (req, res, next) => {
  res.send("course Update");
};

// courselist
export const courselist = async (req, res, next) => {
  res.send("course list");
};

// courseOwned
export const courseOwned = async (req, res, next) => {
  res.send("course Owned");
};
// courseDetail
export const courseDetail = async (req, res, next) => {
  res.send("course Detail");
};
// courseDelete
export const courseDelete = async (req, res, next) => {
  res.send("course Delete");
};
