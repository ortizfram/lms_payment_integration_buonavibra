import jwt from "jsonwebtoken";

/* 
  checks if user is logged in by middleware
  - req cookies.token
  - checking existence
  - verifying it with jwt
  - creates req.user with logged in user
*/
function auth(req, res, next) {
  // logged in check
  try {
    console.log("auth")
    const token = req.cookies.token;
    console.log(token)

    // check if token exists
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    // check token is valid
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    // generate a user for browser
    req.user = verified.user;

    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Unauthorized" });
  }
}

function checkEnroll(req, res, next) {
  // logged in check
  try {
    console.log("**auth");
    const token = req.cookies.token;
    console.log("token ",token);
    const id = req.params.id;
    console.log("id ",id);

    // check if token exists
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    // check token is valid
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    // generate a user for browser
    req.user = verified.user;

    // check UserCourse table to find same id of course
    enrolled = UserCourse.find({ user_id: req.user, course_id: id });

    if (enrolled) {
      next();
    }
    return res.status(401).json("Unauthorized");
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Unauthorized" });
  }
}

export {auth,checkEnroll};
export default auth
