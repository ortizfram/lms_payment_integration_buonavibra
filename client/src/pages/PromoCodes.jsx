import React, { useEffect, useState } from "react";
import PromoCodeForm from "../components/promoCodes/promoCodeForm";
import axios from "axios"
import { BACKEND_URL } from "../config";

function PromoCodes() {
  const [codes, setCodes] = useState([]);

  async function getPromoCodes() {
    const codesRes = await axios.get(
      `${BACKEND_URL}/api/course/promo-codes`
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
