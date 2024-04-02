import React, { useState, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import "../../public/css/course/courses.css";
import BtnAdminPreview from "./BtnAdminPreview";
import { BACKEND_URL, FRONTEND_URL } from "../../config.js";

function CourseList({ courses }) {
  const { currentUser } = useContext(AuthContext);
  const isAdmin = currentUser?.["isAdmin"];

  // State for pagination
  const [visibleCourses, setVisibleCourses] = useState(5); // Number of courses to initially display
  const [loadMoreVisible, setLoadMoreVisible] = useState(true); // Control visibility of Load More button

  const loadMore = () => {
    // Increase the number of visible courses by 5
    setVisibleCourses(prev => prev + 5);
  };

  return (
    <div className="courses-page-container">
      <div className="courses-container">
        <ul className="courses-grid">
          {courses.slice(0, visibleCourses).map((course, index) => (
            <li key={index}>
              <BtnAdminPreview courseId={course._id} />
              <div className="course-item position-relative backdrop-filter shadow-lg">
                {/* DISCOUNT for ARS only */}
                {course.discount_ars >= 1 && course.discount_usd < 1 && (
                  <p className="position-absolute start-40 top-10 translate-middle-x  translate-middle-y  text-center fw-lighter text-xs bg-success p-[0.1] rounded">
                    ARS {course.discount_ars}%OFF
                  </p>
                )}
                {/* DISCOUNT for USD only */}
                {course.discount_usd >= 1 && course.discount_ars < 1 && (
                  <p className="position-absolute start-40 top-10 translate-middle-x translate-middle-y  text-center fw-lighter text-xs bg-success p-[0.1] rounded">
                    USD ${course.discount_usd}%OFF
                  </p>
                )}
                {/* DISCOUNT for both ARS and USD */}
                {course.discount_ars >= 1 && course.discount_usd >= 1 && (
                  <div>
                    <p className="position-absolute translate-middle-x translate-middle-y  text-center fw-lighter text-xs bg-success p-[0.1] rounded">
                      ARS {course.discount_ars}% USD ${course.discount_usd}%
                    </p>
                  </div>
                )}

                {/* NExt Link */}
                <a href={`${FRONTEND_URL}/course/enroll/${course._id}`}>
                  {/* COURSE DATA */}
                  <img
                    src={course.thumbnail}
                    alt={`thumbnail-${course.slug}`}
                  />
                  <p className="timestamp ">{course.updated_at}</p>

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

                {/* ADMIN OPTIONS*/}
                {/* Assuming currentUser is passed as a prop */}
                {isAdmin === true && (
                  <div className="course-actions">
                    {/* UPDATE */}
                    <p className="">
                      <a
                        className="text-muted"
                        href={`${BACKEND_URL}/api/course/update/${course._id}`}
                      >
                        <i className="fas fa-edit me-2"></i>
                      </a>
                      <input
                        type="hidden"
                        name="author"
                        value={course.author}
                      />
                    </p>
                    {/* DEL */}
                    <p>
                      <a
                        className="text-muted"
                        href={`${BACKEND_URL}/api/course/delete/${course._id}`}
                      >
                        <i className="fas fa-trash-alt me-2"></i>
                      </a>
                    </p>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
        {loadMoreVisible && visibleCourses < courses.length && (
          <div className="text-center mt-4">
            <button className="btn btn-primary" onClick={loadMore}>
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CourseList;
