import React, { createContext, useState } from "react";
import axiosInstance from "../axios/axios.js";
import toast, { Toaster } from "react-hot-toast";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const signup = async (firstName, lastName, email, password, role) => {
    try {
      const response = await axiosInstance.post("/auth/signup", {
        firstName,
        lastName,
        email,
        password,
        role,
      });

      const message = response.data.message || "Successfully registered!";
      toast.success(message);

      return response;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Error signing up.";
      console.error("Error signing up:", error);
      toast.error(errorMessage);
    }
  };

  const signin = async (email, password) => {
    try {
      const response = await axiosInstance.post("/auth/signin", {
        email,
        password,
      });
      const { data, token, message } = response.data;
      localStorage.setItem("token", token);
      setUser(data);
      const successMessage = message || "Successfully logged in!";
      toast.success(successMessage);
      return response;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Error logging in.";
      console.error("Error logging in:", error);
      toast.error(errorMessage);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    toast.success("Successfully logged out!");
  };

  return (
    <AuthContext.Provider value={{ signup, signin, logout, user }}>
      {children}
      <Toaster />
    </AuthContext.Provider>
  );
};
