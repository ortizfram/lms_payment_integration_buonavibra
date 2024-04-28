import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../config";
// alerts
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ContactForm() {

  // mail form data declaration
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();


  // send contact Email
  const sendEmail = async (e) => {
    try {
      e.preventDefault();
      const resContactForm = await axios.post(`${BACKEND_URL}/api/send-email`, {
        name: name,
        email: email,
        msg: msg,
      }); //  endpoint
      if (resContactForm.status === 200) {
        console.log("Email sent");
        toast.success("📫Correo Enviado");
         // Clear form fields
         setName("");
         setEmail("");
         setMsg("");
        setTimeout(() => {
          navigate(`/`);
        }, 1000);
      } else {
        console.error("Email error");
        toast.error("📫Correo Error");
      }
    } catch (error) {
      console.error("Error sending Email:", error);
    }
  };


  return (
    <div className="row mt-4">
      <div className="col rounded">
        <form onSubmit={sendEmail}>
          {" "}
          {/* /send-email */}
          <h3 className="highlight-txt mb-3 text-center text-white">
            Contactar por Email.
          </h3>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              placeholder="Nombre completo"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Tu Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <textarea
              className="form-control"
              id="msg"
              rows="3"
              placeholder="Deja tu mensaje..."
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary">
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}

export default ContactForm;
