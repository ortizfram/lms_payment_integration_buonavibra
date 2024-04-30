import React, { useContext, useRef, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

// alerts
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthContext from "../../context/AuthContext";
import { BACKEND_URL } from "../../config";


const UpdatePlan = () => {
  const { currentUser } = useContext(AuthContext);
  const { id } = useParams();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    ars_price: 0,
    usd_price: 0,
    discount_ars: 0,
    discount_usd: 0,
    payment_link_ars: "",
    payment_link_usd: "",
  });
  const $image = useRef(null);

  useEffect(() => {
    const fetchPlanData = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/plans/${id}/fetch`);
        if (response.ok) {
          const data = await response.json();
          const planData = data.plan;
          setFormData(planData);
          
        } else {
          throw new Error("Failed to fetch plan data");
        }
      } catch (error) {
        console.error("Error fetching plan data:", error);
        setErrorMessage("Failed to fetch plan data");
      }
    };

    fetchPlanData();
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

    const response = await fetch(`${BACKEND_URL}/api/plans/update/${id}`, {
      method: "PUT",
      body: formData,
    });

    if (response.status ===200) {
      const data = await response.json();
      setSuccessMessage(data.message);
      // Redirect to the updated course page
      toast.success("Plan ha sido actualizado");
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

              {/* UPLOAD */}
              <h3>Subir Archivos:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

              {/* PRICE */}
              <h3>Configurar precio</h3>
              <p className="text-danger fs-6">Nunca olvides tambien cambiar el precio del producto en <Link className="underline text-blue"to={"https://www.mercadopago.com.ar/subscription-plans/list"}>Mercado Pago Planes</Link> y  <Link className="underline text-blue" to={"https://www.paypal.com/billing/plans"}>Paypal Subscripciones</Link></p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="ars_price"
                    className="block text-sm font-medium text-gray-700"
                  >
                    ARS Price:
                  </label>
                  <input
                    type="number"
                    id="ars_price"
                    name="ars_price"
                    value={formData.ars_price}
                    onChange={handleChange}
                    className="text-black mt-1 p-2 w-full border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label
                    htmlFor="usd_price"
                    className="block text-sm font-medium text-gray-700"
                  >
                    USD Price:
                  </label>
                  <input
                    type="number"
                    id="usd_price"
                    name="usd_price"
                    value={formData.usd_price}
                    onChange={handleChange}
                    className="text-black mt-1 p-2 w-full border border-gray-300 rounded-md"
                  />
                </div>
              </div>

              {/* DISCOUNT */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="discount_ars"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Descuento_ars opcional (numeros enteros):
                  </label>
                  <input
                    type="number"
                    id="discount_ars"
                    className="text-black mt-1 p-2 w-full border border-gray-300 rounded-md"
                    name="discount_ars"
                    value={formData.discount_ars}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="discount_usd"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Descuento_usd opcional (numeros enteros):
                  </label>
                  <input
                    type="number"
                    id="discount_usd"
                    name="discount_usd"
                    className="text-black mt-1 p-2 w-full border border-gray-300 rounded-md"
                    value={formData.discount_usd}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="payment_link_ars"
                  className="block text-sm font-medium text-gray-700"
                >
                  Link de pago ARS (Opcional):
                </label>
                <input
                  type="text"
                  id="payment_link_ars"
                  name="payment_link_ars"
                  value={formData.payment_link_ars}
                  onChange={handleChange}
                  className="text-black mt-1 p-2 w-full border border-gray-300 rounded-md"
                />
              </div>
              <div>
              <label
                  htmlFor="payment_link_usd"
                  className="block text-sm font-medium text-gray-700"
                >
                  Link de pago USD (Opcional):
                </label>
                <input
                  type="text" 
                  id="payment_link_usd"
                  name="payment_link_usd"
                  value={formData.payment_link_usd}
                  onChange={handleChange}
                  className="text-black mt-1 p-2 w-full border border-gray-300 rounded-md"
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

export default UpdatePlan;
