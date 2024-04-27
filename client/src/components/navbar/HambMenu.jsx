import React, { useState } from "react";
import { Link } from "react-router-dom";
import LogoutBtn from "../../components/auth/LogoutBtn";

function HambMenu({ currentUser, loggedIn }) {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <nav className="navbar navbar-expand-lg bg-[#333] text-white">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Navbar
        </a>
        <button
          className="navbar-toggler border-none"
          type="button"
          onClick={toggleMenu}
        >
          <span className="navbar-toggler-icon">&#9776;</span>
        </button>
        <div className={`collapse navbar-collapse ${showMenu ? 'show' : ''}`}>
          <div className="navbar-nav">
            <Link to={"/"} className="nav-link fw-bold" style={{ zIndex: 1000 }}>
              Home
            </Link>
            <Link to={"/#about1"} className="nav-link fw-bold" style={{ zIndex: 1000 }}>
              Acerca
            </Link>
            <Link to={"/#contact"} className="nav-link fw-bold" style={{ zIndex: 1000 }}>
              Contacto
            </Link>
            {loggedIn === false ? (
              <>
                <Link to={"/login"} className="nav-link fw-bold" style={{ zIndex: 1000 }}>
                  Ingresar
                </Link>
                <Link to={"/register"} className="nav-link fw-bold" style={{ zIndex: 1000 }}>
                  Registrar
                </Link>
              </>
            ) : (
              <>
                <Link to={"/course/all"} className="nav-link fw-bold" style={{ zIndex: 1000 }}>
                  Cursos
                </Link>
                {currentUser && currentUser.isAdmin === false && (
                  <Link to={"/course/library"} className="nav-link fw-bold" style={{ zIndex: 1000 }}>
                    Biblioteca
                  </Link>
                )}
                {currentUser && currentUser.isAdmin === true && (
                  <Link to={"/course/create"} className="nav-link fw-bold" style={{ zIndex: 1000 }}>
                    Crear Curso
                  </Link>
                )}
                <LogoutBtn />
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default HambMenu;
