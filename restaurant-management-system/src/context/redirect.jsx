import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./authContext";

const RedirectIfAuthenticated = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (user) {
    switch (user.role) {
      case "admin":
        return <Navigate to="/home" />;
      case "waiter":
        return <Navigate to="/reservation" />;
      case "chef":
        return <Navigate to="/orderdetails" />;
      default:
        return <Navigate to="/signin" />;
    }
  }

  return children;
};

export default RedirectIfAuthenticated;
