import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
import { BACKEND_URL, FRONTEND_URL } from "../config.js";
import sendResetEmail from "../utils/sendEmail.js";
import mongoose from "mongoose";

const adminEmails = JSON.parse(process.env.ADMIN_EMAILS); // Parse the admin emails

// register
export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!email || !password || !username) {
      res.status(500).json({ message: "All fields are required" });
    }
    if (password.length < 6) {
      es.status(400).json({
        message: "Password has to be at least 6 characters",
      });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "Email already exists" });
    }
    const hashP = bcryptjs.hashSync(password, 10);

    let isAdmin = false;
    // Check if email is admin
    if (adminEmails.includes(email)) {
      isAdmin = true;
    }

    const newUser = new User({ username, email, password: hashP, isAdmin });

    const savedUser = await newUser.save();

    // sign the token
    const token = jwt.sign(
      {
        user: savedUser._id,
      },
      process.env.JWT_SECRET
    );

    req.user = savedUser._id;

    res
      .cookie("token", token, {
        httpOnly: false,
        sameSite: "None",
        secure: true,
      })
      .send();
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
};

// login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(500).json({ message: "All fields are required" });
    }
    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return res.status(401).json({ message: "Wrong email or password" });

    const correctPass = await bcryptjs.compare(password, existingUser.password);
    if (!correctPass)
      return res.status(401).json({ message: "Wrong email or passwor" });

    // sign the token
    const token = jwt.sign(
      {
        user: existingUser._id,
      },
      process.env.JWT_SECRET
    );

    req.user = existingUser._id;

    res
      .cookie("token", token, {
        httpOnly: false,
        sameSite: "None",
        secure: true,
      })
      .send();
  } catch (error) {}
};

export const logout = async (req, res) => {
  res
    .cookie("token", "", {
      httpOnly: false,
      sameSite: "None",
      secure: true,
      expires: new Date(0),
    })
    .send();
};

// logged in check
export const loggedIn = async (req, res) => {
  /* frontend check if im logged by sending token to the server 
     we do this because server is http only, so we make http req to the server
  */
  try {
    const token = req.cookies.token;

    // check if token exists
    if (!token) return res.json(false);

    res.send(true);
  } catch (error) {
    console.error(error);
    res.json(false);
  }
};

// getcurrentUser
export const getCurrentUser = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.user;

    const user = await User.findById(userId).select("-password"); // Exclude password from the response

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// forgotpassword

// resetPassword
export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const existingUser = await User.find({ email: email });

    if (!existingUser || existingUser.length === 0) {
      return res.status(404).json({ error: "Email not found" });
    }

    // Accessing the _id property of the first user object in the array
    const userId = existingUser[0]._id.toString();

    const secret = process.env.JWT_SECRET + userId;

    // const payload = {
    //   email: existingUser[0].email,
    //   id: userId,
    // };

    // const token = jwt.sign(payload, secret, { expiresIn: "1y" });
    // console.log("Generated token:", token);

    const link = `${FRONTEND_URL}/#/reset-password/${userId}/${secret}`;
    console.log("Generated reset password link:", link);

    await sendResetEmail(
      email,
      "Password Reset",
      "Sending Reset password Token, click the button for password changing",
      `<button><a href="${link}">Go to Reset Password</a></button>`
    );

    res
      .status(200)
      .json({ message: "Password reset email sent, check your mailbox." });
  } catch (error) {
    console.error("Error sending Email for password reset:", error);
    res.status(500).json({ error: "Error sending reset email" });
  }
};

// resetPasword
export const resetPassword = async (req, res) => {
  let { id, token } = req.params;
  // console.log(`id${id},token${token}`);
  const { password, repeat_password } = req.body;

  const existingUser = await User.find({
    _id: new mongoose.Types.ObjectId(id),
  });

  if (!existingUser || existingUser.length === 0) {
    return res.status(400).json({ message: "User id not found" });
  }

  let user = existingUser[0];

  // We have valid id and valid user with this id
  // const secret = process.env.JWT_SECRET + id;
  // console.log(typeof secret, " ", secret);
  try {
    // const payload = jwt.verify(token, secret);
    // password must match
    if (password !== repeat_password) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    // update with a new password hashed
    user = await User.findByIdAndUpdate(
      id,
      { password: hashedPassword },
      { new: true }
    );

    if (!user) {
      throw new Error("User not found");
    }
    console.log("\n\nPassword updated\n\n");

    // Send JSON response
    res.status(200).json({
      message:
        "Password updated successfully. Please login with your new password.",
      user: user._id,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};
