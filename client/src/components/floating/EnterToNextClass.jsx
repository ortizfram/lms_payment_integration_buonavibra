import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EnterToNextClassBubble() {
  const [showButton, setShowButton] = useState(false);

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

  const closeButtonClicked = () => {
    setShowButton(true);
  };

  return (
    <>
      {!showButton && (
        <div className="fixed bottom-0 left-0 right-0 m-3 rounded-lg shadow-2xl bg-white z-50 md:left-1/2 md:transform md:-translate-x-1/2 md:max-w-md text-center">
          <button
            className="btn fw-bolder fs-6 text-[#333] p-2 rounded-circle absolute top-0 right-0 ml-8 bg-white"
            onClick={closeButtonClicked}
          >
            X
          </button>
          <div className="p-4">
            <p className="fw-bold text-[#333] mb-3">
              🧘🏼‍♀️Reservá aquí tu proxima meditación🧘🏼‍♀️
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
        >
          ❤️
        </button>
      )}
      <ToastContainer />
    </>
  );
}

export default EnterToNextClassBubble;
