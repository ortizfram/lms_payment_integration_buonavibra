import React, { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import { Link, useLocation } from "react-router-dom";

function Plans() {
  const [plans, setPlans] = useState([]);
  const location = useLocation()

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
      <h1 className="ft-roboto text-center mb-4 fw-bolder fs-3 section-title text-dark">
       Comprá un pack de Clases de Yoga y Meditación
      </h1>
      <hr />
      <div className="row">
        {plans.map((plan) => (
          <div key={plan._id} className="col-md-4 mb-4">
            <div
              className={`card h-100 border ${
                plan.title.includes("Re") ? "border-danger" : "border-muted"
              } shadow`}
            >
              <div
                className="thumbnail-wrapper"
                style={{ height: "200px", overflow: "hidden" }}
              >
                <img
                  src={`${BACKEND_URL}${plan.thumbnail}`}
                  className="card-img-top"
                  alt={`thumbnail-${plan.title}`}
                  style={{ objectFit: "cover", width: "100%", height: "100%" }}
                />
              </div>
              <div className="card-body d-flex flex-column">
                <h5 className="card-title fw-bold fs-6">{plan.title}.</h5>
                <div className=" px-2 mb-2">
                <p className="card-text flex-grow-1 italic">
      {
        plan.description.includes('Bonus')
          ? plan.description.split('Bonus').map((part, index, array) => (
              index < array.length - 1 ? (
                <span key={index}>
                  {part}
                  <br/><br/>
                  <strong>Bonus</strong>
                </span>
              ) : (
                <span key={index}>{part}</span>
              )
            ))
          : plan.description
      }
    </p>
                  <p className="fw-bold">${plan.ars_price}</p>
                  <p className="fw-bold">USD {plan.usd_price}</p>
                </div>
                <Link
                  to={`/plans/${plan._id}`}
                  state={{ prevUrl: `/plans/${plan._id}` }}
                  className="btn text-white  bg-[#ef7f72] hover:bg-[#c9685d] mt-auto"
                >
                  Ver más
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Plans;
