import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import { BACKEND_URL } from "../../config.js";
// alerts
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LogoutBtn() {
  // call auth context function & get token from cookie
  const { getLoggedIn } = useContext(AuthContext);
  let navigate = useNavigate();

  async function logout() {
    // return empty cookie
    const logoutRes = await axios.get(`${BACKEND_URL}/api/auth/logout`);
    if (logoutRes.status === 200) {
      console.log("logged out successfully");
      toast.success("Saliste de tu cuenta");
      await getLoggedIn(); // refresh boolean
      setTimeout(() => {
        navigate(`/#/`);
      }, 2000);
    }
    await getLoggedIn(); // refresh boolean
  }
  return (
    <>
      <button
        onClick={logout}
        className="border rounded-md p-2 border-white text-white"
      >
        Salir
      </button>
    </>
  );
}

export default LogoutBtn;
