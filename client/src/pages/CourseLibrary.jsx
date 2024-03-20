import React, { useEffect, useState } from "react";
import "../public/css/course/courses.css";
import CourseOwnedList from "../components/course/courseOwnedList";
import axios from "axios";

function CourseLibrary() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function getCourses() {
    try {
      const coursesRes = await axios.get("http://localhost:2020/api/course/owned");
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
