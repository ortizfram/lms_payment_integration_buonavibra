import {
  PAYPAL_API,
  PAYPAL_API_CLIENT,
  PAYPAL_API_SECRET,
  BACKEND_URL,
  FRONTEND_URL,
  MP_ACCESS_TOKEN,
  MP_NOTIFICATION_URL,
  isDev,
} from "../config.js";
import axios from "axios";
import Course from "../models/course.model.js";
import UserCourse from "../models/user_course.model.js";
import User from "../models/user.model.js";
import mercadopago, {
  MercadoPagoConfig,
  Preference,
  Payment,
} from "mercadopago";
import mongoose from "mongoose";

// PAYPAL ---------------------------------------------------
export const createSubscriptionPaypal = async (req, res) => {
  console.log("\n*** createSubscriptionPaypal\n");

  const userId = req.query.userId;
  const user = await User.findById(userId);
  try {
    // Create subscription object for PayPal
    const subscription = {
      plan_id: "BASIC_USD", // Replace 'YOUR_PLAN_ID' with the ID of your PayPal subscription plan
      application_context: {
        brand_name: "Mi tienda",
        landing_page: "NO_PREFERENCE",
        user_action: "SUBSCRIBE_NOW",
        return_url: `${BACKEND_URL}/api/subscription/capture-subscription-paypal?userId=${user._id}`, // URL to handle successful subscription
        cancel_url: `${BACKEND_URL}/api/subscription/cancel-subscription-paypal`, // URL to handle canceled subscription
      },
    };

    // Params for auth
    const params = new URLSearchParams();
    params.append("grant_type", "client_credentials");

    // Ask for token on auth
    const {
      data: { access_token },
    } = await axios.post(`${PAYPAL_API}/v1/oauth2/token`, params, {
      auth: {
        username: PAYPAL_API_CLIENT,
        password: PAYPAL_API_SECRET,
      },
    });

    // Create subscription with subscription obj
    const response = await axios.post(
      `${PAYPAL_API}/v1/billing/subscriptions`,
      subscription,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    // Log the created subscription
    console.log("\n\nCreated Subscription:", response.data);

    // Extract the PayPal approval link from the response data
    const approvalLink = response.data.links.find(
      (link) => link.rel === "approve"
    ).href;

    // Return the approval link in the response data
    res.status(200).json({ approvalLink });
  } catch (error) {
    console.error("Error creating subscription:", error);
    res
      .status(500)
      .json({
        message: "Error creating the subscription",
        error: error.message,
      });
  }
};

export const captureSubscriptionPaypal = async (req, res) => {
  console.log("\n*** captureSubscriptionPaypal\n");
  const userId = req.query.userId;
  const user = await User.findById(userId);

  try {
    // Assuming you have a function to fetch all courses, let's say getAllCourses()
    const courses = await Course.find({});

    if (user) {
      // Grant access to all current courses
      await Promise.all(
        courses.map(async (course) => {
          const newUserCourse = new UserCourse({
            user_id: user._id,
            course_id: course._id,
          });
          await newUserCourse.save();
          console.log(
            `👌🏽 --Inserted into UserCourse: user_id: ${user._id}, course_id: ${course._id}`
          );
        })
      );

      // Here, you might want to implement a mechanism to handle future courses.
      // For example, you could listen for events or periodically check for new courses
      // and automatically grant access to the user.

      // Redirect the user to a page confirming successful subscription
      const redirectUrl = `${FRONTEND_URL}/subscription/success`;
      const htmlResponse = `<button style="background-color: green; color: white; border: none; border-radius: 20px; padding: 15px 30px; font-size: 18px; display: block; margin: 0 auto;"><a href="${redirectUrl}" style="text-decoration: none; color: white;">Subscription Successful</a></button>`;
      res.setHeader("Content-Type", "text/html");
      return res.status(201).send(htmlResponse);
    } else {
      return res.status(404).json("User not found");
    }
  } catch (error) {
    console.error("Error capturing subscription:", error);
    res.status(500).json({ message: "Error capturing the subscription" });
  }
};

export const cancelSubscriptionPaypal = (req, res) => res.redirect("/");

// Mercado Pago 1.5.16 ---------------------------------------------------
export const createOrderMP = async (req, res) => {
  console.log("\n*** Creating MP order...\n");
  const { courseId, userId } = req.query;
  console.log("courseId", typeof courseId, " ", courseId);
  console.log("userId", typeof userId, " ", userId);

  // Fetch course details based on the courseId using Mongoose
  const course = await Course.findById(courseId);
  if (!course) {
    console.log("Course not found");
    return res.status(404).json({ message: "Course not found" });
  }
  console.log("\n\nFetched Course:", course);

  // Step 2: Initialize the client object
  const client = new MercadoPagoConfig({
    accessToken: MP_ACCESS_TOKEN,
  });

  // calculate discount ARS for MP
  let adjustedDiscount = null;
  let withDiscount = null;
  if (course.discount_ars !== null && course.discount_ars > 0) {
    adjustedDiscount =
      course.ars_price - (course.ars_price * course.discount_ars) / 100;
  }
  // Render the value based on the conditions
  {
    adjustedDiscount !== null ? (withDiscount = adjustedDiscount) : null;
  }

  let approvalLink;
  const preference = await new Preference(client)
    .create({
      body: {
        items: [
          {
            title: `Curso: ${course.title}`,
            description: course.description,
            quantity: 1,
            currency_id: "ARS",
            unit_price:
              adjustedDiscount !== null
                ? parseFloat(withDiscount)
                : parseFloat(course.ars_price),
          },
        ],
        back_urls: {
          // success: `${MP_NOTIFICATION_URL}?courseId=${course._id}&userId=${userId}`,
          success: `${FRONTEND_URL}/course/${courseId}`,
          failure: `${BACKEND_URL}/api/order/failure-mp`,
          pending: `${BACKEND_URL}/api/order/pending-mp`,
        },
        notification_url: `${MP_NOTIFICATION_URL}?courseId=${courseId}&userId=${userId}`,
      },
    })
    .then((preference) => {
      console.log("preference ", preference);
      if (isDev) {
        approvalLink = `${preference.sandbox_init_point}`;
      } else {
        approvalLink = `${preference.init_point}`;
      }
      res.status(200).json({ approvalLink });
    })
    .catch(console.log);
};

export const webhookMP = async (req, res) => {
  console.log("\n\n*** Webhook MP...\n\n");

  try {
    const paymentType = req.query.type;
    const paymentId = req.query["data.id"];
    const courseId = req.query.courseId; // Ensure Mercado Pago sends courseSlug
    const userId = req.query.userId;
    console.log("courseId:", courseId);
    console.log("paymentId:", paymentId);
    console.log("paymentType:", paymentType);
    console.log("userId:", userId);

    if (paymentType === "payment" && paymentId && courseId) {
      // Fetch course details based on the courseId using Mongoose
      const course = await Course.findById(courseId);
      if (!course) {
        console.log("Course not found");
        return res.status(404).json({ message: "Course not found" });
      }

      if (course && userId) {
        const newUserCourse = new UserCourse({
          user_id: userId,
          course_id: courseId,
        });
        await newUserCourse.save();

        console.log(
          `👌🏽 --Inserted into UserCourse: user_id: ${userId}, course_id: ${courseId}`
        );

        // here we must redirect in frontend
        // Return the HTML button to redirect to the course
        const redirectUrl = `${FRONTEND_URL}/course/${courseId}`;
        const htmlResponse = `<button style="background-color: green; color: white; border: none; border-radius: 20px; padding: 15px 30px; font-size: 18px; display: block; margin: 0 auto;"><a href="${redirectUrl}" style="text-decoration: none; color: white;">Ir al curso</a></button>`;
        res.setHeader("Content-Type", "text/html");
        return res.status(201).send(htmlResponse);
      }
    } else {
      return res.status(404).json("Course or user not found");
    }
  } catch (error) {
    console.error("Error handling Mercado Pago webhook:", error);
    res.sendStatus(500);
  }
};

export const successMP = async (req, res) => {
  res.send("\n*** Success MP...\n");
};
