import React, { useState } from "react";
import axios from "axios";
// alerts
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../public/css/auth/forgotPassword.css"; // Import your custom CSS file for styling
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:2020/api/auth/forgot-password",
        { email }
      );
      console.log(response.data);
      setError("");
      if (response.status === 200) {
        console.log("email sent");
        toast.success("📫Correo enviado, mira tu casilla");
      } else {
        console.error("email error");
        toast.error("📫Correo error");
      }
    } catch (error) {
      console.error("Error sending reset email:", error.response.data);
      setError(
        error.response.data.error ||
          "An error occurred while sending the reset email."
      );
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div className="forgot-password-wrapper">
      <div className="forgot-password-container">
        <h2 className="section-title">Olvidé contraseña</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="Tu Correo Electronico"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Enviar reset
          </button>
          <p>
            Ya tengo una cuenta{" "}
            <Link to="/login" className="text-info">
              Ingresar
            </Link>
          </p>
        </form>
        {error && <p className="error-msg">{error}</p>}
        <ToastContainer /> {/* Toast notifications container */}
      </div>
    </div>
  );
};

export default ForgotPassword;
