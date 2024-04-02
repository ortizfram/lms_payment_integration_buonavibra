import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import "../public/css/home/home.css";
// alerts
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BACKEND_URL } from "../config";

// NodeJS endpoint reference

const Home = () => {
  const { currentUser, loggedIn } = useContext(AuthContext);

  const me_about_img_style = {
    maxWidth: "300px",
    height: "auto",
  };

  // mail form data declaration
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {}, []);

  // Fetch Home
  const getHome = async () => {
    try {
      await axios.get(`${BACKEND_URL}`); //  endpoint
    } catch (error) {
      console.error("Error fetching Home:", error);
    }
  };

  useEffect(() => {
    console.log("BACKEND_URL ", import.meta.env.BACKEND_URL);
  }, [BACKEND_URL]);

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
    <>
      <div className="home-page-container">
        {/* <!-- hero --> */}
        <div className="hero-container home-hero">
          <img
            className="hero-logo"
            src="/images/home/white-logo-buonavibra.png"
            alt=""
          />
        </div>

        {/* <!-- about --> */}
        <div className="container about" id="about1">
          <h1 className="section-title">Acerca de.</h1>

          <div className="row">
            <div className="col-md-6 text-center">
              <img
                src="images/home/me-about.jpg"
                style={me_about_img_style}
                className="shadow-2xl rounded-circle w-100"
                alt="Marcela Marzetti Gimenez"
              />
              <h3 className="mt-3 font-weight-bold highlight-txt">
                Marcela Marzetti
              </h3>
            </div>
            <div className="col-md-6 text-center">
              <p className="text-xl">
                <span>
                  ¡Bienvenido/a a mi página web!
                  <br />
                  <br />
                </span>
                Mi nombre es Marcela Marzetti y soy una persona como tú,
                transitando esta experiencia humana aquí en la Tierra. Soy
                licenciada en administración de empresas y he dedicado gran
                parte de mi vida a gestionar negocios. Sin embargo, mi camino me
                llevó al yoga kundalini, una práctica que transformó mi vida y
                me permitió conectar con mi propia sabiduría interna y mi gurú
                interno. En estos tiempos de incertidumbre y cambios constantes,
                el yoga kundalini es una herramienta poderosa para gestionar
                nuestras energías y conectarnos con nuestro corazón y nuestra
                alma. A través de esta práctica, podemos activar nuestra magia
                interna y vivir en un estado de salud, felicidad, dicha, amor,
                gratitud, alegría, abundancia, paz y prosperidad. Mi intención
                es acompañarte en este camino de autodescubrimiento y ayudarte a
                conectar con tu propio gurú interno, esa sabiduría interna que
                te guía y te permite obtener tu auto-maestría. Juntos, podemos
                abrir la puerta al campo ilimitado de infinitas posibilidades y
                concretar todas tus intenciones para vivir en un estado de
                armonía. ¡Te invito a explorar mi página web y descubrir cómo
                puedo ayudarte en este camino de crecimiento personal!
              </p>
            </div>
          </div>
        </div>

        {/* <!-- contact --> */}
        <div
          id="contact"
          className="bg-cover bg-center bg-brightness-50 py-6 h-50vh mt-310px md:m-auto md:mt-50px"
        >
          <div className="">
            <div className="">
              <h1 className="section-title italic font-bold text-white text-3xl">
                Contacto.
              </h1>

              {/* <!-- Row for contact icons --> */}
              <div className="row mt-4 container">
                <div className="col backdrop-filter p-4 rounded mx-auto d-flex justify-content-between">
                  <div className="list-unstyled d-flex justify-content-between">
                    <a href="https://wa.me/2615996913" target="_blank">
                      <img
                        className="icon w-10 "
                        src="images/home/whatsapp-white-icon.png"
                        alt="WhatsApp"
                      />
                    </a>
                    <a
                      href="https://www.instagram.com/buonavibra_?igsh=MWR5NDhiZHd3MjY5MA=="
                      target="_blank"
                    >
                      <img
                        className="icon w-10"
                        src="images/home/instagram-white-icon.png"
                        alt="Instagram"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* <!-- contact form --> */}
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
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
