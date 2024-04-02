import React, { useEffect, useState } from "react";
import "../public/css/course/courses.css";
import CourseOwnedList from "../components/course/courseOwnedList";
import axios from "axios";
import { BACKEND_URL } from "../config.js";

function CourseLibrary() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function getCourses() {
    try {
      const coursesRes = await axios.get(`${BACKEND_URL}/api/course/owned`);
      setCourses(coursesRes.data.courses);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getCourses();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return <CourseOwnedList courses={courses} />;
}

export default CourseLibrary;
