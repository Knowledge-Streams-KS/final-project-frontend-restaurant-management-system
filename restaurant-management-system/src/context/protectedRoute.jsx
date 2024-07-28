import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "./authContext";

const PrivateRoute = ({ allowedRoles }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/signin" />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Redirect based on user role
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

  return <Outlet />;
};

export default PrivateRoute;
