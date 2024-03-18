import React, { useRef, useState } from "react";
import { useSelector } from 'react-redux';

const CourseCreate = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [errorMessage, setErrorMessage] = useState("");

  const renderImage = (formData) => {
    const file = formData.get("image");
    const image = URL.createObjectURL(file);
    $image.current.setAttribute("src", image); //img on get | file on POST
  };

  const $image = useRef(null);
  let $file = useRef(null);

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
    const { name, value, type } = e.target;

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
    // debugger
    // Handle file uploads
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
    // Handle form submission logic, e.g., sending data to the server
    const response = await fetch("http://localhost:2020/api/course/create", {
      method: "POST",
      body: formData,
    });
    if (response.ok) {
      const data = await response.json();
      const courseId = data.courseId
      // Redirect to the specified URL
      window.location.href = `/course/${courseId}`;
    } else {
      // Handle error response
      const errorData = await response.json();
      setErrorMessage(errorData.message);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-xl mx-auto">
        {currentUser && <p className="text-primary">Hello, {currentUser._id}!</p>}
        <h1 className="text-3xl font-semibold text-gray-800 mb-4">Creando Curso</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">Título:</label>
              <input
                name="title"
                onChange={handleChange}
                type="text"
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descripción:</label>
              <input
                name="description"
                onChange={handleChange}
                type="text"
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>
          </div>
          <div>
            <label htmlFor="text_content" className="block text-sm font-medium text-gray-700">Contenido Texto:</label>
            <textarea
              name="text_content"
              onChange={handleChange}
              type="text"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            ></textarea>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="video" className="block text-sm font-medium text-gray-700">Subir Video:</label>
              <input
                type="file"
                name="video"
                accept="video/*"
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700">Subir Miniatura:</label>
              <input
                type="file"
                id="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-span-2">
            <div className="preview">
              <img id="img" ref={$image} className="mt-4" style={{ width: 300 }} />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="ars_price" className="block text-sm font-medium text-gray-700">ARS Price:</label>
              <input
                type="number"
                id="ars_price"
                name="ars_price"
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label htmlFor="usd_price" className="block text-sm font-medium text-gray-700">USD Price:</label>
              <input
                type="number"
                id="usd_price"
                name="usd_price"
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="discount_ars" className="block text-sm font-medium text-gray-700">Descuento ARS (Opcional):</label>
              <input
                type="number"
                id="discount_ars"
                name="discount_ars"
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label htmlFor="discount_usd" className="block text-sm font-medium text-gray-700">Descuento USD (Opcional):</label>
              <input
                type="number"
                id="discount_usd"
                name="discount_usd"
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>
          </div>
          <input type="hidden" name="author_id" value={currentUser._id} />
          <div className="flex justify-center mt-6">
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
              Crear Curso
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CourseCreate;
