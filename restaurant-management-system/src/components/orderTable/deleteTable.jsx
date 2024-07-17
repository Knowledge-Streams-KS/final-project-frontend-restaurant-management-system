import React from "react";
import axiosInstance from "../../axios/axios";
import toast from "react-hot-toast";

const DeleteOrderTable = ({ tableId, fetchOrderTables }) => {
  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axiosInstance.delete(`/ordertable/${tableId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const successMessage =
        response.data.message || "Table deleted successfully.";
      toast.success(successMessage);
      fetchOrderTables();
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to delete Table.";
      toast.error(errorMessage);
    }
  };

  return (
    <button
      className="ml-2 rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600"
      onClick={handleDelete}
    >
      Delete
    </button>
  );
};

export default DeleteOrderTable;
