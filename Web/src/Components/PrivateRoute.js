import React, { useContext } from "react";
import { AppContext } from "../Context/AppContext";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const { state } = useContext(AppContext);
  if (state.token == null) {
    return <Navigate to="/login-register" />;
  }
  return children;
}

export default PrivateRoute;
