import React, { useContext, useEffect, useState } from "react";
import { BACKEND_URL } from "../../config";
import AuthContext from "../../context/AuthContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

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
            navigate(`/plans`);
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
        `${BACKEND_URL}/api/plans/${plan._id}`
      );
      if (deletePlanRes.status === 200) {
        console.log("Pan deleted successfully");
        toast.success("Pan borrado exitosamente");
        setTimeout(() => {
          navigate(`/plans`);
        }, 2000);
      } else {
        console.error("Failed to delete plan");
      }
    } catch (error) {
      console.error("Error deleting plan:", error);
    }
  };
  return (
    <>
      {plan && (
        <div className="containerr">
          <div className="cont-course-detail mb-3">
            <div className="container">
              <div className="row">
                <div className="col-lg-12 max-w-[450px] mb-3">
                  <img src={`${BACKEND_URL}${plan.thumbnail}`} className="rounded-lg"/>
                </div>
              </div>

              <div className="row">
                <div className="col-lg-12 text-center">
                  <div>
                    <h2 className="text-4xl mb-4">{plan.title}</h2>
                    <h6 className="text-xl mb-2">{plan.description}</h6>
                    <ul className="prices text-muted">
                      <li>USD {plan.usd_price}</li>
                      <li>${plan.ars_price}</li>
                    </ul>
                    <div id="buy-btns" className="space-y-2 mt-3 bg-[#333] border rounded-lg p-3">
                      <button className="btn border-success bg-transparent text-white fw-bold fs-3">
                        <Link to={`${plan.payment_link_ars}`+`?planId=${plan._id}`}>
                          Comprar como Argentino{" "}
                        </Link>
                      </button>
                      <button className="btn border-success bg-transparent text-white fw-bold fs-3">
                        <Link to={`${plan.payment_link_usd}`+`?planId=${plan._id}`}>
                          Comprar como Extranjero{" "}
                        </Link>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
<div className="col-lg-12 text-center mt-4">
{isAdmin === true && (
                      <span className="course-admin-options opacity-50 space-x-5">
                        <button className="btn border-neutral-600   bg-transparent p-2">
                          <p>
                            <a
                              className="text-muted"
                              href={`/plans/update/${plan._id}`}
                            >
                              <i className="fas fa-edit me-2 mx-2">Editar</i>
                            </a>
                          </p>
                        </button>
                        <button className="btn border-neutral-600   bg-transparent p-2" onClick={handleDelete}>
                          <p>
                            <i className="fas fa-trash-alt me-2 text-danger">Borrar</i>
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
