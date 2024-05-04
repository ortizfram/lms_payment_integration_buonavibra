import React, { useContext, useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { BACKEND_URL } from "../config.js";
// alerts
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchPlans } from "../fetchPlans.js";
import mongoose from "mongoose";

const CourseUpdate = () => {
  const { currentUser } = useContext(AuthContext);
  const { id } = useParams();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("");
  const [plans, setPlans] = useState([]);
  const [formData, setFormData] = useState({
    plan_id: "",
    title: "",
    description: "",
    text_content: "",
  });
  const $image = useRef(null);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/course/${id}/fetch`);
        if (response.ok) {
          const data = await response.json();
          const courseData = data.course;
          console.log(courseData);
          setFormData(courseData);
          const plansData = await fetchPlans();
          console.log(plansData);
          setPlans(plansData);
          console.log("selectedPlan ", selectedPlan);
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

  const handleChangePlan = (e) => {
    const { value } = e.target;
    setSelectedPlan(value);
    console.log("changing selectedPlan:", selectedPlan);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    formData.append("plan_id", selectedPlan);

    const response = await fetch(`${BACKEND_URL}/api/course/update/${id}`, {
      method: "PUT",
      body: formData,
    });

    if (response.status === 200) {
      const data = await response.json();
      setSuccessMessage(data.message);
      // Redirect to the updated course page
      toast.success("Curso ha sido actualizado");
      setTimeout(() => {
        // navigate(`/`);
        window.location.href = data.redirectUrl;
      }, 2000);
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
          {errorMessage && (
            <p className="text-red-500 text-center text-2xl font-semibold">
              {errorMessage}
            </p>
          )}
          {successMessage && (
            <p className="text-green-500 text-center text-2xl font-semibold">
              {successMessage}
            </p>
          )}
          <div>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* CONTENT */}
              <h3>Titulo & contenido:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* SELECT A PLAN */}
                <div>
                  <label
                    htmlFor="plan"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Seleccionar Plan:
                  </label>
                  {/* render all plan names */}
                  <select
                    name="plan_id" // Change name to "plan_id" to match the key in formData
                    id="plan"
                    className="text-black mt-1 p-2 w-full border border-gray-300 rounded-md"
                    onChange={handleChangePlan}
                    value={formData.plan_id} // Set the value to formData.plan_id
                  >
                    <option value="">Seleccione un Plan</option>
                    {plans.map((plan) => (
                      <option key={plan._id} value={plan._id}>
                        {plan.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700"
                  >
                    titulo:
                  </label>
                  <input
                    name="title"
                    value={formData.title}
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
                    Descripcion:
                  </label>
                  <input
                    name="description"
                    value={formData.description}
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
                  contenido texto:
                </label>
                <textarea
                  name="text_content"
                  value={formData.text_content}
                  onChange={handleChange}
                  type="text"
                  className="text-black mt-1 p-2 w-full border border-gray-300 rounded-md"
                ></textarea>
              </div>
              <hr />

              {/* UPLOAD */}
              <h3>Subir Archivos:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="video"
                    className="block text-sm font-medium text-gray-700"
                  >
                    subir video :
                  </label>
                  <input
                    type="file"
                    name="video"
                    accept="video/*"
                    onChange={handleChange}
                    className="text-black"
                  />
                </div>
                <div>
                  <label
                    htmlFor="image"
                    className="block text-sm font-medium text-gray-700"
                  >
                    subir miniatura:
                  </label>
                  <input
                    type="file"
                    id="file"
                    name="image"
                    accept="image/*"
                    onChange={handleChange}
                    className="text-black"
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

              <input type="hidden" name="author_id" value={currentUser._id} />
              <div className="flex justify-center mt-6">
                <button
                  type="submit"
                  className="px-4 py-2 mb-5 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                >
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
