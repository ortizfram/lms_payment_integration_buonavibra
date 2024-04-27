import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import WebMenu from "../components/navbar/WebMenu";
import HambMenu from "../components/navbar/HambMenu";

function Navbar() {
  const { loggedIn, currentUser } = useContext(AuthContext);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 990);
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    // logic for hamb-menu or web-menu
    <>
      {isMobile ? (
        <HambMenu currentUser={currentUser} loggedIn={loggedIn} />
      ) : (
        <WebMenu currentUser={currentUser} loggedIn={loggedIn} />
      )}
    </>
  );
}

export default Navbar;
