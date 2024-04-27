import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import WebMenu from "../components/navbar/WebMenu";
import HambMenu from "../components/navbar/HambMenu";

function Navbar() {
  const { loggedIn, currentUser } = useContext(AuthContext);

  return (
    // logic for hamb-menu or web-menu
    <>
      <WebMenu currentUser={currentUser} loggedIn={loggedIn} />
    </>
  );
}

export default Navbar;
