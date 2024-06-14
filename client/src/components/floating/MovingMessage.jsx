import React from "react";

const MovingText = () => {
  return (
    <div
      style={{
        position: "fixed",
        bottom: "3px",
        left: "0",
        width: "100vw", // Full width of the screen
        backgroundColor: "red",
        padding: "3px",
        color: "white",
        fontSize: "14px",
        whiteSpace: "nowrap",
        overflow: "hidden",
        animation: "moveText 20s linear infinite", // Adjust animation duration as needed
      }}
    >
      <span style={{ display: "inline-block",}}>
        Reserva un cupo individual para mi próxima clase presencial / virtual
        tocando el corazon y eligiendo segun tu nacionalidad
      </span>
    </div>
  );
};

export default MovingText;
