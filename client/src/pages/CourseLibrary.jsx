import React, { useEffect, useState } from "react";
import "../public/css/course/courses.css";
import CourseOwnedList from "../components/course/courseOwnedList";
import axios from "axios";
import { Link } from "react-router-dom";
import { BACKEND_URL, FRONTEND_URL } from "../config.js";

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

  return (
    <div className="library-page-container text-center">
      {courses.length === 0 ? (
        <div className="text-center">
          <p>No has elegido qué cursos tomar aún.</p>
          <Link to={`${FRONTEND_URL}/course/all`} className="btn btn-primary mr-2 text-white">
            Ver todos los cursos
          </Link>
        </div>
      ) : (
        <CourseOwnedList courses={courses} />
      )}
    </div>
  );
}

export default CourseLibrary;
