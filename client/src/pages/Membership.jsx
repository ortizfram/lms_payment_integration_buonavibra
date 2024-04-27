import React, { useContext } from "react";
import { BACKEND_URL } from "../../../api/config.js";
import AuthContext from "../context/AuthContext.jsx";
import axios from "axios";

function Membership() {
  const { currentUser } = useContext(AuthContext);
  const user = currentUser;

  const handlePaypalOrder = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/subscription/create-subscription-paypal?userId=${user._id}`
      );

      // Extract the approval link from the response data
      const approvalLink = response.data.approvalLink;

      window.location.href = approvalLink;
    } catch (error) {
      throw new Error("Error creating PayPal order:", error);
    }
  };

  return (
    <div className="px-4 py-12 max-w-2xl mx-auto mt-5">
      <h1 className="text-3xl font-bold  mb-4 text-slate-800">Subscripcion</h1>
      <p>accede a todo el contenido sin restricciones</p>
      <div className="payment-options mt-2">
        {/* PAY WITH PAYPAL */}
        <form onSubmit={handlePaypalOrder}>
          <button type="submit">
            <img src="/images/paypal.png" alt="paypal-icon" />
            <p>Continuar con Paypal</p>
          </button>
        </form>

        {/* PAY WITH MP */}
        <form onSubmit={""}>
          <button type="submit">
            <img src="/images/mercado-pago.png" alt="mercado-pago-icon" />
            <p>Continuar con Mercado Pago</p>
          </button>
        </form>
      </div>
    </div>
  );
}

export default Membership;
