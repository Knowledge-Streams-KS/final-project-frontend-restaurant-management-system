import React from "react";
import axiosInstance from "../../axios/axios";
import toast from "react-hot-toast";

const InvokeAcess = ({ userId, fetchEmployees }) => {
  const handleAccess = async () => {
    try {
      const response = await axiosInstance.patch(`/auth/user/${userId}`);
      const successMessage =
        response.data.message || "Access InvokeAcessd successfully.";
      toast.success(successMessage);
      fetchEmployees();
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to InvokeAcess access.";
      toast.error(errorMessage);
    }
  };

  return (
    <button
      className="ml-2 rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600"
      onClick={handleAccess}
    >
      Invoke Acess
    </button>
  );
};

export default InvokeAcess;
