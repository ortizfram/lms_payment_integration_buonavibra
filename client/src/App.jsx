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
import axios from "axios";
import AuthContext, { AuthContextProvider } from "./context/AuthContext";
import Login from "./pages/auth/Login";
import Customers from "./components/customer/Customers";
import { useContext } from "react";

axios.defaults.withCredentials = true;

export default function App() {
  const { loggedIn,currentUser } = useContext(AuthContext); //destructure loggedIn

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
      {loggedIn === false && (<>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </>)}
      {loggedIn === true && (<>
        <Route path="/customer" element={<Customers />} />
        <Route path="/course/create" element={<CourseCreate />} />
        <Route path="/course/update/:id" element={<CourseUpdate />} />
        <Route path="/course/:id" element={<CourseDetail />} />
      </>)}
        <Route path="*" element={<h1>404 Page Not FOund</h1>} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/course/enroll/:id" element={<CourseEnroll />} />
        <Route path="/course/all" element={<Courses />} />
      </Routes>
    </BrowserRouter>
  );
}
