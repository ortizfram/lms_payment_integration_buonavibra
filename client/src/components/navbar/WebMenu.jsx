import React, { useState } from "react";
import { Link } from "react-router-dom";
import LogoutBtn from "../../components/auth/LogoutBtn";

function WebMenu({ currentUser, loggedIn }) {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const closeMenu = () => {
    setShowMenu(false);
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-w-[100vw]" style={{ zIndex: 1000 }}>
      {/* {currentUser && currentUser.isAdmin === true && (
        <div className=" bg-info text-center">
          Estás en cuenta admin, {currentUser.username}
        </div>
      )} */}

      <div style={styles.navbar} className="navbar-container">
        {/* Menu Desktop */}
        <div style={styles.navLinks}>
          <Link to={"/"} style={styles.link} onClick={closeMenu}>
            <img
              className="h-15 w-20"
              src="/images/home/white-logo-buonavibra.png"
              alt=""
            />
          </Link>
          {/* Menu Desktop Links */}
          <div className="hidden md:block fs-4">
            <a href="/" style={styles.link} onClick={closeMenu}>
              Inicio
            </a>
            {/* <a href="/#about1" style={styles.link} onClick={closeMenu}>
              Acerca
            </a> */}
            {/* <a href="/#contact" style={styles.link} onClick={closeMenu}>
              Contacto
            </a> */}

            {loggedIn === false && (
              <>
                <Link to={"/login"} style={styles.link} onClick={closeMenu}>
                  Cursos
                </Link>
                <Link to={"/login"} style={styles.link} onClick={closeMenu}>
                  Clases de Yoga y Meditacion
                </Link>
                {/* <Link
                  to={"/register"}
                  style={styles.link}
                  className="border rounded-md p-2 border-white"
                  onClick={closeMenu}
                >
                  Registrar
                </Link> */}
                <Link
                  to={"/login"}
                  style={styles.link}
                  className="border rounded-md p-2 border-white"
                  onClick={closeMenu}
                >
                  Ingresar
                </Link>
              </>
            )}

            {loggedIn === true && (
              <>
                <Link
                  to={"/course/all"}
                  style={styles.link}
                  onClick={closeMenu}
                >
                  Cursos
                </Link>
                <Link to={"/plans"} style={styles.link} onClick={closeMenu}>
                  Clases de Yoga y Meditacion
                </Link>
                {/* {currentUser && currentUser.isAdmin === false && (
                  <Link
                    to={"/course/library"}
                    style={styles.link}
                    onClick={closeMenu}
                  >
                    Biblioteca
                  </Link>
                )} */}

                {currentUser && currentUser.isAdmin === true && (
                  <>
                    <Link
                      to={"/course/create"}
                      style={styles.link}
                      onClick={closeMenu}
                    >
                      Crear Curso
                    </Link>
                    <Link
                      to={"/plans/create"}
                      style={styles.link}
                      onClick={closeMenu}
                    >
                      Nuevo Plan
                    </Link>
                  </>
                )}
                <LogoutBtn />
              </>
            )}
          </div>
        </div>

        {/* Hamburger menu icon */}
        <div className="mr-3 pr-3 d-block d-md-none">
          <button onClick={toggleMenu} style={styles.hamburger}>
            &#9776;
          </button>
        </div>
      </div>

      {/* Menu Hamburger Links*/}
      {showMenu && (
        <div className="lg:hidden mt-10" style={styles.mobileMenu}>
          <div className="mobileMenuLinks container text-center fs-3 ">
            <Link to={"/"} style={styles.mobileLink} onClick={closeMenu}>
              Inicio
            </Link>
            {/* <Link to={"/#about1"} style={styles.mobileLink} onClick={closeMenu}>
              About
            </Link>
            <Link to={"/#contact"} style={styles.mobileLink} onClick={closeMenu}>
              Contact
            </Link> */}

            {loggedIn === false && (
              <>
                <Link
                  to={"/login"}
                  style={styles.mobileLink}
                  onClick={closeMenu}
                >
                  Clases de Yoga y Meditacion
                </Link>
                <Link
                  to={"/login"}
                  style={styles.mobileLink}
                  onClick={closeMenu}
                >
                  Cursos
                </Link>
                {/* <Link
                  to={"/register"}
                  style={styles.mobileLink}
                  className="border rounded-md p-2 border-white"
                  onClick={closeMenu}
                >
                  Registrar
                </Link> */}
                <Link
                  to={"/login"}
                  style={styles.mobileLink}
                  className="border rounded-md p-2 border-white"
                  onClick={closeMenu}
                >
                  Ingresar
                </Link>
              </>
            )}

            {loggedIn === true && (
              <>
                <Link
                  to={"/course/all"}
                  style={styles.mobileLink}
                  onClick={closeMenu}
                >
                  Cursos
                </Link>
                <Link
                  to={"/plans"}
                  style={styles.mobileLink}
                  onClick={closeMenu}
                >
                  Clases de Yoga y Meditacion
                </Link>
                {/* {currentUser && currentUser.isAdmin === false && (
                  <>
                    <Link
                      to={"/course/library"}
                      style={styles.mobileLink}
                      onClick={closeMenu}
                    >
                      Biblioteca
                    </Link>
                  </>
                )} */}

                {currentUser && currentUser.isAdmin === true && (
                  <>
                    <Link
                      to={"/course/create"}
                      style={styles.mobileLink}
                      onClick={closeMenu}
                    >
                      Crear Curso
                    </Link>
                    <Link
                      to={"/plans/create"}
                      style={styles.mobileLink}
                      onClick={closeMenu}
                    >
                      Nuevo Plan
                    </Link>
                  </>
                )}
                <LogoutBtn />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default WebMenu;

const styles = {
  navbar: {
    backgroundColor: "#333",
    color: "#fff",
    padding: "10px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: "1000",
  },
  adminMessage: {
    backgroundColor: "blue",
    color: "white",
    padding: "10px",
    marginBottom: "10px",
    textAlign: "center",
  },
  navLinks: {
    display: "flex",
    alignItems: "center",
  },
  link: {
    textDecoration: "none",
    color: "#fff",
    padding: "10px",
    margin: "0 5px",
  },
  hamburger: {
    background: "none",
    border: "none",
    color: "#fff",
    fontSize: "2.5rem",
    cursor: "pointer",
  },
  mobileMenu: {
    backgroundColor: "#333",
    position: "absolute",
    top: "60px", // Adjust as needed
    left: 0,
    width: "100%",
    padding: "10px",
    boxSizing: "border-box",
    zIndex: 999,
  },
  mobileLink: {
    display: "block",
    color: "#fff",
    textDecoration: "none",
    padding: "10px",
    margin: "5px 0",
  },
};
