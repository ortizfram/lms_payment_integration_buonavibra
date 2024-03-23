import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import LogoutBtn from "../components/auth/LogoutBtn";

function Navbar() {
  const { loggedIn, currentUser } = useContext(AuthContext); //destructure loggedIn

  return (
    <div>
      {/* No Restriction */}
      <Link to={"/"}>Home</Link>
      <Link to={"/about"}>About</Link>
      <Link to={"/course/all"}>Courses</Link>

      {/* Not LoggedIn */}
      {loggedIn === false && (
        <>
          <Link to={"/register"}>register</Link>
          <Link to={"/login"}>login</Link>
        </>
      )}

      {/* isLogged */}
      {loggedIn === true && (
        <>
          <Link to={"/course/library"}>Biblioteca</Link>

          {/* isAdmin */}
          {currentUser && currentUser.isAdmin === true && (
            <>
              <Link to={"/course/create"}>create Course</Link>
            </>
          )}
          <LogoutBtn />
        </>
      )}
    </div>
  );
}

export default Navbar;
