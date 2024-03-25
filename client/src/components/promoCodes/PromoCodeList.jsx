import React, { useState, useEffect } from "react";

const PromoCodeList = () => {
  const [promoCodes, setPromoCodes] = useState([]);

  useEffect(() => {
    fetchPromoCodes();
  }, []);

  const fetchPromoCodes = async () => {
    try {
      const response = await fetch(
        "http://localhost:2020/api/course/promoCodes"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch promo codes");
      }
      const data = await response.json();
      setPromoCodes(data.promoCodes);
    } catch (error) {
      console.error("Error fetching promo codes:", error);
    }
  };

  return (
    <div>
      <h2 className="text-4xl fw-bolder mb-3">Promo Codes</h2>
      {promoCodes.length === 0 ? (
        <p>No hay Codigos Promocionales registrados</p>
      ) : (
        <ul>
          {promoCodes.map((pc) => (
            <li key={pc._id}>
              <p>Codigo: {pc.code}</p>
              <p>Expiracion: {pc.exp_date}</p>
              <p>Descuento %: {pc.perc_int}</p>
              <p>Monedas: {pc.currency}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PromoCodeList;
