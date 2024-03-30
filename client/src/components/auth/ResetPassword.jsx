import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../../public/css/auth/resetPassword.css"
// alerts
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResetPassword = () => {
  const { id, token } = useParams();
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleResetPasswordSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:2020/api/auth/reset-password/${id}/${token}`,
        { password, repeat_password: repeatPassword }
      );

      if (response.status === 200) {
        setMessage(response.data.message);
        // Handle success, e.g., redirect or show a success message
        console.log("password updated");
        toast.success("⚙️ Contraseña actualizada. Ahora ingresa");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setMessage(
          response.data.error || "Unexpected response format. Please try again."
        );
      }
    } catch (error) {
      setMessage(
        "An error occurred while processing the request. Please try again."
      );
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    console.log("ID:", id);
    console.log("Token:", token);
  }, [id, token]);

  return (
    <div id="reset-password-container" style={{ margin: "6.2rem auto" }}>
      <h1 className="section-title">Nueva Contrasena</h1>
      <h1 className="text-xl">id:{id}</h1>
      <h1 className="text-xl">token:{token}</h1>
      <form onSubmit={handleResetPasswordSubmit}>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Nueva Contrasena"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <input
          type="password"
          id="repeat-password"
          name="repeat-password"
          placeholder="Repite Contrasena"
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
        />
        <br />
        <button type="submit">Enviar</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ResetPassword;
