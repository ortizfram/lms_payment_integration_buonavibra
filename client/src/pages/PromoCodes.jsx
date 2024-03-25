import React from "react";
import PromoCodeList from "../components/promoCodes/promoCodeList";
import PromoCodeForm from "../components/promoCodes/promoCodeForm";

function PromoCodes() {
  return (
    <div>
      <h3 className="text-xl fw-bold">PromoCodes</h3>

      <PromoCodeForm />
      <PromoCodeList />
    </div>
  );
}

export default PromoCodes;
