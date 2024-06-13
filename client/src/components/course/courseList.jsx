import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../../context/AuthContext";
import "../../public/css/course/courses.css";
import { BACKEND_URL } from "../../config.js";
import { formatDistanceToNow } from "date-fns";

function CourseList({ courses = [], next }) {
  const { currentUser } = useContext(AuthContext);

  // State for pagination
  const [visibleCourses, setVisibleCourses] = useState(5); // Number of courses to initially display
  const [loadMoreVisible, setLoadMoreVisible] = useState(true); // Control visibility of Load More button

  const loadMore = () => {
    // Increase the number of visible courses by 5
    setVisibleCourses((prev) => prev + 5);
  };

  // Calculate the biggest discount
  const biggestDiscount = courses.length > 0 ? Math.max(
    ...courses.map((course) =>
      Math.max(course.discount_ars, course.discount_usd)
    )
  ) : 0;

  return (
    <div className="courses-page-container">
      <h1 className="text-center mb-4 fw-bolder fs-3 section-title text-dark mt-5">
        Biblioteca Yoga Meditación
      </h1>
      <div className="courses-container">
        <>
          {courses? (
            <ul className="courses-grid">
              {courses.slice(0, visibleCourses).map((course, index) => (
                <li key={index}>
                  <div className="course-item position-relative backdrop-filter shadow-lg">
                    {/* Render the biggest discount */}
                    {biggestDiscount >= 1 && (
                      <p className="position-absolute top-0 ms-10 start-50 translate-right-x translate-right-y fw-bold fs-6 text-success p-2 rounded z-50 discount-overlay">
                        {biggestDiscount}% OFF
                      </p>
                    )}

                    {/* Next Link */}
                    <a href={!next ? `/#/course/${course._id}` : next}>
                      {/* COURSE DATA */}
                      <img
                        src={`${BACKEND_URL}${course.thumbnail}`}
                        alt={`thumbnail-${course.title}`}
                      />
                      <p className="timestamp">
                        {formatDistanceToNow(new Date(course.updated_at))}
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
                        <p className="">{course.description}</p>
                      )}
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-6 bg-white fs-6 text-center">
              <p>
                ❤️Pronto estaremos habilitando esta sección❤️ <br />
              </p>
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
