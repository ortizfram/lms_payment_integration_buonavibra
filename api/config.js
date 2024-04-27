import app from "../api/index.js"

export const isDev = process.env.NODE_ENV === "development";


// Paypal ******************
export const PAYPAL_API_CLIENT = isDev ? process.env.SB_PAYPAL_API_CLIENT : process.env.PAYPAL_API_CLIENT;
export const PAYPAL_API_SECRET = isDev ? process.env.SB_PAYPAL_API_SECRET : process.env.PAYPAL_API_SECRET;
export const PAYPAL_API = isDev ? process.env.SB_PAYPAL_API : process.env.PAYPAL_API;

// MercadoPago ******************
export const MP_ACCESS_TOKEN = isDev
? process.env.MP_SB_ACCESS_TOKEN
: process.env.MP_ACCESS_TOKEN;
export const MP_NOTIFICATION_URL = isDev
? process.env.MP_SB_NOTIFICATION_URL
: process.env.MP_NOTIFICATION_URL;
export const $init_point = isDev ? "sandbox_init_point" : "init_point";

export const BACKEND_URL = isDev ? "http://localhost:2020" : process.env.BACKEND_URL
export const FRONTEND_URL = isDev ? "http://localhost:5173" : process.env.FRONTEND_URL

// Nodemailer ******************
export const NODEMAILER_EMAIL = isDev ? process.env.NODEMAILER_EMAIL : process.env.NODEMAILER_PROD_EMAIL
export const NODEMAILER_PASS = isDev ? process.env.NODEMAILER_PASS : process.env.NODEMAILER_PROD_PASS

