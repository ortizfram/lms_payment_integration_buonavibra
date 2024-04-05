import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import "../public/css/course/courseEnroll.css";
import AuthContext from "../context/AuthContext";
import { BACKEND_URL } from "../config.js";
import axios from "axios";
// alerts
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CourseEnroll = () => {
  const { currentUser } = useContext(AuthContext);
  const user = currentUser;
  const [course, setCourse] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/course/${id}`);

        if (response.status === 200) {
          setCourse(response.data.course);
        } else {
          console.error("Failed to fetch course data");
        }
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    };

    fetchCourse();
  }, [id]);

  if (!course) {
    return <div>Loading...</div>;
  }

  const renderPrice = () => {
    // * DISCOUNT for USD * \\
    if (course.discount_usd > 0 && !course.discount_ars) {
      return (
        <>
          <del className="text-success">USD {course.usd_price}</del>
          <p>
            <span className="text-success">
              USD{" "}
              {course.usd_price -
                (course.usd_price * course.discount_usd) / 100}
            </span>{" "}
            | ARS {course.ars_price}
          </p>
        </>
      );
    }
    // * DISCOUNT for ARS * \\
    else if (course.discount_ars > 0 && !course.discount_usd) {
      return (
        <>
          <span className="text-xs fw-lighter">
            USD {course.usd_price} |{" "}
            <del className="text-success">ARS {course.ars_price}</del>
          </span>
          <p>
            USD {course.usd_price} |{" "}
            <span className="text-success">
              ARS{" "}
              {course.ars_price -
                (course.ars_price * course.discount_ars) / 100}
            </span>
          </p>
        </>
      );
    }
    // * DISCOUNT for both ARS and USD * \\
    else if (course.discount_ars >= 1 && course.discount_usd >= 1) {
      return (
        <>
          <span className="text-success">
            <span className="text-xs fw-lighter">
              USD <del>{course.usd_price}</del> | ARS{" "}
              <del>{course.ars_price}</del>
            </span>
            <p className="text-success">
              USD{" "}
              {course.usd_price -
                (course.usd_price * course.discount_usd) / 100}{" "}
              | ARS{" "}
              {course.ars_price -
                (course.ars_price * course.discount_ars) / 100}
            </p>
          </span>
        </>
      );
    }
    // * NO-DISCOUNT * \\
    else {
      return (
        <>
          USD {course.usd_price} | ARS {course.ars_price}
        </>
      );
    }
  };

  const handlePaypalOrder = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/order/create-order-paypal?courseId=${id}&userId=${user._id}`
      );

      // Extract the approval link from the response data
      const approvalLink = response.data.approvalLink;

      window.location.href = approvalLink;
    } catch (error) {
      throw new Error("Error creating PayPal order:", error);
    }
  };
  const handleMercadoPagoOrder = async () => {
    try {
      await axios.post(
        `${BACKEND_URL}/api/order/create-order-mp?courseId=${id}&userId=${user._id}`
      );
      setTimeout(() => {
        toast.success("↪️Redirigiendo a pagar con MercadoPago");
      }, 2000);
    } catch (error) {
      throw new Error("Error creating MercadoPago order:", error);
    }
  };

  return (
    <>
      <div className="enroll-page-container">
        <div className="page-container">
          <div className="course-overview">
            <div className="section-title2 mt-4 mb-4">
              <h1>Detalles de Pago</h1>
            </div>
            {/* Payment Details */}
            <img
              className="mb-4 h-[12vh] mx-auto"
              src={`${BACKEND_URL}${course.thumbnail}`}
              alt={`${course.title} Image`}
            />
            <h2>{course.title}</h2>
            <p className="text-black">{course.description}</p>
            <span className="">
              <span className="row align-items-center text-muted">
                <span>instructor:</span>
                <div className="col-auto">
                  <img
                    src={course.author.avatar}
                    alt="User Avatar"
                    className="rounded-circle me-2"
                    style={{
                      width: "25px",
                      height: "25px",
                      objectFit: "cover",
                    }}
                  />
                  <span>
                    {course.author.username} • {course.author.email}
                  </span>
                </div>
              </span>
            </span>

            <p className="price-text border border-success rounded p-1">
              {renderPrice()}
            </p>
          </div>

          <div className="payment-options mt-2">
            {/* PAY WITH PAYPAL */}
            <form onSubmit={handlePaypalOrder}>
              <button type="submit">
                <img src="/images/paypal.png" alt="paypal-icon" />
                <p>Continue with Paypal</p>
              </button>
            </form>

            {/* PAY WITH MP */}
            <form onSubmit={handleMercadoPagoOrder}>
              <button type="submit">
                <img src="/images/mercado-pago.png" alt="mercado-pago-icon" />
                <p>Continue with Mercado Pago</p>
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseEnroll;
