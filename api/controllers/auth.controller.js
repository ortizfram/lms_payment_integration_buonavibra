import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

// const adminEmails = JSON.parse(process.env.ADMIN_EMAILS); // Parse the admin emails

// export const signup = async (req, res, next) => {
//   const { username, email, password } = req.body;
//   const hashedPassword = bcryptjs.hashSync(password, 10);

//   let isAdmin = false;
//   // Check if email is admin
//   if (adminEmails.includes(email)) {
//     isAdmin = true;
//   }

//   const newUser = new User({
//     username,
//     email,
//     password: hashedPassword,
//     isAdmin,
//   });
//   try {
//     await newUser.save();
//     res.status(201).json({ message: "User created successfully" });
//   } catch (error) {
//     next(error);
//   }
// };

// export const signin = async (req, res, next) => {
//   const { email, password } = req.body;
//   try {
//     const validUser = await User.findOne({ email });
//     if (!validUser) return next(errorHandler(404, "User not found"));
//     const validPassword = bcryptjs.compareSync(password, validUser.password);
//     if (!validPassword) return next(errorHandler(401, "wrong credentials"));
//     const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
//     const { password: hashedPassword, ...rest } = validUser._doc;
//     const expiryDate = new Date(Date.now() + 3600000); // 1 hour
//     res
//       .cookie("access_token", token, { httpOnly: true, expires: expiryDate })
//       .status(200)
//       .json(rest);
//   } catch (error) {
//     next(error);
//   }
// };

// export const google = async (req, res, next) => {
//   try {
//     const user = await User.findOne({ email: req.body.email });
//     let isAdmin = false;

//     if (user) {
//       // Check if email is admin

//       if (adminEmails.includes(user.email)) {
//         isAdmin = true;
//       }
//       const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
//       const { password: hashedPassword, ...rest } = user._doc;
//       const expiryDate = new Date(Date.now() + 3600000); // 1 hour
//       res
//         .cookie("access_token", token, {
//           httpOnly: true,
//           expires: expiryDate,
//         })
//         .status(200)
//         .json({ ...rest, isAdmin }); // Include isAdmin in the response
//     } else {
//       // Here, if user doesn't exist, we set isAdmin based on the request body email
//       if (adminEmails.includes(req.body.email)) {
//         isAdmin = true;
//       }
//       const generatedPassword =
//         Math.random().toString(36).slice(-8) +
//         Math.random().toString(36).slice(-8);
//       const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
//       const newUser = new User({
//         username:
//           req.body.name.split(" ").join("").toLowerCase() +
//           Math.random().toString(36).slice(-8),
//         email: req.body.email,
//         password: hashedPassword,
//         profilePicture: req.body.photo,
//         isAdmin: isAdmin, // Set isAdmin when creating a new user
//       });
//       await newUser.save();
//       const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
//       const { password: hashedPassword2, ...rest } = newUser._doc;
//       const expiryDate = new Date(Date.now() + 3600000); // 1 hour
//       res
//         .cookie("access_token", token, {
//           httpOnly: true,
//           expires: expiryDate,
//         })
//         .status(200)
//         .json({ ...rest, isAdmin }); // Include isAdmin in the response
//     }
//   } catch (error) {
//     next(error);
//   }
// };

// export const signout = (req, res) => {
//   res.clearCookie("access_token").status(200).json("Signout success!");
// };

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

    const newUser = new User({ username, email, password: hashP });

    const savedUser = await newUser.save();


    // sign the token
    const token = jwt.sign(
      {
        user: savedUser._id,
      },
      process.env.JWT_SECRET
    );

    res
      .cookie("token", token, {
        httpOnly: true,
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
  
      res
        .cookie("token", token, {
          httpOnly: true,
        })
        .send();
  } catch (error) {}
};

export const logout = async (req,res)=>{
  res.cookie("token", "", {
    httpOnly:true,
    expires: new Date(0)
  }).send()
}

// logged in check
export const loggedIn= async(req, res)=> {
  /* frontend check if im logged by sending token to the server 
     we do this because server is http only, so we make http req to the server
  */
  try {
    const token = req.cookies.token;

    // check if token exists
    if(!token) return res.json(false);

    res.send(true)
  } catch (error) {
    console.error(error);
    res.json(false);
  }
}
