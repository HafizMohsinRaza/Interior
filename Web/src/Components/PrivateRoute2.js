import React, { useContext } from "react";
import { AppContext } from "../Context/AppContext";
import { Navigate } from "react-router-dom";

function PrivateRoute2({ children }) {
  const { state } = useContext(AppContext);
  if (state.token == null) {
    return <Navigate to="/rolelogin" />;
  }
  return children;
}

export default PrivateRoute2;
