import React, { useContext, useEffect, useState } from "react";
import { BACKEND_URL } from "../../config";
import AuthContext from "../../context/AuthContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
// alerts
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function PlanDetail() {
  const { currentUser } = useContext(AuthContext);
  const [plan, setPlan] = useState(undefined);
  const { id } = useParams();
  const isAdmin = currentUser?.["isAdmin"];
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        console.log("planDetail: fetchingPlan ");
        const fetchPlanRes = await axios.get(
          `${BACKEND_URL}/api/plans/${id}/fetch`
        );
        if (fetchPlanRes.status === 200) {
          const data = await fetchPlanRes.data;
          setPlan(data.plan);
        } else {
          if (fetchPlanRes.status === 404) {
            console.log("Redirecting to enrollment page...");
            navigate(`/#/plans`);
            console.log("Redirection completed.");
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchPlan();
  }, [id, navigate]);

  const handleDelete = async () => {
    try {
      const deletePlanRes = await axios.delete(
        `${BACKEND_URL}/api/plans/delete/${id}`
      );
      if (deletePlanRes.status === 204 || deletePlanRes.status === 200) {
        console.log("Pan deleted successfully");
        toast.success("Plan borrado exitosamente");
        setTimeout(() => {
          window.location.href = `/#/plans`;
        }, 2000);
      }
      console.error("Failed to delete plan");
    } catch (error) {
      console.error("Error deleting plan:", error);
    }
  };
  return (
    <>
      {plan && (
        <div className="container mt-5">
          <div className="cont-course-detail">
            <div className="container">
              <div className="row">
                <div className="col-lg-12 mb-3 d-flex justify-content-center">
                  <div style={{ maxWidth: "20rem" }}>
                    <img
                      src={`${BACKEND_URL}${plan.thumbnail}`}
                      className="rounded-lg w-100"
                      style={{ objectFit: "cover" }}
                      alt={`thumbnail-${plan.title}`}
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-lg-12 text-center">
                  <div>
                    <h2 className="text-4xl mb-3">{plan.title}</h2>
                    <h6 className="text-xl mb-2">{plan.description}</h6>
                    <ul className="prices text-muted">
                      <li>USD {plan.usd_price}</li>
                      <li>${plan.ars_price}</li>
                    </ul>
                    <div className="payment-options d-flex justify-content-center gap-4 mt-2 align-middle p-2">
                      <Link
                        to={`${plan.payment_link_ars}`}
                        className="btn border border-dark d-flex align-items-center justify-content-center hover-bg-gray text-black"
                      >
                        <img
                          className="max-w-6 me-2"
                          src="/images/mercado-pago.png"
                          alt="mercado-pago-icon"
                        />
                        Comprar como Argentino
                      </Link>
                      <Link
                        to={`${plan.payment_link_usd}`}
                        className="btn border border-dark d-flex align-items-center justify-content-center hover-bg-gray text-black"
                      >
                        <img
                          className="max-w-6 me-2"
                          src="/images/paypal.png"
                          alt="paypal-icon"
                        />
                        Comprar como Extranjero
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-12 text-center my-4 mb-5">
              {isAdmin === true && (
                <span className="course-admin-options opacity-50 space-x-5">
                  <button className="btn border-neutral-600   bg-transparent p-2">
                    <p>
                      <a
                        className="text-muted"
                        href={`/#/plans/update/${plan._id}`}
                      >
                        <i className="fas fa-edit me-2 mx-2">Editar</i>
                      </a>
                    </p>
                  </button>
                  <button
                    className="btn border-neutral-600   bg-transparent p-2"
                    onClick={handleDelete}
                  >
                    <p>
                      <i className="fas fa-trash-alt me-2 text-danger">
                        Borrar
                      </i>
                    </p>
                  </button>
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default PlanDetail;
