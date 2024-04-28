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
  let $file = useRef(null);
  let $videoFile = useRef(null);

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
      <div className="courseCreate-page-cont min-w-[100vw]">
        <div className="max-w-[80vw] px-3 mt-[5vh] mx-auto">
          <h1 className="text-3xl font-semibold text-gray-800 mb-4">
            Actualizando Curso
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            {errorMessage && (
              <p className="text-red-500 text-center text-2xl font-semibold">
                {errorMessage}
              </p>
            )}
            {/* CONTENT */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <input
                  name="title"
                  placeholder="Titulo"
                  value={formData.title}
                  onChange={handleChange}
                  type="text"
                  className="text-black mt-1 p-2 w-full border border-black rounded-md"
                />
              </div>
              <div>
                <input
                  name="description"
                  placeholder="Descripcion corta del curso"
                  value={formData.description}
                  onChange={handleChange}
                  type="text"
                  className="text-black mt-1 p-2 w-full border border-black rounded-md"
                />
              </div>
            </div>

            <div>
              <textarea
                name="text_content"
                value={formData.text_content}
                placeholder="Contenido de texto"
                onChange={handleChange}
                type="text"
                className="text-black mt-1 p-2 w-full border border-black rounded-md"
              ></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <input
                  type="file"
                  name="video"
                  accept="video/mp4,video/x-m4v,video/*"
                  onChange={handleChange}
                  className="hidden"
                  ref={$videoFile}
                />
                <button
                  onClick={() => $videoFile.current.click()} // Trigger file input click
                  className="text-black mt-1 p-2 w-full border border-black rounded-md bg-gray-300 hover:bg-gray-200"
                >
                  Seleccione un video
                </button>
              </div>
              <div>
                <input
                  type="file"
                  id="file"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                  className="hidden"
                  ref={$file}
                />
                <button
                  onClick={() => $file.current.click()} // Trigger file input click
                  className="text-black mt-1 p-2 w-full border border-black rounded-md bg-gray-300 hover:bg-gray-200"
                >
                  Seleccione una miniatura
                </button>
              </div>
            </div>

            <div className="col-span-2">
              <div className="preview">
                <img
                  id="img"
                  ref={$image}
                  className="mt-4"
                  style={{ width: 300 }}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <input
                  type="number"
                  id="ars_price"
                  name="ars_price"
                  value={formData.ars_price}
                  placeholder="ARS precio"
                  onChange={handleChange}
                  className="text-black mt-1 p-2 w-full border border-black rounded-md"
                />
              </div>
              <div>
                <input
                  type="number"
                  id="usd_price"
                  name="usd_price"
                  value={formData.usd_price}
                  placeholder="USD precio"
                  onChange={handleChange}
                  className="text-black mt-1 p-2 w-full border border-black rounded-md"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <input
                  type="number"
                  id="discount_ars"
                  placeholder="Descuento ARS (solo en enteros)"
                  name="discount_ars"
                  value={formData.discount_ars}
                  onChange={handleChange}
                  className="text-black mt-1 p-2 w-full border border-black rounded-md"
                />
              </div>
              <div>
                <input
                  type="number"
                  id="discount_usd"
                  placeholder="Descuento USD (solo en enteros)"
                  name="discount_usd"
                  value={formData.discount_usd}
                  onChange={handleChange}
                  className="text-black mt-1 p-2 w-full border border-black rounded-md"
                />
              </div>
            </div>

            <input type="hidden" name="author_id" value={currentUser._id} />
            {errorMessage && (
              <p className="text-red-500 text-center">{errorMessage}</p>
            )}
            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className="px-4 py-2 mb-5 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              >
                Update Course
              </button>
            </div>
          </form>

          <div></div>
        </div>
      </div>
    )
  );
};

export default CourseUpdate;
