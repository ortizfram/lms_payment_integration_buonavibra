import React, { useState, useEffect, lazy, Suspense } from "react";
import axios from "axios";
import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
// context auth
import AuthContext from "./context/AuthContext";
import { useContext } from "react";
// css
import "./public/css/highlightText.css";
import "./public/css/icon.css";
import "./public/css/sectionTitle.css";
// alerts
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// bubble & navbar & loader
import EnterToNextClassBubble from "./components/floating/EnterToNextClass";
import Navbar from "./layouts/Navbar";
import Loader from "./components/loader/Loader";
// components / pages
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const CourseCreate = lazy(() => import("./pages/CourseCreate"));
const Courses = lazy(() => import("./pages/Courses"));
const CourseDetail = lazy(() => import("./pages/CourseDetail"));
const CourseUpdate = lazy(() => import("./pages/CourseUpdate")); //= lazy(()=>import())
const CourseEnroll = lazy(() => import("./pages/CourseEnroll"));
const Register = lazy(() => import("./pages/auth/Register"));
const Login = lazy(() => import("./pages/auth/Login"));
const CourseLibrary = lazy(() => import("./pages/CourseLibrary"));
const ForgotPassword = lazy(() => import("./components/auth/ForgotPassword"));
const ResetPassword = lazy(() => import("./components/auth/ResetPassword"));
const Plans = lazy(() => import("./pages/plans/Plans"));
const CreatePlan = lazy(() => import("./pages/plans/CreatePlan"));
const PlanDetail = lazy(() => import("./pages/plans/PlanDetail"));
const PlanEnroll = lazy(() => import("./pages/plans/PlanEnroll"));
const UpdatePlan = lazy(() => import("./pages/plans/UpdatePlan"));
const Thanks = lazy(() => import("./pages/Thanks"));
import { useParams } from "react-router-dom";
import MovingText from "./components/floating/MovingMessage";

axios.defaults.withCredentials = true;

export default function App() {
  const { loggedIn, currentUser } = useContext(AuthContext); // destructure loggedIn
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

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
    <HashRouter>
      {/* <BrowserRouter> */}
      <Navbar />
      <ToastContainer />
      <EnterToNextClassBubble />

      <Suspense fallback={<Loader />}>
        <Routes>
          {/* Not Logged In */}
          {loggedIn === false && (
            <>
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/plans/:id"
                element={<Login next={`/plans/${id}`} id={id} />}
              />
              <Route
                path="/course/all"
                element={<Login next={"/course/all"} />}
              />
            </>
          )}
          {/* isLogged */}
          {loggedIn === true && (
            <>
              <Route path="/course/library" element={<CourseLibrary />} />
              <Route path="/course/:id" element={<CourseDetail />} />
              <Route path="/course/enroll/:id" element={<CourseEnroll />} />
              <Route path="/plans/:id" element={<PlanDetail />} />
              <Route path="/plans/:id/enroll" element={<PlanEnroll />} />
              <Route path="/course/all" element={<Courses />} />
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
          <Route path="/about" element={<About />} />
          <Route path="/plans" element={<Plans />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/reset-password/:id/:token"
            element={<ResetPassword />}
          />
        </Routes>
      </Suspense>
      {/* <MovingText /> */}
      {/*</BrowserRouter> */}
    </HashRouter>
  );
}
