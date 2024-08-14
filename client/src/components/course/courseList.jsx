import React, { useContext, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { BACKEND_URL } from "../../config.js";
import Loader from "../loader/Loader.jsx";
import AuthContext from "../../context/AuthContext.jsx";

function CourseList({ courses = [], next, loading }) {
  const [visibleCourses, setVisibleCourses] = useState(8);
  const [loadMoreVisible, setLoadMoreVisible] = useState(true);
  const { currentUser } = useContext(AuthContext);

  const loadMore = () => {
    setVisibleCourses((prev) => prev + 8);
  };

  const biggestDiscount =
    courses.length > 0
      ? Math.max(
          ...courses.map((course) =>
            Math.max(course.discount_ars, course.discount_usd)
          )
        )
      : 0;

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="courses-page-container">
      <h1 className="ft-roboto text-center mb-4 fw-bolder fs-3 section-title ft-alifira text-dark mt-5">
        Biblioteca Yoga Meditación
      </h1>
      <div className="courses-container">
        {courses.length > 0 ? (
          <ul className="courses-grid">
            {courses.slice(0, visibleCourses).map((course, index) => (
              <li key={index}>
                <div className="course-item position-relative backdrop-filter shadow-lg">
                  {course.stock === false && (
                    <div className="overlay">
                      <p className="overlay-text">Agotado</p>
                    </div>
                  )}
                  
                  {biggestDiscount >= 1 && (
                    <p className="position-absolute top-0 ms-10 start-50 translate-right-x translate-right-y fw-bold fs-6 text-success p-2 rounded z-50 discount-overlay">
                      {biggestDiscount}% OFF
                    </p>
                  )}

                  {currentUser && currentUser.isAdmin ? (
                    <a href={`/#/course/${course._id}`} className="course-link">
                      <img
                        src={`${BACKEND_URL}${course.thumbnail}`}
                        alt={`thumbnail-${course.title}`}
                      />
                      <p className="timestamp">
                        {formatDistanceToNow(new Date(course.updated_at))}
                      </p>

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
                            {/* {course.author.email} */}
                          </p>
                        )}
                      </div>
                      <h4 className="plan-title italic">{course.plan_title}</h4>
                      <h2 className="course-title">{course.title}</h2>

                      {course.usd_price || course.ars_price ? (
                        <p className="">
                          USD {course.usd_price} | ARS {course.ars_price}
                        </p>
                      ) : null}

                      {course.description && (
                        <p className="">{course.description}</p>
                      )}
                    </a>
                  ) : (
                    <a
                      href={!next ? `/#/course/${course._id}` : next}
                      className="course-link"
                    >
                      <img
                        src={`${BACKEND_URL}${course.thumbnail}`}
                        alt={`thumbnail-${course.title}`}
                      />
                      <p className="timestamp">
                        {formatDistanceToNow(new Date(course.updated_at))}
                      </p>

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
                            {/* {course.author.email} */}
                          </p>
                        )}
                      </div>
                      <h4 className="plan-title italic">{course.plan_title}</h4>
                      <h2 className="course-title">{course.title}</h2>

                      {course.usd_price || course.ars_price ? (
                        <p className="">
                          USD {course.usd_price} | ARS {course.ars_price}
                        </p>
                      ) : null}

                      {course.description && (
                        <p className="">{course.description}</p>
                      )}
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="p-6 bg-white fs-6 text-center">
            <p>
              ❤️ Pronto estaremos habilitando esta sección ❤️ <br />
            </p>
          </div>
        )}
        {loadMoreVisible && visibleCourses < courses.length && (
          <div className="text-center mt-4">
            <button
              className="btn btn-lg btn-primary px-5 py-3 fw-bold"
              onClick={loadMore}
            >
              Cargar Más
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CourseList;
