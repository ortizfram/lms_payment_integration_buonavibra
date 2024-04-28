import React from "react";
import "../../public/css/loader.css";

function Loader() {
  return (
    <div
      className="container min-w-[100vw] d-flex justify-content-center align-items-center bg-[#333]"
      style={{ minHeight: "100vh" }}
    >
      <div className="loader">
        <div className="circular"></div>

        <img
          src="/images/home/white-logo-buonavibra.png"
          alt="buonavibra.com.ar"
          
        />
      </div>
    </div>
  );
}

export default Loader;
