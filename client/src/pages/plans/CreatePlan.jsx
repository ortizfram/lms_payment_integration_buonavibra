import React, { useState, useRef } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import { Link, useNavigate } from "react-router-dom";
// alerts
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CreatePlan() {
  const [errorMessage, setErrorMessage] = useState("");
  const $image = useRef(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    ars_price: 0,
    usd_price: 0,
    discount_ars: 0,
    discount_usd: 0,
    payment_link_ars: "",
    payment_link_usd: "",
    thumbnail: null,
    thumbnailUrl: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const response = await axios.post(`${BACKEND_URL}/api/plans`, formData);
    if (response.status === 201) {
      console.log("Plan created:", response.data.data);
      toast.success("Plan creado exitosamente");
      setTimeout(() => {
        window.location.href = "/plans"
      }, 2000);
    } else {
      setErrorMessage("Failed to create plan.");
    }
  };

  return (
    <div className="courseCreate-page-cont min-w-[100vw]">
      <div className="max-w-[80vw] px-3 mt-[5vh] mx-auto">
        <div className="">
          <h1 className="text-3xl font-semibold text-gray-800 mb-4">
            Creando Plan
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
                  type="text"
                  name="title"
                  className="text-black mt-1 p-2 w-full border border-gray-300 rounded-md"

                  onChange={handleChange}
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <p className="text-red fs-4">Nunca olvides tambien crear el precio del producto en <Link to={"https://www.mercadopago.com.ar/subscription-plans/list"}>Mercado Pago Planes</Link> y  <Link to={"https://www.paypal.com/billing/plans"}>Paypal Subscripciones</Link></p>
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
                  onChange={handleChange}
                  className="text-black mt-1 p-2 w-full border border-gray-300 rounded-md"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="discount_ars"
                  className="block text-sm font-medium text-gray-700"
                >
                  Descuento ARS (Opcional):
                </label>
                <input
                  type="number"
                  id="discount_ars"
                  name="discount_ars"
                  onChange={handleChange}
                  className="text-black mt-1 p-2 w-full border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label
                  htmlFor="discount_usd"
                  className="block text-sm font-medium text-gray-700"
                >
                  Descuento USD (Opcional):
                </label>
                <input
                  type="number"
                  id="discount_usd"
                  name="discount_usd"
                  onChange={handleChange}
                  className="text-black mt-1 p-2 w-full border border-gray-300 rounded-md"
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
                  onChange={handleChange}
                  className="text-black mt-1 p-2 w-full border border-gray-300 rounded-md"
                />
              </div>
            </div>
            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className="px-4 py-2 mb-5 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              >
                Crear Plan
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreatePlan;
