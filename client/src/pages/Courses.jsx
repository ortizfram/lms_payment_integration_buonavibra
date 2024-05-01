import React, { useEffect, useState } from "react";
import "../public/css/course/courses.css";
import CourseList from "../components/course/courseList";
import axios from "axios";
import { BACKEND_URL } from "../config.js";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const queryParams = new URLSearchParams(location.search);
  const q = queryParams.get("q");

  async function getCourses() {
    try {
      const coursesRes = await axios.get(`${BACKEND_URL}/api/course/all`, {
        params: { plan_id: q },
      });
      setCourses(coursesRes.data.courses);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getCourses(q);
  }, [q]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return <CourseList courses={courses} />;
}

export default Courses;
