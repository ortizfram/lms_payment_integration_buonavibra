import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import LogoutBtn from "../components/auth/LogoutBtn";

function Navbar() {
  const { loggedIn, currentUser } = useContext(AuthContext); //destructure loggedIn

  return (
    <div>
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
          {/* dont show for Admin, course he has adminPreview function */}
          {currentUser && currentUser.isAdmin === false && (
            <>
              <Link to={"/course/library"}>Biblioteca</Link>
            </>
          )}

          {/* isAdmin */}
          {currentUser && currentUser.isAdmin === true && (
            <>
              <Link to={"/course/create"}>crear Courso</Link>
              {/* <Link to={"/promoCodes"}>Codigo Promocional</Link> */}
            </>
          )}
          <LogoutBtn />
        </>
      )}
    </div>
  );
}

export default Navbar;
