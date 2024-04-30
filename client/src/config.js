// client/src/config.js

export const isDev = process.env.NODE_ENV === "development";
export const BACKEND_URL = isDev ? "http://localhost:2020" : "https://api-buonavibra-prod.onrender.com"//import.meta.env.VITE_REACT_APP_BACKEND_URL;
export const FRONTEND_URL = isDev ? "http://localhost:5173" : "https://buonavibra.com.ar"//import.meta.env.VITE_REACT_APP_FRONTEND_URL;
