import React, { useContext, useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { BACKEND_URL } from "../config.js";

const CourseUpdate = () => {
  const { currentUser } = useContext(AuthContext);
  const { id } = useParams();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    text_content: "",
    ars_price: 0,
    usd_price: 0,
    discount_ars: 0,
    discount_usd: 0,
  });
  const $image = useRef(null);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/course/${id}/fetch`);
        if (response.ok) {
          const data = await response.json();
          const courseData = data.course;
          setFormData(courseData);
        } else {
          throw new Error("Failed to fetch course data");
        }
      } catch (error) {
        console.error("Error fetching course data:", error);
        setErrorMessage("Failed to fetch course data");
      }
    };

    fetchCourseData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validate input for discount fields to ensure positive integers
    if (name === "discount_ars" || name === "discount_usd") {
      const intValue = parseInt(value);
      if (!Number.isInteger(intValue) || intValue <= 0) {
        setErrorMessage(`The field '${name}' must be a positive integer.`);
        return;
      }
    }

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    const response = await fetch(`${BACKEND_URL}/api/course/update/${id}`, {
      method: "PUT",
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
      setSuccessMessage(data.message);
      // Redirect to the updated course page
      window.location.href = data.redirectUrl;
    } else {
      const errorData = await response.json();
      setErrorMessage(errorData.message);
    }
  };
  // Render the form only when course data is fetched
  return (
    formData && (
      <div id="update-course-container-page">
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
        <div id="update-course-container" className="mt-8 mx-5">
          {currentUser && <p className="text-primary">Hello, {currentUser._id}!</p>}

          <h1 className="section-title">Actualizando Curso</h1>
          <div>
            <form className="form" method="POST" onSubmit={handleSubmit}>
              {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

              {/* CONTENT */}
              <h3>Titulo & contenido:</h3>
              <div className="row">
                <div className="col-lg-6">
                  <label htmlFor="title">titulo:</label>
                  <input
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    type="text"
                    className="form-control"
                  />
                </div>
                <div className="col-lg-6">
                  <label htmlFor="description">Descripcion:</label>
                  <input
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    type="text"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <label htmlFor="text_content">contenido texto:</label>
                  <textarea
                    name="text_content"
                    value={formData.text_content}
                    onChange={handleChange}
                    type="text"
                    className="form-control"
                  ></textarea>
                </div>
              </div>
              <hr />

              {/* UPLOAD */}
              <h3>Subir Archivos:</h3>
              {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

              <div className="row col-lg-12 items-center">
                <div className="">
                  <label htmlFor="video">subir video :</label>
                  <input
                    type="file"
                    name="video"
                    accept="video/*"
                    onChange={handleChange}
                  />
                </div>
                <br />
                <br />
                <div className="">
                  <label htmlFor="image">subir miniatura:</label>
                  <input
                    type="file"
                    id="file"
                    name="image"
                    accept="image/*"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <div className="preview">
                    <img id="img" ref={$image} style={{ width: 300 }} />
                  </div>
                </div>
              </div>
              <hr />

              {/* PRICE */}
              <h3>Configurar precio</h3>
              {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

              <div className="row col-lg-12 items-center">
                <div className="">
                  <label htmlFor="ars_price">ARS Price:</label>
                  <input
                    type="number"
                    id="ars_price"
                    name="ars_price"
                    value={formData.ars_price}
                    onChange={handleChange}
                  />
                </div>
                <div className="">
                  <label htmlFor="usd_price">USD Price:</label>
                  <input
                    type="number"
                    id="usd_price"
                    name="usd_price"
                    value={formData.usd_price}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <hr />

              {/* DISCOUNT */}
              <h3>Adicionales & descuentos</h3>
              {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

              <div className="row items-center col-lg-12">
                <div className="">
                  <label htmlFor="discount_ars">
                    descuento_ars opcional (numeros enteros):
                  </label>
                  <br />
                  <strong>% ARS </strong>
                  <input
                    type="number"
                    id="discount_ars"
                    name="discount_ars"
                    value={formData.discount_ars}
                    onChange={handleChange}
                  />
                </div>
                <div className="">
                  <label htmlFor="discount_usd">
                    descuento_usd opcional (numeros enteros):
                  </label>
                  <br />
                  <strong>% USD </strong>
                  <input
                    type="number"
                    id="discount_usd"
                    name="discount_usd"
                    value={formData.discount_usd}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <input type="hidden" name="author_id" value={currentUser._id} />
              <br />
              <br />

              {/* submit */}
              <div className="items-center text-center mt-20">
                <button type="submit" className="btn btn-success">
                  Update Course
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  );
};

export default CourseUpdate;
