// src/config.js

export const isDev = process.env.NODE_ENV === "development";
export const BACKEND_URL = isDev ? "http://localhost:2020" : process.env.REACT_APP_BACKEND_URL;
export const FRONTEND_URL = isDev ? "http://localhost:5173" : process.env.REACT_APP_FRONTEND_URL;
