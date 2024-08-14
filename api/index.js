import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoute from "./routes/auth.route.js";
import customerRoute from "./routes/customer.route.js";
import courseRoute from "./routes/course.route.js";
import paymentRoute from "./routes/payment.route.js";
import indexRoute from "./routes/index.route.js";
import planRoute from "./routes/plan.routes.js";
import membershipRoute from "./routes/membership.routes.js";
import cookieParser from "cookie-parser";
import path from "path";
import { FRONTEND_URL, isDev } from "./config.js";

dotenv.config();
const port = process.env.PORT || 2020;
const DB_URI = process.env.DB_URI;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "https://buonavibra.com.ar", //production
    // origin: "http://localhost:5173", // development
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
app.use("/api/plans", planRoute);
app.use("/api/membership", membershipRoute);
app.use("/api", indexRoute);

// Serve front-end application in production
if (!isDev) {
  app.use(express.static(path.join(__dirname, "client", "build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(port, () => {
  console.log("on port ", port);
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
