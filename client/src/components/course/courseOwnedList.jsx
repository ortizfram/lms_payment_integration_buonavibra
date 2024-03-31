import React, { useState, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import "../../public/css/course/courses.css";

function CourseOwnedList({ courses }) {
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
    <div className="library-page-container">
      <div className="courses-container">
        <ul className="courses-grid">
          {courses.slice(0, visibleCourses).map((course, index) => (
            <li key={index}>
              <div className="course-item position-relative backdrop-filter shadow-lg">
                {/* NExt Link */}
                <a href={`/course/${course._id}`}>
                  {/* COURSE DATA */}
                  <img
                    src={course.thumbnail}
                    alt={`thumbnail-${course.slug}`}
                  />
                  <p className="timestamp">{course.updated_at}</p>

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
                      <p className="author-info ">
                        <strong>{course.author.username}</strong> •{" "}
                        {course.author.name}
                      </p>
                    )}
                  </div>
                  <h2 className="">{course.title}</h2>

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
                        href={`/api/course/update/${course._id}`}
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
                        href={`/api/course/delete/${course._id}`}
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

export default CourseOwnedList;
