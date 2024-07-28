import React, { createContext, useEffect, useState } from "react";
import axiosInstance from "../axios/axios.js";
import toast, { Toaster } from "react-hot-toast";
import { FadeLoader } from "react-spinners";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const fetchUser = async () => {
        try {
          const response = await axiosInstance.get("/user", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const { userInfo } = response.data;
          setUser(userInfo);
        } catch (error) {
          console.error("Error fetching user:", error);
          localStorage.removeItem("token");
        } finally {
          setLoading(false);
        }
      };
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

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
      const { userInfo, token, message } = response.data;
      localStorage.setItem("token", token);
      setUser(userInfo);
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
      {loading ? (
        <div className="flex h-screen items-center justify-center">
          <FadeLoader color="#123abc" size={60} />
        </div>
      ) : (
        <>
          {children}
          <Toaster />
        </>
      )}
    </AuthContext.Provider>
  );
};
