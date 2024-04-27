import React, { useContext, useRef, useState } from "react";
import AuthContext from "../context/AuthContext";
import { BACKEND_URL } from "../config.js";

const CourseCreate = () => {
  const { currentUser } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");

  const userId = currentUser?.["_id"];

  const renderImage = (formData) => {
    const file = formData.get("image");
    const image = URL.createObjectURL(file);
    $image.current.setAttribute("src", image); //img on get | file on POST
  };

  const $image = useRef(null);
  let $file = useRef(null);
  let $videoFile = useRef(null);


  const [formData, setFormData] = useState({
    title: "",
    description: "",
    text_content: "",
    ars_price: 0,
    usd_price: 0,
    thumbnail: null,
    video: null,
    thumbnailUrl: null,
    videoUrl: null,
    discount: 0,
  });

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
    const formData = new FormData(e.target);

    const imageFile = formData.get("image");
    const videoFile = formData.get("video");

    // Handle image file
    if (imageFile) {
      formData.set("image", imageFile, imageFile.name);
    }

    // Handle video file
    if (videoFile) {
      formData.set("video", videoFile, videoFile.name);
    }
    renderImage(formData);

    const response = await fetch(`${BACKEND_URL}/api/course/create`, {
      method: "POST",
      body: formData,
    });
    if (response.ok) {
      const data = await response.json();
      const courseId = data.courseId;
      // Redirect to the specified URL
      window.location.href = `/course/${courseId}`;
    } else {
      // Handle error response
      const errorData = await response.json();
      setErrorMessage(errorData.message);
    }
  };

  return (
    <div className="courseCreate-page-cont min-w-[100vw]">
      <div className="max-w-[80vw] px-3 mt-[5vh] mx-auto">
        <div className="">
          {/* {currentUser && <p className="text-primary">Hello, {userId}!</p>} */}
          <h1 className="text-3xl font-semibold text-gray-800 mb-4">
            Creando Curso
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            {errorMessage && (
              <p className="text-red-500 text-center text-2xl font-semibold">
                {errorMessage}
              </p>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <input
                  name="title"
                  onChange={handleChange}
                  type="text"
                  placeholder="Titulo"
                  className="text-black mt-1 p-2 w-full border border-black rounded-md"
                />
              </div>
              <div>
                <input
                  name="description"
                  onChange={handleChange}
                  type="text"
                  placeholder="Descripcion"
                  className="text-black mt-1 p-2 w-full border border-black rounded-md"
                />
              </div>
            </div>
            <div>
              <textarea
                name="text_content"
                onChange={handleChange}
                type="text"
                placeholder="Contenido de texto"
                className="text-black mt-1 p-2 w-full border border-black rounded-md"
              ></textarea>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <input
                  type="file"
                  id="video"
                  name="video"
                  accept="video/mp4,video/x-m4v,video/*"
                  onChange={handleChange}
                  className="hidden"
                  ref={$videoFile} // Reference to the file input element
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
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                  className="hidden"
                  ref={$file} // Reference to the file input element
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
                  name="discount_ars"
                  placeholder="Descuento ARS (solo en enteros)"
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
                  onChange={handleChange}
                  className="text-black mt-1 p-2 w-full border border-black rounded-md"
                />
              </div>
            </div>
            <input type="hidden" name="author_id" value={userId} />
            {errorMessage && (
              <p className="text-red-500 text-center">{errorMessage}</p>
            )}
            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className="px-4 py-2 mb-5 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              >
                Crear Curso
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CourseCreate;
