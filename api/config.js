import app from "../api/index"

export const isDev = process.env.NODE_ENV === "development";


export const PAYPAL_API_CLIENT = isDev ? process.env.SB_PAYPAL_API_CLIENT : process.env.PAYPAL_API_CLIENT;
export const PAYPAL_API_SECRET = isDev ? process.env.SB_PAYPAL_API_SECRET : process.env.PAYPAL_API_SECRET;
export const PAYPAL_API = isDev ? process.env.SB_PAYPAL_API : process.env.PAYPAL_API;

export const BACKEND_URL = isDev ? "http://localhost:3008" : process.env.BACKEND_URL
export const FRONTEND_URL = isDev ? "http://localhost:5173" : process.env.FRONTEND_URL