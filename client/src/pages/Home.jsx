import axios from "axios";
import { useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";
import "../public/css/home/home.css";
import { BACKEND_URL, isDev } from "../config.js";
import ContactForm from "../components/contactForm/ContactForm.jsx";


const Home = () => {
  const { currentUser, loggedIn } = useContext(AuthContext);

  const me_about_img_style = {
    maxWidth: "300px",
    height: "auto",
  };

  // Fetch Home
  const getHome = async () => {
    try {
      await axios.get(`${BACKEND_URL}`); //  endpoint
    } catch (error) {
      console.error("Error fetching Home:", error);
    }
  };

  useEffect(() => {
    // console.log("BACKEND_URL ", BACKEND_URL);
    // console.log("BACKEND_URL ", BACKEND_URL);
    console.log("isDev ", isDev);
  }, []);

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
        <div className="container about px-4" id="about1">
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
                <div className="col backdrop-filter p-4 rounded mx-auto d-flex justify-content-between items-center text-center align-middle">
                  <div className="list-unstyled d-flex justify-content-between items-center text-center align-middle">
                    <a href="https://wa.me/2615996913" target="_blank" className="mr-8">
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
            <ContactForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
