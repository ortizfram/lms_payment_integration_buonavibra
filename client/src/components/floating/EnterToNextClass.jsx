import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EnterToNextClassBubble() {
  const [showButton, setShowButton] = useState(true); // Start in the closed state

  const notify = () => {
    toast.success("🌟 Satnam");
    setTimeout(() => {
      window.location.href = "https://mpago.la/2PvvFYi";
    }, 2000);
  };
  const notifyOther = () => {
    toast.success("🌟 Satnam");
    setTimeout(() => {
      window.location.href = "https://www.paypal.com/ncp/payment/P3WQXWRWFUQYS";
    }, 2000);
  };

  const toggleButton = () => {
    setShowButton(!showButton);
  };

  return (
    <>
      {!showButton && (
        <div className="fixed bottom-0 left-0 right-0 m-3 rounded-lg shadow-2xl bg-white z-50 md:left-1/2 md:transform md:-translate-x-1/2 md:max-w-sm text-center" style={{ maxWidth: "350px" }}>
          <a
            className="absolute top-0 right-0 m-2 text-danger"
            onClick={toggleButton}
            style={{ fontSize: "1.5rem", fontWeight:"bold", cursor: "pointer" }} // Smaller, red close button
          >
            X
          </a>
          <div className="p-1">
            <p className="fw-bold text-[#333] mb-3">
            Reservá 1 cupo en la medi de hoy
            </p>
            <div className="flex flex-col md:flex-row justify-center items-center gap-3">
              <button onClick={notify} className="btn border bg-info text-white w-full md:w-auto">
                🇦🇷 Argentino
              </button>
              <button onClick={notifyOther} className="btn border border-info bg-white text-info w-full md:w-auto">
                🌍otro
              </button>
            </div>
          </div>
        </div>
      )}
      {showButton && (
        <button
          className="btn border border-danger z-50 bg-white fixed bottom-0 right-0 m-3 p-3 rounded-circle shadow"
          onClick={toggleButton}
          style={{ fontSize: "2rem" }} // Increase the size of the button for better visibility
        >
          ❤️
        </button>
      )}
      <ToastContainer />
    </>
  );
}

export default EnterToNextClassBubble;
