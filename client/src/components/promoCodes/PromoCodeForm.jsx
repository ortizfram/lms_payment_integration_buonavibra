import React, { useState } from "react";

const PromoCodeForm = () => {
  const [formData, setFormData] = useState({
    code: "",
    exp_date: "",
    perc_int: "",
    currency: "BOTH", // Default currency
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:2020/api/course/create/promoCode",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        // Handle success
        console.log(
          "Promo code created successfully",
          JSON.stringify(formData.code)
        );
      } else {
        // Handle error
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Failed to create promo code");
      }
    } catch (error) {
      console.error("Error creating promo code:", error);
      setErrorMessage("Failed to create promo code");
    }
  };

  return (
    <div className="container text-black">
      <h2 className="fw-bolder text-4xl mb-2">Create Promo Code</h2>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-1">
          <label htmlFor="code" className="form-label">
            Escribe codigo Promocional:
          </label>
          <input
            type="text"
            id="code"
            name="code"
            value={formData.code}
            onChange={handleChange}
            placeholder="CODIGO-PROMOCIONAL"
            className="form-control"
            required
          />
        </div>
        <div className="mb-1">
          <label htmlFor="exp_date" className="form-label">
            Dia de expiracion:
          </label>
          <input
            type="date"
            id="exp_date"
            name="exp_date"
            value={formData.exp_date}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-1">
          <label htmlFor="perc_int" className="form-label">
            Pocentaje de descuento:
          </label>
          <input
            type="number"
            id="perc_int"
            name="perc_int"
            value={formData.perc_int}
            onChange={handleChange}
            placeholder="% en numeros enteros, e.g.: 10 para 10%"
            className="form-control"
            required
          />
        </div>
        <div className="mb-1">
          <label htmlFor="currency" className="form-label">
            aplicar a una Moneda:
          </label>
          <select
            id="currency"
            name="currency"
            value={formData.currency}
            onChange={handleChange}
            className="form-select"
            required
          >
            <option value="USD">USD</option>
            <option value="ARS">ARS</option>
            <option value="BOTH">TODAS</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Crear Promo Code
        </button>
      </form>
    </div>
  );
};

export default PromoCodeForm;
