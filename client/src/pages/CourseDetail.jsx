import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import "../public/css/course/courseDetail.css";
import AuthContext from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ReactMarkdown from "react-markdown";
// alerts
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BACKEND_URL, FRONTEND_URL } from "../config.js";

const CourseDetail = () => {
  const { currentUser } = useContext(AuthContext);
  const [course, setCourse] = useState(undefined);
  const { id } = useParams();
  const isAdmin = currentUser?.["isAdmin"];
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        console.log("courseDetail: fetchingCourse ");
        const fetchCourseRes = await axios.get(
          `${BACKEND_URL}/api/course/${id}/fetch`
        );
        if (fetchCourseRes.status === 200) {
          const data = await fetchCourseRes.data;
          setCourse(data.course);
        } else {
          if (fetchCourseRes.status === 404) {
            console.log("Redirecting to enrollment page...");
            navigate(`/course/all`);
            console.log("Redirection completed.");
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchCourse();
  }, [id, navigate]);

  const handleDelete = async () => {
    try {
      const deleteCourseRes = await axios.delete(
        `${BACKEND_URL}/api/course/delete/${course._id}`
      );
      if (deleteCourseRes.status === 200) {
        console.log("Course deleted successfully");
        toast.success("Course deleted successfully");
        setTimeout(() => {
          navigate(`/course/all`);
        }, 2000);
      } else {
        console.error("Failed to delete course");
      }
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  return (
    <>
    {course && (
      <div className="containerr">
        <div className="cont-course-detail">
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
                  <p className="author-info">
                    <span className="d-flex align-items-center">
                      <img
                        className="avatar ms-4 me-2"
                        src={course.author.avatar}
                        alt="author_avatar"
                      />
                      <span className="fw-bold">{course.author.name} </span> •
                      <span> {course.author.email}</span>
                    </span>
                    {isAdmin === true && (
                      <span className="course-admin-options opacity-50">
                        <button className="">
                          <p>
                            <a
                              className="text-muted"
                              href={`${FRONTEND_URL}/course/update/${course._id}`}
                            >
                              <i className="fas fa-edit me-2 mx-2">Editar</i>
                            </a>
                          </p>
                        </button>
                        <button className="" onClick={handleDelete}>
                          <p>
                            <i className="fas fa-trash-alt me-2 ">Borrar</i>
                          </p>
                        </button>
                      </span>
                    )}
                  </p>
                  <h2 className="text-4xl mb-4">{course.title}</h2>
                  <h6 className="text-xl mb-2">{course.description}</h6>
                </div>
                <ReactMarkdown>{course.text_content}</ReactMarkdown>
              </div>
            </div>
          </div>
        </div>
      </div>
    )}
    </>
  );
};

export default CourseDetail;
