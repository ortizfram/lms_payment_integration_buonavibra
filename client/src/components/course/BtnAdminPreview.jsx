import React, { useContext } from "react";
import { FaEye } from "react-icons/fa";
import AuthContext from "../../context/AuthContext";
import { Link } from "react-router-dom";

function BtnAdminPreview({ courseId }) {
  const { currentUser } = useContext(AuthContext);

  // Render button if user is admin
  if (currentUser && currentUser.isAdmin === true) {
    return (
      <Link to={`/course/${courseId}`}>
        <button>
          <FaEye />
        </button>
      </Link>
    );
  }

  // Return null if user is not admin
  return null;
}

export default BtnAdminPreview;
