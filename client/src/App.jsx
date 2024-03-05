import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import CourseCreate from "./pages/CourseCreate";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import CourseUpdate from "./pages/CourseUpdate";

export default function App() {
  return (
    <BrowserRouter>
      {/* header */}
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/course/create" element={<CourseCreate />} />
          <Route path="/course/update/:id" element={<CourseUpdate />} />
        </Route>
        <Route path="/course/all" element={<Courses />} />
        <Route path="/course/:id" element={<CourseDetail />} />
      </Routes>
    </BrowserRouter>
  );
}
