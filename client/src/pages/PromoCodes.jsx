import React, { useEffect, useState } from "react";
import PromoCodeForm from "../components/promoCodes/promoCodeForm";
import axios from "axios"

function PromoCodes() {
  const [codes, setCodes] = useState([]);

  async function getPromoCodes() {
    const codesRes = await axios.get(
      "http://localhost:2020/api/course/promo-codes"
    );
    setCodes(codesRes.data);
  }

  useEffect(() => {
    getPromoCodes();
  }, []);

  return (
    <div>
      <PromoCodeForm />
    </div>
  );
}

export default PromoCodes;
