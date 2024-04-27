import { useContext } from "react";
import "../public/css/navigation.css";
import AuthContext from "../context/AuthContext.jsx";
import { Link } from "react-router-dom";

// NodeJS endpoint reference
const URI = "http://localhost:2020"; // Update the base URL

const Navbar2 = () => {
  const { loggedIn, currentUser } = useContext(AuthContext);
  let user = currentUser;

  return (
    <>
      <header className="header shadow-lg">
        <a href="/" className="logo">
          <img src="/images/home/white-logo-buonavibra.png" alt="" />
        </a>

        <input type="checkbox" id="check" />
        <label htmlFor="check" className="icons">
          <i className="bx bx-menu" id="menu-icon"></i>
          <i className="bx bx-x" id="close-icon"></i>
        </label>

        <nav className="navbar">
          {/* isAdmin Div message*/}
          {currentUser && currentUser.isAdmin === true && (
            <div
              style={{
                backgroundColor: "blue",
                color: "white",
                padding: "1px",
                marginRight: "5px",
                marginBottom: "10px",
                width: "100%",
                textAlign: "center",
              }}
            >
              Estás en cuenta admin, {currentUser.username}
            </div>
          )}

          {/* No Restriction */}
          <Link to={"/"} style={{ "--i": 0 }}>
            Inicio
          </Link>
          <Link to={"/#contact"} style={{ "--i": 1 }}>
            Contacto
          </Link>
          <Link to={"/about"} style={{ "--i": 2 }}>
            About
          </Link>
          <Link to={"/course/all"} style={{ "--i": 3 }}>
            Courses
          </Link>

          {/* Basic links */}
          <a href="/#about1" style={{ "--i": 2 }}>
            Acerca
          </a>

          {/* Dropdown for Courses and Blogs */}
          <div className="dropdown">
            <a href="#" className="dropdown-toggle" role="button">
              Cursos y Blogs
            </a>
            <div className="dropdown-menu">
              <a href="/api/courses?page=1&perPage=6" style={{ "--i": 3 }}>
                Cursos
              </a>
              <a href="/api/blog?page=1&perPage=6" style={{ "--i": 4 }}>
                Blogs
              </a>
            </div>
          </div>

          {/* isLogged */}
          {loggedIn === true && (
            <>
              {/* dont show for Admin, course he has adminPreview function */}
              {currentUser && currentUser.isAdmin === false && (
                <>
                  <Link to={"/course/library"} style={{ "--i": 5 }}>
                    Biblioteca
                  </Link>
                </>
              )}

              {/* isAdmin */}
              {currentUser && currentUser.isAdmin === true && (
                <div className="dropdown">
                  <a href="#" className="dropdown-toggle" role="button">
                    Admin
                  </a>
                  <div className="dropdown-menu">
                    <Link to={"/course/create"} style={{ "--i": 6 }}>
                      crear Courso
                    </Link>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Not LoggedIn */}
          {loggedIn === false && (
            <>
              <a
                href="/login"
                style={{
                  "--i": 7,
                  border: "2px solid white",
                  borderRadius: "10%",
                  padding: "8px",
                }}
              >
                Ingresar
              </a>
              <a
                href="/register"
                style={{
                  "--i": 8,
                  border: "2px solid white",
                  borderRadius: "10%",
                  padding: "8px",
                }}
              >
                Registrar
              </a>
            </>
          )}
        </nav>
      </header>
    </>
  );
};

export default Navbar2;
