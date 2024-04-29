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
    <div>
      <h1>Planes</h1>
      <hr />
      <ul>
        {plans.map((plan) => (
          <>
            <Link to={`/plans/${plan._id}`}>
              <li>{plan.thumbnail}</li>
              <li>{plan.title}</li>
              <li>{plan.description}</li>
              <li>{plan.ars_price}</li>
              <li>{plan.usd_price}</li>
            </Link>
            <br />
          </>
        ))}
      </ul>
    </div>
  );
}

export default Plans;
