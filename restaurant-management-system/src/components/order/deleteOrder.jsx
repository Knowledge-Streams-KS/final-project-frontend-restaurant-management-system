import React from "react";
import axiosInstance from "../../axios/axios";
import toast from "react-hot-toast";

const DeleteOrder = ({ orderId, fetchOrders }) => {
  const handleDelete = async () => {
    try {
      const response = await axiosInstance.delete(`/order/${orderId}`);
      const successMessage =
        response.data.message || "Order deleted successfully.";
      toast.success(successMessage);
      fetchOrders();
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to delete Order.";
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

export default DeleteOrder;
