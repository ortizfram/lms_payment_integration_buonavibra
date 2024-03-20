import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import LogoutBtn from "../components/auth/LogoutBtn";

function Navbar() {
  const { loggedIn } = useContext(AuthContext);//destructure loggedIn

  return (
    <div>
      <Link to={"/"}>Home</Link>
      <Link to={"/about"}>About</Link>
      {loggedIn === false && (
        <>
          <Link to={"/register"}>register</Link>
          <Link to={"/login"}>login</Link>
        </>
      )}
      {loggedIn === true && (
        <>
        <Link to={"/course/all"}>Courses</Link>
        <Link to={"/course/library"}>Biblioteca</Link>
          <Link to={"/course/create"}>create Course</Link>
          <Link to={"/customer"}>customer</Link>
          <LogoutBtn />
        </>
      )}
    </div>
  );
}

export default Navbar;
