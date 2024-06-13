import React, { useEffect, useState } from "react";
import "../public/css/course/courses.css";
import CourseList from "../components/course/courseList";
import axios from "axios";
import { BACKEND_URL } from "../config.js";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [next, setNext] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const queryParams = new URLSearchParams(location.search);
  const q = queryParams.get("q");

  async function getCourses() {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/course/all`, {
        params: { plan_id: q },
      });
      const { courses, next } = response.data;
      setCourses(courses);
      setNext(next);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getCourses();
  }, [q]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return <CourseList courses={courses} next={next} />;
}

export default Courses;
