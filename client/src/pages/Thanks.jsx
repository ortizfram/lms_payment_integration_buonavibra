import React, { useContext } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";
import AuthContext from "../context/AuthContext";

function Thanks() {
  const { currentUser } = useContext(AuthContext);

  const asignMPandGoCourses = async () => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/membership/success-mp`,
        { uid: currentUser._id }
      );
      const redirectUrl = response.data.redirectUrl;
      console.log("Redirect URL:", redirectUrl);
      window.location.href = redirectUrl;
    } catch (error) {
      console.error("Error assigning plan to user:", error);
    }
  };

  return (
    <div className="text-center mt-[40vh]">
      ❤️✨ Gracias por tu compra ✨❤️
      <br />
      <button
        onClick={asignMPandGoCourses}
        className="text-white bg-success text-center p-3 rounded-lg mt-3"
      >
        Ir a Cursos
      </button>
    </div>
  );
}

export default Thanks;
