import React, { useContext, useEffect } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";
import AuthContext from "../context/AuthContext";
// alerts
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Thanks() {
  const { currentUser } = useContext(AuthContext);
  const user_id = currentUser?.["_id"];
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");
  const type = urlParams.get("type");

  //get id and type from params

  const asignMPandGoCourses = async () => {
    console.log("button triggered");
    try {
      const response = await fetch(`${BACKEND_URL}/api/membership/success-mp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id, id, type }),
      });
      if (response.ok) {
        toast.success("Gracias, dirigiendo a Cursos");
        // const redirectUrl = response.data;
        setTimeout(() => {
          window.location.href = `/course/all?q=${id}`;
        }, 200);
      } else {
        console.error("Failed to send data to backend.");
      }
    } catch (error) {
      console.error("Error assigning plan to user:", error);
    }
  };
  const asignPPandGoCourses = async () => {
    console.log("button triggered");
    try {
      const response = await fetch(`${BACKEND_URL}/api/membership/success-pp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id, id, type }),
      });
      if (response.ok) {
        toast.success("Gracias, dirigiendo a Cursos");
        // const redirectUrl = response.data;
        setTimeout(() => {
          window.location.href = `/course/all?q=${id}`;
        }, 200);
      } else {
        console.error("Failed to send data to backend.");
      }
    } catch (error) {
      console.error("Error assigning plan to user:", error);
    }
  };

  return (
    <div className="text-center mt-[40vh]">
      ❤️✨ Gracias por tu compra ✨❤️
      <br />
      <button
        onClick={type === "mp" ? asignMPandGoCourses : asignPPandGoCourses}
        className="text-white bg-success text-center p-3 rounded-lg mt-3"
      >
        Ir a Cursos
      </button>
    </div>
  );
}

export default Thanks;
