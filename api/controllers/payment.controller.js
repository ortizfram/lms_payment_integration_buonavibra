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
import crypto from "crypto";

// PAYPAL ---------------------------------------------------
export const createOrderPaypal = async (req, res) => {
  console.log("\n*** createOrderPaypal\n");

  const courseId = req.query.courseId; // is being passed the courseSlug in the request input
  const userId = req.query.userId; // is being passed the courseSlug in the request input
  const user = await User.findById(userId);
  try {
    const course = await Course.findById(courseId);
    console.log("\n\nFetched Course Details:", course);

    let usd_price;

    // if discount in usd
    if (course.discount_usd > 0) {
      usd_price =
        course.usd_price - (course.usd_price * course.discount_usd) / 100;
    } else {
      usd_price = course.usd_price;
    }

    //create order paypal
    const order = {
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: usd_price, // Use the course price for the order w/without discount
          },
        },
      ],
      application_context: {
        brand_name: "Mi tienda",
        landing_page: "NO_PREFERENCE",
        user_action: "PAY_NOW",
        return_url: `${BACKEND_URL}/api/order/capture-order-paypal?courseId=${course._id}&userId=${user._id}`, // Include course slug in the return URL
        cancel_url: `${BACKEND_URL}/api/order/cancel-order-paypal`,
      },
    };

    // Params for auth
    const params = new URLSearchParams();
    params.append("grant_type", "client_credentials"); //i pass it credentials

    // Ask for token on auth
    const {
      data: { access_token },
    } = await axios.post(`${PAYPAL_API}/v1/oauth2/token`, params, {
      auth: {
        username: PAYPAL_API_CLIENT,
        password: PAYPAL_API_SECRET,
      },
    });

    // Create order with order obj
    const response = await axios.post(
      `${PAYPAL_API}/v2/checkout/orders`,
      order,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    // Log the created order
    console.log("\n\nCreated Order:", response.data);

    // paypal pay link + courseId
    const courseIdParam = `courseId=${course._id}`;
    const approveLink = `${response.data.links[1].href}&${courseIdParam}`;

    // Redirect the user to the PayPal approval link
    res.redirect(approveLink);
  } catch (error) {
    console.error("Error creating order:", error);
    res
      .status(500)
      .json({ message: "Error creating the order", error: error.message });
  }
};

export const captureOrderPaypal = async (req, res) => {
  console.log("\n*** captureOrderPaypal\n");
  const courseId = req.query.courseId;
  const userId = req.query.userId;
  const user = await User.findById(userId);
  try {
    // Fetch course details based on the courseId using Mongoose
    const course = await Course.findById(courseId);
    console.log("\n\nFetched Course:", course);

    if (course && user) {
      const newUserCourse = new UserCourse({
        user_id: user._id,
        course_id: course._id,
      });
      await newUserCourse.save();

      console.log(
        `👌🏽 --Inserted into UserCourse: user_id: ${user._id}, course_id: ${course._id}`
      );

      // here we must redirect in frontend
      // Return the HTML button to redirect to the course
      const redirectUrl = `http://localhost:5173/course/${courseId}`;
      const htmlResponse = `<button style="background-color: green; color: white; border: none; border-radius: 20px; padding: 15px 30px; font-size: 18px; display: block; margin: 0 auto;"><a href="${redirectUrl}" style="text-decoration: none; color: white;">Ir al curso</a></button>`;
      res.setHeader("Content-Type", "text/html");
      return res.status(201).send(htmlResponse);
    } else {
      return res.status(404).json("Course or user not found");
    }
  } catch (error) {
    console.error("Error capturing order:", error);
    res.status(500).json({ message: "Error capturing the order" });
  }
};

export const cancelPaymentPaypal = (req, res) => res.redirect("/");

// Mercado Pago 1.5.16 ---------------------------------------------------
export const createOrderMP = async (req, res) => {
  console.log("\n*** Creating MP order...\n");
  const { courseId, userId } = req.query;

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

  const preference =await  new Preference(client).create({
    body: {
      items: [
        {
          title: "Producto x",
          quantity: 1,
          unit_price: 2000,
        },
      ],
    },
  }).then(console.log)
  .catch(console.log)

  console.log(preference)

  // res.redirect(preference.sandbox_init_point)
};
//   // Initialize the API object
//   const payment = new Payment(client);

//   // Create the request object
//   const body = {
//     items: [
//       {
//         title: course.title,
//         quantity: 1,
//         currency_id: "ARS",
//         unit_price: priceAsFloat,
//       },
//     ],
//     back_urls: {
//       success: `${process.env.BACKEND_URL}/api/course/${courseId}/`,
//       failure: `${process.env.BACKEND_URL}/api/order/failure-mp`,
//       pending: `${process.env.BACKEND_URL}/api/order/pending-mp`,
//     },
//     notification_url: `${process.env.MP_NOTIFICATION_URL}/api/order/webhook-mp?courseId=${courseId}&userId=${userId}`,
//   };

//   // Make the request to create payment
//   payment
//     .create({ body })
//     .then((response) => {
//       console.log("Payment created:", response);
//       // Handle successful payment creation, redirect user or do further processing
//       // You can extract init_point or other required data from the response to redirect the user
//       // const initPoint = response.body.init_point;
//       // const redirectURL = `${initPoint}&courseId=${courseId}`;
//       // res.redirect(redirectURL);
//       res
//         .status(200)
//         .json({ message: "Payment created successfully", data: response });
//     })
//     .catch((error) => {
//       console.error("Error creating payment:", error);
//       return res.status(500).json({ message: "Error creating payment" });
//     });
// } catch (error) {
//   console.error("Error capturing order:", error);
//   return res.status(500).json({ message: "Error capturing the order" });
//   }

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
      // Fetch course details based on the courseSlug using MySQL query
      const [rows] = await db
        .promise()
        .execute(getCourseFromIdQuery, [courseId]);
      const course = rows[0];

      if (course && userId) {
        // Add the user and course relationship in user_courses table
        const [insertUserCourse] = await db
          .promise()
          .execute(insertUserCourseQuery, [userId, course.id]);

        if (insertUserCourse.affectedRows > 0) {
          console.log(
            `\n👌🏽 --Inserted into user_courses: User ID: ${userId}, Course ID: ${course.id}`
          );
        }
      }
    }
    res.sendStatus(204); // OK but none to return
  } catch (error) {
    console.error("Error handling Mercado Pago webhook:", error);
    res.sendStatus(500);
  }
};

export const successMP = async (req, res) => {
  res.send("\n*** Success MP...\n");
};
