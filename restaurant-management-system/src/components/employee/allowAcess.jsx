import React from "react";
import axiosInstance from "../../axios/axios";
import toast from "react-hot-toast";

const AllowAcess = ({ userId, fetchEmployees }) => {
  const token = localStorage.getItem("token");
  const handleAccess = async () => {
    try {
      const response = await axiosInstance.patch(`/auth/user/allow/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const successMessage =
        response.data.message || "Access Allowed successfully.";
      toast.success(successMessage);
      fetchEmployees();
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to allow access.";
      toast.error(errorMessage);
    }
  };

  return (
    <button
      className="ml-2 rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600"
      onClick={handleAccess}
    >
      Allow Acess
    </button>
  );
};

export default AllowAcess;
