import React, { useContext, useState } from "react";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import "../../public/css/auth/login.css"; // Import your custom CSS file for styling
import { BACKEND_URL } from "../../config.js";
// alerts
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { getLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  async function login(e) {
    e.preventDefault();
    try {
      const loginData = { email, password };
      const loginRes = await axios.post(
        `${BACKEND_URL}/api/auth/login`,
        loginData
      );
      if (loginRes.status === 200) {
        console.log("Hola Nuevamente");
        toast.success("Hola Nuevamente");
        await getLoggedIn();
        setTimeout(() => {
          navigate(`/`);
        }, 2000);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="login-page-container">
      <div className="login-container">
        <h1 className="login-title section-title">Ingresar</h1>
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
          <button type="submit" className="btn btn-primary">
            Login
          </button>
          <div className="link-container">
            <p>
              Olvidate tu contraseña?{" "}
              <Link to="/forgot-password">Recuperar</Link>
            </p>
            <p>
              Sin cuenta aún? <Link to="/register">Registrar</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
