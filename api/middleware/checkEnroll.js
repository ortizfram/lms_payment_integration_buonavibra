import UserCourse from "../models/user_course.model.js"; // Assuming you have a UserCourse model

// middleware
export async function checkEnrollment(req, res, next) {
  console.log("\n\n*** middleware: checkCourseEnrollment\n\n");

  const courseId = req.params.id;
  console.log("\n\ncourseId: ", courseId);
  // Get the current user from localStorage
  const user = req.user;

  try {
    if (!user) {
      return res.status(403).redirect("/login");
    }

    // Find the user's enrolled courses using the UserCourse model
    const enrolledCourses = await UserCourse.find(
      { user_id: user._id },
      "course_id"
    );
    if (enrolledCourses) {
      // User is enrolled in the course, proceed to render the course detail
      return next();
    } else {
      // User is not enrolled in this course
      // Redirect the user to the course overview URL
      return res.redirect(`/course/enroll/${courseId}`);
    }
  } catch (error) {
    console.error("Error checking user enrollment:", error);
    return res.status(500).send("Error checking user enrollment");
  }
}
