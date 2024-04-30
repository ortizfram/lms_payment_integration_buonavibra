import React, { useContext } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";
import AuthContext from "../context/AuthContext";

async function Thanks() {
  const { currentUser } = useContext(AuthContext);

  //thanks?type=&id=&uid=
  const asignMPandGoCourses = async () => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/membership/success-mp`,
        { uid: currentUser._id } // Pass currentUser._id as data
      );
      const redirectUrl = response.data.redirectUrl; ///course/all?q=${planId}
      console.log("Redirect URL:", redirectUrl);
      window.location.href = redirectUrl;
    } catch (error) {
      console.error("Error assigning plan to user:", error);
    }
  };
  return (
    <>
      <div className="text-center mt-[40vh]">
        ❤️✨ Gracias por tu compra ✨❤️
      </div>
      <div>
        <button
          onClick={asignMPandGoCourses}
          className="text-white bg-success text-center"
        >
          Ir a Cursos
        </button>
      </div>
    </>
  );
}

export default Thanks;
