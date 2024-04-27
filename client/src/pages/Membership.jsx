import React from "react";

function Membership() {
  return (
    <div className="px-4 py-12 max-w-2xl mx-auto mt-5">
      <h1 className="text-3xl font-bold  mb-4 text-slate-800">Subscripcion</h1>
      <p>accede a todo el contenido sin restricciones</p>
      <div className="payment-options mt-2">
        {/* PAY WITH PAYPAL */}
        <form onSubmit={""}>
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
