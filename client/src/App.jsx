import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import CourseCreate from "./pages/CourseCreate";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import CourseUpdate from "./pages/CourseUpdate";
import CourseEnroll from "./pages/CourseEnroll";
import Navbar from "./layouts/Navbar";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import axios from "axios";
import AuthContext from "./context/AuthContext";
import { useContext } from "react";
import CourseLibrary from "./pages/CourseLibrary";
import "./public/css/highlightText.css";
import "./public/css/icon.css";
import "./public/css/sectionTitle.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ForgotPassword from "./components/auth/ForgotPassword";
import ResetPassword from "./components/auth/ResetPassword";
import Loader from "./components/loader/Loader";
import Plans from "./pages/plans/Plans";
import CreatePlan from "./pages/plans/CreatePlan";
import PlanDetail from "./pages/plans/PlanDetail";
import PlanEnroll from "./pages/plans/PlanEnroll";
import UpdatePlan from "./pages/plans/UpdatePlan";
import Thanks from "./pages/Thanks";

axios.defaults.withCredentials = true;

export default function App() {
  const { loggedIn, currentUser } = useContext(AuthContext); // destructure loggedIn
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay with setTimeout
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // Change the delay time as needed

    // Cleanup function
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <BrowserRouter>
      <Navbar />
      <ToastContainer />

      <Routes>
        {/* Not Logged In */}
        {loggedIn === false && (
          <>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/plans" element={<Login />} />
          </>
        )}
        {/* isLogged */}
        {loggedIn === true && (
          <>
            <Route path="/course/library" element={<CourseLibrary />} />
            <Route path="/course/:id" element={<CourseDetail />} />
            <Route path="/course/enroll/:id" element={<CourseEnroll />} />
            <Route path="/plans" element={<Plans />} />
            <Route path="/plans/:id" element={<PlanDetail />} />
            <Route path="/plans/:id/enroll" element={<PlanEnroll />} />
            {/* isAdmin */}
            {currentUser && currentUser.isAdmin === true && (
              <>
                <Route path="/course/create" element={<CourseCreate />} />
                <Route path="/course/update/:id" element={<CourseUpdate />} />
                <Route path="/plans/create" element={<CreatePlan />} />
                <Route path="/plans/update/:id" element={<UpdatePlan />} />
              </>
            )}
          </>
        )}
        {/* No Restriction */}
        <Route path="*" element={<Loader />} />
        <Route path="/" element={<Home />} />
        <Route path="/thanks" element={<Thanks />} />
        {/* <Route path="/thanks" element={<h1>Graciass</h1>} /> */}
        <Route path="/about" element={<About />} />
        <Route path="/course/all" element={<Courses />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:id/:token" element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
  );
}
