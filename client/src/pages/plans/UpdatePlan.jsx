import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import { Link, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UpdatePlan() {
  const { id } = useParams();
  const [errorMessage, setErrorMessage] = useState("");
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
    stock: true,
  });

  useEffect(() => {
    const fetchPlanData = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/plans/${id}/fetch`);
        if (response.status === 200) {
          const planData = response.data.plan;
          setFormData({
            ...planData,
            thumbnailUrl: planData.thumbnail,
            stock: planData.stock,
          });
        } else {
          setErrorMessage("Failed to fetch plan data.");
        }
      } catch (error) {
        setErrorMessage("Failed to fetch plan data.");
      }
    };

    fetchPlanData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      const response = await axios.put(`${BACKEND_URL}/api/plans/update/${id}`, formDataToSend);
      if (response.status === 200) {
        toast.success("Plan actualizado exitosamente");
        setTimeout(() => {
          window.location.href = `/plans/${id}`;
        }, 2000);
      } else {
        setErrorMessage("Failed to update plan.");
      }
    } catch (error) {
      setErrorMessage("Failed to update plan.");
    }
  };

  return (
    <div className="courseCreate-page-cont min-w-[100vw]">
      <div className="max-w-[80vw] px-3 mt-[5vh] mx-auto">
        <div>
          <h1 className="text-3xl font-semibold text-gray-800 mb-4">Actualizando Plan</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            {errorMessage && (
              <p className="text-red-500 text-center text-2xl font-semibold">
                {errorMessage}
              </p>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Título:
                </label>
                <input
                  type="text"
                  name="title"
                  className="text-black mt-1 p-2 w-full border border-gray-300 rounded-md"
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Descripción:
                </label>
                <input
                  name="description"
                  onChange={handleChange}
                  type="text"
                  className="text-black mt-1 p-2 w-full border border-gray-300 rounded-md"
                  value={formData.description}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                  Subir Miniatura:
                </label>
                <input
                  type="file"
                  id="file"
                  name="thumbnail"
                  accept="image/*"
                  className="text-black"
                  onChange={(e) =>
                    setFormData((prevState) => ({
                      ...prevState,
                      thumbnail: e.target.files[0],
                      thumbnailUrl: URL.createObjectURL(e.target.files[0]),
                    }))
                  }
                />
              </div>
            </div>
            <div className="col-span-2">
              <div className="preview">
                <img
                  id="img"
                  src={formData.thumbnailUrl}
                  className="mt-4"
                  style={{ width: 300 }}
                  alt="Thumbnail Preview"
                />
              </div>
            </div>
            <p className="text-danger fs-6">
              Nunca olvides también cambiar el precio del producto en{" "}
              <Link className="underline text-blue" to={"https://www.mercadopago.com.ar/subscription-plans/list"}>
                Mercado Pago Planes
              </Link>{" "}
              y{" "}
              <Link className="underline text-blue" to={"https://www.paypal.com/billing/plans"}>
                Paypal Subscripciones
              </Link>
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="ars_price" className="block text-sm font-medium text-gray-700">
                  ARS Price:
                </label>
                <input
                  type="number"
                  id="ars_price"
                  name="ars_price"
                  onChange={handleChange}
                  className="text-black mt-1 p-2 w-full border border-gray-300 rounded-md"
                  value={formData.ars_price}
                />
              </div>
              <div>
                <label htmlFor="usd_price" className="block text-sm font-medium text-gray-700">
                  USD Price:
                </label>
                <input
                  type="number"
                  id="usd_price"
                  name="usd_price"
                  onChange={handleChange}
                  className="text-black mt-1 p-2 w-full border border-gray-300 rounded-md"
                  value={formData.usd_price}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="discount_ars" className="block text-sm font-medium text-gray-700">
                  Descuento ARS (Opcional):
                </label>
                <input
                  type="number"
                  id="discount_ars"
                  name="discount_ars"
                  onChange={handleChange}
                  className="text-black mt-1 p-2 w-full border border-gray-300 rounded-md"
                  value={formData.discount_ars}
                />
              </div>
              <div>
                <label htmlFor="discount_usd" className="block text-sm font-medium text-gray-700">
                  Descuento USD (Opcional):
                </label>
                <input
                  type="number"
                  id="discount_usd"
                  name="discount_usd"
                  onChange={handleChange}
                  className="text-black mt-1 p-2 w-full border border-gray-300 rounded-md"
                  value={formData.discount_usd}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="payment_link_ars" className="block text-sm font-medium text-gray-700">
                  Link de pago ARS (Opcional):
                </label>
                <input
                  type="text"
                  id="payment_link_ars"
                  name="payment_link_ars"
                  onChange={handleChange}
                  className="text-black mt-1 p-2 w-full border border-gray-300 rounded-md"
                  value={formData.payment_link_ars}
                />
              </div>
              <div>
                <label htmlFor="payment_link_usd" className="block text-sm font-medium text-gray-700">
                  Link de pago USD (Opcional):
                </label>
                <input
                  type="text"
                  id="payment_link_usd"
                  name="payment_link_usd"
                  onChange={handleChange}
                  className="text-black mt-1 p-2 w-full border border-gray-300 rounded-md"
                  value={formData.payment_link_usd}
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <input
                type="checkbox"
                id="stock"
                name="stock"
                checked={formData.stock}
                onChange={handleChange}
              />
              <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
                Hay Stock Disponible
              </label>
            </div>
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
              Actualizar Plan
            </button>
          </form>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
}

export default UpdatePlan;
