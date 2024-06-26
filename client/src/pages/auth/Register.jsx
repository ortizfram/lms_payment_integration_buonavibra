import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../../public/css/auth/register.css";
import { BACKEND_URL } from "../../config.js";

function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVerify, setPasswordVerify] = useState("");

  const location = useLocation();
  const prevUrl = location.state?.prevUrl?.pathname||location.state?.prevUrl || "/";

  const { getLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(()=>{
    console.log("prevUrl", prevUrl)
  })

  async function register(e) {
    e.preventDefault();
    try {
      const registerData = { email, username, password, passwordVerify };
      await axios.post(`${BACKEND_URL}/api/auth/signup`, registerData);
      await getLoggedIn();
      navigate(prevUrl);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="register-page-container ">
      <div className="register-container">
        <h1 className="register-title section-title ft-roboto">Registrar</h1>
        <form onSubmit={register}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Nombre de usuario"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              placeholder="Correo electronico"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Contraseña"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Repite contraseña"
              onChange={(e) => setPasswordVerify(e.target.value)}
              value={passwordVerify}
              className="form-control"
            />
          </div>
          <button type="submit" className="ft-roboto btn btn-primary">
            Registrar
          </button>
          <p>
            Ya tengo una cuenta{" "}
            <Link to="/login" className="text-info">
              Ingresar
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
