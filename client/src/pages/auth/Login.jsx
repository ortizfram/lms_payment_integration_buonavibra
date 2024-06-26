import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../../public/css/auth/login.css";
import { BACKEND_URL } from "../../config.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { getLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const location = useLocation();
  const prevUrl = location.state?.prevUrl?.pathname || location.state?.prevUrl || "/";

  useEffect(() => {
    console.log("prevUrl", prevUrl);
  }, []);

  async function login(e) {
    e.preventDefault();
    try {
      const loginData = { email, password };
      const loginRes = await axios.post(`${BACKEND_URL}/api/auth/login`, loginData);
      if (loginRes.status === 200) {
        console.log("Login successful");
        await getLoggedIn();
        setTimeout(() => {
          navigate(prevUrl);
        }, 2000);
      }
    } catch (error) {
      console.error(error);
      toast.error("Login failed");
    }
  }

  return (
    <div className="login-page-container d-flex justify-content-center align-items-center vh-70">
      <div className="login-container text-center">
        <h1 className="login-title section-title ft-roboto">Ya soy usuario</h1>
        <form onSubmit={login}>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="form-control"
            />
          </div>
          <button type="submit" className="ft-roboto   btn btn-primary fw-bold">
            Ingresar con mi cuenta
          </button>
          <div className="link-container mt-3">
            <p>
              Olvidaste tu contraseña? <Link to="/forgot-password">Recuperar</Link>
            </p>
              <hr/>
            <p className="text-center d-flex flex-col align-items-center section-title">
              <Link to="/register" className="fw-bold bg-success text-white btn btn-success btn-lg ft-roboto" state={{ prevUrl }}>Crear cuenta</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
