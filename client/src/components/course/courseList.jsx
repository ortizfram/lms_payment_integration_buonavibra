import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../../context/AuthContext";
import "../../public/css/course/courses.css";
import BtnAdminPreview from "./BtnAdminPreview";
import { FRONTEND_URL } from "../../config.js";
import { formatDistanceToNow } from 'date-fns';
import { Link } from "react-router-dom";


function CourseList({ courses }) {
  const { currentUser } = useContext(AuthContext);


  // State for pagination
  const [visibleCourses, setVisibleCourses] = useState(5); // Number of courses to initially display
  const [loadMoreVisible, setLoadMoreVisible] = useState(true); // Control visibility of Load More button

  const loadMore = () => {
    // Increase the number of visible courses by 5
    setVisibleCourses((prev) => prev + 5);
  };

  // Calculate the biggest discount
  const biggestDiscount = Math.max(
    ...courses.map((course) => Math.max(course.discount_ars, course.discount_usd))
  );

  return (
    <div className="courses-page-container">
      <h1 className="text-center mb-4 fw-bolder fs-3 section-title text-dark mt-5">Cursos</h1>
      <div className="courses-container">

      <>
  {courses.length > 0 ? (
    <ul className="courses-grid">
      {courses.slice(0, visibleCourses).map((course, index) => (
        <li key={index}>
          <BtnAdminPreview courseId={course._id} />
          <div className="course-item position-relative backdrop-filter shadow-lg">
            {/* Render the biggest discount */}
            {biggestDiscount >= 1 && (
              <p className="position-absolute top-0 ms-10 start-50 translate-right-x translate-right-y fw-bold fs-6 text-success p-2 rounded z-50 discount-overlay">
                {biggestDiscount}% OFF
              </p>
            )}

            {/* Next Link */}
            <a href={`${FRONTEND_URL}/course/${course._id}`}>
              {/* COURSE DATA */}
              <img
                src={course.thumbnail}
                alt={`thumbnail-${course.slug}`}
              />
              <p className="timestamp">
                {formatDistanceToNow(course.updated_at)}
              </p>

              {/* AUTHOR */}
              <div className="author">
                {course.author && course.author.avatar && (
                  <img
                    src={course.author.avatar}
                    alt="User Avatar"
                    className="avatar"
                  />
                )}
                {course.author && (
                  <p className="aut">
                    <strong>{course.author.username}</strong> •{" "}
                    {course.author.email}
                  </p>
                )}
              </div>
              <h4 className="plan-title italic">{course.plan_title}</h4>
              <h2 className="course-title">{course.title}</h2>

              {/* PRICE */}
              {course.usd_price || course.ars_price ? (
                <p className="">
                  USD {course.usd_price} | ARS {course.ars_price}
                </p>
              ) : null}

              {/* DESCRIPTION */}
              {course.description && (
                <p className="">{course.description} </p>
              )}
            </a>
          </div>
        </li>
      ))}
    </ul>
  ) : (
    <div className="p-6 bg-white fs-6 text-center">
      <p>No te has adherido a ningún plan aun  <br /><Link to={"/plans"} className="underline text-info"> Ir a Planes</Link></p>
    </div>
  )}
  {loadMoreVisible && visibleCourses < courses.length && (
    <div className="text-center mt-4">
      <button className="btn btn-primary" onClick={loadMore}>
        Load More
      </button>
    </div>
  )}
</>
      </div>
    </div>
  );
}

export default CourseList;
