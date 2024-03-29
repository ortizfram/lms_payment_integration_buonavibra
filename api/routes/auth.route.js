import express from "express";
import {
  forgotPassword,
  getCurrentUser,
  loggedIn,
  login,
  logout,
  resetPassword,
  signup,
} from "../controllers/auth.controller.js";
const router = express.Router();

// register
router.post("/signup", signup);
// login
router.post("/login", login);
// logout
router.get("/logout", logout);
// loggedIn check
router.get("/loggedIn", loggedIn);
// getcurrentUser data
router.get("/currentUser", getCurrentUser);
// forgotPassword
router.post("/forgot-password", forgotPassword);
// resetPassword
router.post("/reset-password/:id/:token", resetPassword);

export default router;
