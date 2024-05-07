import React, { useContext, useEffect, useRef, useState } from "react";
import AuthContext from "../context/AuthContext";
import { BACKEND_URL } from "../config.js";
import { fetchPlans } from "../fetchPlans.js";
// alerts
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const CourseCreate = () => {
  const { currentUser } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("");
  const [plans, setPlans] = useState([]);

  const userId = currentUser?.["_id"];

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchPlans();
        // Check the type and output of one of the plans
        if (data.length > 0) {
          const firstPlan = data[0];
          console.log("Type of plan:", typeof firstPlan);
          console.log("One of the fetched plans:", firstPlan);
        }

        // Filter out the plan with the specific ID
        // const filteredPlans = data.filter(
        //   (plan) => plan._id !== "663163dfeb49a7f71760f150"
        // );

        // Pass the filtered plans to the same type
        setPlans(data);
      } catch (error) {
        console.error("Error fetching plans:", error);
        setErrorMessage("Failed to fetch plans. Please try again later.");
      }
    }
    fetchData();
  }, []);

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
    const { name, value } = e.target;
    setSelectedPlan(value);

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

    formData.append("plan_id", selectedPlan);

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
      toast.success("Curso ha sido creado");
      setTimeout(() => {
        // navigate(`/`);
        // Redirect to the specified URL
        window.location.href = `/#/course/${courseId}`;
      }, 2000);
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
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Título:
                </label>
                <input
                  name="title"
                  onChange={handleChange}
                  type="text"
                  className="text-black mt-1 p-2 w-full border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Descripción:
                </label>
                <input
                  name="description"
                  onChange={handleChange}
                  type="text"
                  className="text-black mt-1 p-2 w-full border border-gray-300 rounded-md"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="text_content"
                className="block text-sm font-medium text-gray-700"
              >
                Contenido Texto:
              </label>
              <textarea
                name="text_content"
                onChange={handleChange}
                type="text"
                className="text-black mt-1 p-2 w-full border border-gray-300 rounded-md"
              ></textarea>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="video"
                  className="block text-sm font-medium text-gray-700"
                >
                  Subir Video:
                </label>
                <input
                  type="file"
                  name="video"
                  accept="video/*"
                  onChange={handleChange}
                  className="text-black "
                />
              </div>
              <div>
                <label
                  htmlFor="image"
                  className="block text-sm font-medium text-gray-700"
                >
                  Subir Miniatura:
                </label>
                <input
                  type="file"
                  id="file"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                  className="text-black "
                />
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
            {/* Select PLAN */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="plan"
                  className="block text-sm font-medium text-gray-700"
                >
                  Seleccionar Plan:
                </label>
                {/* render all plan names */}
                <select
                  name="plan"
                  id="plan"
                  className="text-black mt-1 p-2 w-full border border-gray-300 rounded-md"
                  onChange={handleChange}
                  value={selectedPlan}
                >
                  <option value="">Seleccione un plan</option>
                  {(() => {
                    const options = [];
                    for (let i = 0; i < plans.length; i++) {
                      const plan = plans[i];
                      options.push(
                        <option key={plan._id} value={plan._id}>
                          <p className="text-black">{plan.title}</p>
                        </option>
                      );
                    }
                    return options;
                  })()}
                </select>
                <input type="hidden" name="author_id" value={userId} />
              </div>
            </div>
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
