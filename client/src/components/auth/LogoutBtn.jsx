import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import { BACKEND_URL } from "../../config.js";

 function LogoutBtn() {
  // call auth context function & get token from cookie
  const { getLoggedIn } = useContext(AuthContext);
  let  navigate= useNavigate();

    
  async function logout() {
    // return empty cookie
    await axios.get(`${BACKEND_URL}/api/auth/logout`);
    await getLoggedIn(); // refresh boolean
    navigate('/')
  }
  return (<><button onClick={logout} className="border rounded-md p-2 border-white">Salir</button></>);
}

export default LogoutBtn;
