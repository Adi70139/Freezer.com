import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { StoreContext } from "../Context/StoreContext";

const ProtectedRoute = ({ children }) => {
  const { token } = useContext(StoreContext);

  if (!token) {
    return <Navigate to="/" />;
  }
  
  return children;
};

export default ProtectedRoute;
