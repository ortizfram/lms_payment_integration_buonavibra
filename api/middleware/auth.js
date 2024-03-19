import jwt from "jsonwebtoken";

/* 
  checks if user is logged in by middleware
  - req cookies.token
  - checking existence
  - verifying it with jwt
  - creates req.user with logged in user
*/
async function auth(req, res, next) {
  // logged in check
  try {
    console.log("auth middleware")
    const token = await req.cookies.token;

    // check if token exists
    if (!token) return res.status(401).json({ message: "Unauthorized",token:false });

    // check token is valid
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    // generate a user for browser
    req.user = verified.user;

    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Unauthorized", token:"undefined" });
  }
}



export default auth
