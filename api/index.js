import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoute from "./routes/auth.route.js";
import customerRoute from "./routes/customer.route.js";
import courseRoute from "./routes/course.route.js";
import paymentRoute from "./routes/payment.route.js";
import indexRoute from "./routes/index.route.js";
import cookieParser from "cookie-parser";
import path from "path";

dotenv.config();
const port = process.env.PORT || 2020;
const DB_URI = process.env.DB_URI;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());  
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

const __dirname = path.resolve();

// Serve static files from the 'uploads' directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// routes
app.use("/api/auth", authRoute);
app.use("/api/customer", customerRoute);
app.use("/api/course", courseRoute);
app.use("/api/order", paymentRoute); // MP and Paypal
app.use("/api", indexRoute);

// error formatter for console
// app.use((err, req, res, next) => {
//   const statusCode = err.statusCode || 500;
//   const message = err.message || "Internal Server Error";
//   return res.status(statusCode).json({
//     success: false,
//     message,
//     statusCode,
//   });
// });

app.listen(port, () => {
  mongoose
    .connect(DB_URI)
    .then((run) => {
      console.log(`DB connected & api runnig on ${port}`);
    })
    .catch((error) => {
      console.error("Error connecting DB or running api", error.message);
    });
});

export default app;
