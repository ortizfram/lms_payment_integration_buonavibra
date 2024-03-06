import Course from "../models/course.model.js";
import { errorHandler } from "../utils/error.js";
import slugify from "slugify";
import moment from "moment";
import User from "../models/user.model.js";

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
      author_id,
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

    const author = await User.findOne({ _id: author_id });

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
      author_id,
      author,
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
      req.files && req.files["image"]
        ? "/uploads/imgs/" + req.files["image"][0].filename
        : null;
    const videoUrl =
      req.files && req.files["video"]
        ? "/uploads/videos/" + req.files["video"][0].filename
        : null;

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

    const updateData = {
      ...req.body,
      title,
      slug: courseSlug,
      discount_ars: discountArs,
      discount_usd: discountUsd,
      thumbnail: imageUrl,
      video: videoUrl,
      updated_at: currentTimestamp,
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
    let user = req.body.user;
    const isAdmin = user && user.isAdmin === true;

    // Fetch all courses ordered by updated_at descending
    const courses = await Course.find({})
      .populate("author", "name username avatar") // Populate author details
      .sort({ updated_at: -1 })
      .lean(); // Convert Mongoose documents to plain JavaScript objects

    if (courses.length === 0) {
      res.status(200).json({
        message: "No hay cursos aun",
        courses: [], // Empty array indicating no courses published yet
        totalItems: 0,
        user,
        isAdmin,
      });
    }

    console.log("courses: ", courses);

    // Map courses to desired response format
    let formattedCourses = courses.map((course) => {
      return {
        title: course.title,
        slug: course.slug,
        description: course.description,
        ars_price: course.ars_price,
        usd_price: course.usd_price,
        discount_ars: course.discount_ars,
        discount_usd: course.discount_usd,
        thumbnail: `http://localhost:3006${course.thumbnail}`,
        id: course._id.toString(),
        thumbnailPath: course.thumbnail,
        created_at: new Date(course.created_at).toLocaleString(),
        updated_at: new Date(course.updated_at).toLocaleString(),
        next: `/course/${course._id}`, // Dynamic course link
      };
    });

    // Filter out enrolled courses
    if (user) {
      const enrolledCourseIds = user.enrolledCourses.map((course) =>
        course.toString()
      );
      formattedCourses = formattedCourses.filter(
        (course) => !enrolledCourseIds.includes(course.id)
      );
    }

    // Send courses response
    res.status(200).json({
      route: "courses",
      title: "Cursos",
      courses: formattedCourses,
      totalItems: formattedCourses.length,
      user,
      message,
      isAdmin,
    });
  } catch (error) {
    console.log("error fetching courses");
    next(error);
  }
};

// courseOwned
export const courseOwned = async (req, res, next) => {
  try {
    const message = req.query.message;
    let user = req.session.user;
    const isAdmin = user && user.role === "admin";

    // Fetch courses owned by the user
    let courses = [];
    if (user) {
      const enrolledCourseIds = await UserCourse.find({
        user_id: user.id,
      }).distinct("course_id");
      courses = await Course.find({ _id: { $in: enrolledCourseIds } })
        .populate("author", "name username avatar")
        .sort({ updated_at: -1 })
        .lean();
    }

    // Map courses to the desired response format
    let formattedCourses = courses.map((course) => {
      return {
        id: course._id.toString(),
        title: course.title,
        slug: course.slug,
        description: course.description,
        ars_price: course.ars_price,
        usd_price: course.usd_price,
        discount_ars: course.discount_ars,
        discount_usd: course.discount_usd,
        thumbnail: course.thumbnail,
        thumbnailPath: course.thumbnail,
        created_at: new Date(course.created_at).toLocaleString(),
        updated_at: new Date(course.updated_at).toLocaleString(),
        author: {
          name: course.author.name,
          username: course.author.username,
          avatar: course.author.avatar,
        },
        next: `/api/course/${course._id}`, // Dynamic course link
      };
    });

    // Send courses response
    res.status(200).json({
      route: "courses",
      title: "Cursos",
      courses: formattedCourses,
      totalItems: formattedCourses.length,
      user,
      message,
      isAdmin,
    });
  } catch (error) {
    console.log("Error fetching owned courses:");
    next(error);
  }
};
// courseDetail
export const courseDetail = async (req, res, next) => {
  const courseId = req.params.id;
  const user = req.body.user;
  const message = req.query.message;

  try {
    // Fetch course details including author information
    const course = await Course.findById(courseId)
      .populate("author", "name username avatar")
      .lean();

    if (!course) {
      return next(errorHandler(400, `Course not found`));
    }

    // Fetching author details
    const author = await User.findById(course.author._id).lean();

    if (!author) {
      return next(errorHandler(404, `Author details not found`));
    }

    // Extend course with author details
    course.author = {
      name: author.name,
      username: author.username,
      avatar: author.avatar,
    };

    // add host predix to video\
    if (course.video) {
      course.video = `http://localhost:3006${course.video}`;
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
    res.json({
      course,
      message,
      user,
      enrolledCourses,
    });
  } catch (error) {
    console.log("Error fetching the course");
    next(error);
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
