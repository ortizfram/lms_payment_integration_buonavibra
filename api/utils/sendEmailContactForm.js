import nodemailer from "nodemailer";
import { NODEMAILER_EMAIL,NODEMAILER_PASS } from "../config.js";

const sendEmailContactForm = async (recipient, subject, text, html) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: NODEMAILER_EMAIL,
        pass: NODEMAILER_PASS,
      },
    });

    const mailOptions = {
      to: NODEMAILER_EMAIL,
      from: recipient,
      subject: subject,
      text: text,
      html: html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("\n\nEmail sent\n\n");
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

export default sendEmailContactForm;