import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import AuthContext from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ReactMarkdown from "react-markdown";
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

  // Function to extract YouTube video ID from URL
  const getYouTubeVideoId = (url) => {
    if (!url) return null;
    const urlObj = new URL(url);
    return urlObj.searchParams.get("v");
  };

  const videoUrl = course ? course.video : "";
  const youtubeVideoId = getYouTubeVideoId(videoUrl);

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
      <ToastContainer />
      {course && (
        <div className="container">
          <div className="card my-5">
            <div className="card-body">
              <div className="row mb-4">
                <div className="col text-center">
                  <div className="ratio ratio-16x9 mb-3">
                    {youtubeVideoId ? (
                      <iframe
                        id="course-video"
                        className="img-fluid shadow-lg"
                        src={`https://www.youtube.com/embed/${youtubeVideoId}`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    ) : (
                      <p>No video available</p>
                    )}
                  </div>
                  <div className="row mb-4">
                    <div className="col text-center">
                      <div className="d-flex align-items-center justify-content-center mb-3">
                        <img
                          className="rounded-circle me-2"
                          src={course.author.avatar}
                          alt="author_avatar"
                          width="50"
                          height="50"
                        />
                        <div>
                          <strong>{course.author.name}</strong>
                          <p className="mb-0 text-muted">
                            {course.author.email}
                          </p>
                        </div>
                      </div>
                      {isAdmin && (
                        <div className="d-flex justify-content-center mb-4">
                          <a
                            className="btn btn-outline-primary me-2"
                            href={`${FRONTEND_URL}/#/course/update/${course._id}`}
                          >
                            <i className="fas fa-edit me-2"></i>Editar
                          </a>
                          <button
                            className="btn btn-outline-danger"
                            onClick={handleDelete}
                          >
                            <i className="fas fa-trash-alt me-2"></i>Borrar
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  <h2 className="card-title">{course.title}</h2>
                  <h6 className="card-subtitle mb-2 text-muted">
                    {course.description}
                  </h6>
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
