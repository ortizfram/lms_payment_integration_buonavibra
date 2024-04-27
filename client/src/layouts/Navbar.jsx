import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import LogoutBtn from "../components/auth/LogoutBtn";
import "../public/css/layout/navbar.css"

function Navbar() {
  const { loggedIn, currentUser } = useContext(AuthContext);

  return (
    <div className="min-w-[100vw]" style={{ zIndex: 1000 }}>
      {currentUser && currentUser.isAdmin === true && (
        <div className=" bg-info text-center">
          Estás en cuenta admin, {currentUser.username}
        </div>
      )}

      <div style={styles.navbar} className="navbar-container">
        <div style={styles.navLinks}>
          <Link to={"/"} style={styles.link}>
            <img
              className="h-15 w-20"
              src="/images/home/white-logo-buonavibra.png"
              alt=""
            />
          </Link>
          <a href="/#about1" style={styles.link}>
            Acerca
          </a>
          <a href="/#contact" style={styles.link}>
            Contacto
          </a>
          <a href="/membership" style={styles.link}>
            Subcripcion
          </a>

          {loggedIn === false && (
            <>
              <Link to={"/login"} style={styles.link}>
                Cursos
              </Link>
              <Link
                to={"/register"}
                style={styles.link}
                className="border rounded-md p-2 border-white"
              >
                Registrar
              </Link>
              <Link
                to={"/login"}
                style={styles.link}
                className="border rounded-md p-2 border-white"
              >
                Ingresar
              </Link>
            </>
          )}

          {loggedIn === true && (
            <>
              <Link to={"/course/all"} style={styles.link}>
                Cursos
              </Link>
              {currentUser && currentUser.isAdmin === false && (
                <Link to={"/course/library"} style={styles.link}>
                  Biblioteca
                </Link>
              )}

              {currentUser && currentUser.isAdmin === true && (
                <>
                  <Link to={"/course/create"} style={styles.link}>
                    Crear Curso
                  </Link>
                </>
              )}
              <LogoutBtn />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;

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
};
