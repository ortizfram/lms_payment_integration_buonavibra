import React, { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import { Link } from "react-router-dom";

function Plans() {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/plans`)
      .then((response) => {
        setPlans(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching plans:", error);
      });
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4 fw-bolder fs-3">Planes</h1>
      <hr />
      <div className="row">
        {plans.map((plan) => (
          <div key={plan._id} className="col-md-4 mb-4">
            <div className="card h-100">
              <img src={`${BACKEND_URL}${plan.thumbnail}`} className="card-img-top" alt={`thumbnail-${plan.title}`} />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title fw-bold fs-6">{plan.title}</h5>
               <div className=" px-2 mb-2">
               <p className="card-text flex-grow-1">{plan.description}</p>
                <p className="fw-bold">${plan.ars_price}</p>
                <p className="fw-bold">USD {plan.usd_price}</p>
               </div>
                <Link to={`/plans/${plan._id}`} className="btn text-white  bg-[#ef7f72] hover:bg-[#c9685d] mt-auto">Ver más</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Plans;
