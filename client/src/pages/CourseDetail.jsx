import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import "../public/css/course/courseDetail.css";
import AlertMessage from "../components/alertMessage.jsx";
import AuthContext from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CourseDetail = () => {
  const { currentUser } = useContext(AuthContext);
  const [course, setCourse] = useState(undefined);
  const { id } = useParams();
  const isAdmin = currentUser?.["isAdmin"];
  const navigate = useNavigate();

  useEffect(() => {
    const checkEnroll = async () => {
      try {
        console.log("checking Enroll http");
        const enrollRes = await axios.get(
          `http://localhost:2020/api/course/${id}/checkEnroll`
          );

        if (enrollRes.status === 401) {
          // unathorized, Redirect to enroll page
          console.log("Redirecting to enrollment page...");
          navigate(`/course/enroll/${id}`);
          console.log("Redirection completed.");
        } else if (enrollRes.status === 200) {
          // user is enroleld, fetch course
          try {
            console.log("fetching course http");
            const fetchCourseRes = await axios.get(
              `http://localhost:2020/api/course/${id}/fetch`
            );
            if (fetchCourseRes.status === 200) {
              // course found, setCourse state
              const data = await fetchCourseRes.json();
              setCourse(data.course);
            } else {
              // could found course, redirect
              if (fetchCourseRes.status === 404) {
                // Redirect to enroll page
                console.log("Redirecting to enrollment page...");
                navigate(`/course/all`);
                console.log("Redirection completed.");
              }
            }
          } catch (error) {
            console.error(error);
          }
        } else {
          console.error("Failed to fetch course data");
        }
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    };

    checkEnroll();
  }, [id]);

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <AlertMessage />
      <div className="containerr">
        <div className="cont-course-detail" style={{ margin: "6.2rem auto" }}>
          <div className="background-blur"></div>
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-center">
                <div className="video-container mb-1">
                  <video
                    id="course-video"
                    controls
                    className="img-fluid shadow-lg"
                  >
                    <source src={course.video} type="video/mp4" />
                    <source src={course.video} type="video/webm" />
                    <source src={course.video} type="video/ogg" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-12 text-center">
                <div>
                  <p>
                    <span>
                      <img
                        className="avatar ms-4 me-2"
                        src={course.author.avatar}
                        alt="author_avatar"
                      />
                    </span>
                    <span className="fw-bold">{course.author.name}</span> •
                    <span>{course.author.email}</span>
                    {isAdmin === true && (
                      <span className="course-admin-options opacity-50">
                        <button className="btn">
                          <p>
                            <a
                              className="text-muted"
                              href={`/api/course/${course.id}/update?courseId=${course.id}`}
                            >
                              <i className="fas fa-edit me-2 text-white"></i>
                            </a>
                          </p>
                        </button>
                        <button className="btn">
                          <p>
                            <a
                              className="text-muted"
                              href={`/api/course/${course.id}/delete?courseId=${course.id}`}
                            >
                              <i className="fas fa-trash-alt me-2 text-white"></i>
                            </a>
                          </p>
                        </button>
                      </span>
                    )}
                  </p>
                  <h2>{course.title}</h2>
                  <h6>{course.description}</h6>
                </div>
                <p>{course.text_content}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseDetail;
