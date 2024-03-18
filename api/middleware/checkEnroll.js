import User from "../models/user.model.js";
import UserCourse from "../models/user_course.model.js";

// enrollCheck
export const courseEnrollCheck = async (req, res, next) => {
  /*  get courseId from params, does a req to backend userCourses db 
      checks if userId from token has courseId in table ? next : 401
*/
  try {
    const token = req.cookies.token;

    // check if token exists
    if (!token) return res.json({ message: "Unauthorized" });

    // Verify token and extract user ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.user;

    // Fetch user data from the database
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Assuming you have a field like 'coursesEnrolled' in the user model
    const { courseId } = req.params;

    // Check if the user is enrolled in the course
    const userCourse = await UserCourse.findOne({
      user_id: userId,
      course_id: courseId,
    });

    if (userCourse) {
      // If the user is enrolled in the course, proceed to the next middleware
      next();
    } else {
      // If the user is not enrolled in the course, return 401 Unauthorized
      return res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    console.error(error);
    res.status(401).json(false);
  }
};
