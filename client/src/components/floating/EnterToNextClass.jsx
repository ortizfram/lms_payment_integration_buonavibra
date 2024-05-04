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

  const toggleButton = () => {
    setShowButton(!showButton);
  };

  const closeButtonClicked = () => {
    setShowButton(true);
  };

  return (
    <>
      {!showButton && (
        <div className="position-fixed bottom-0 start-50 translate-middle-x m-3 rounded-lg shadow bg-white z-50">
          <button
            className="btn border border-danger p-2 rounded-circle position-absolute top-0 end-0 ml-8 bg-white"
            onClick={closeButtonClicked}
          >
            ❌
          </button>
          <button
            className="btn bg-white text-black border border-danger rounded-lg mr-10  w-full"
            onClick={notify}
          >
            ❤️Anotate a mi siguiente clase❤️
          </button>
        </div>
      )}
      {showButton && (
        <button
          className="btn border border-danger z-50 bg-white position-fixed bottom-0 end-0 m-3 p-3 rounded-circle shadow"
          onClick={toggleButton}
        >
          ❤️
        </button>
      )}
    </>
  );
}

export default EnterToNextClassBubble;
