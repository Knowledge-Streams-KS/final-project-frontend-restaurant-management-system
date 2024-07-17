import React from "react";
import axiosInstance from "../../axios/axios";
import toast from "react-hot-toast";

const PreparedOrder = ({ orderId, fetchOrders }) => {
  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log(orderId);
      const response = await axiosInstance.put(
        `/order/prepared/${orderId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const successMessage =
        response.data.message || "Order served successfully.";
      toast.success(successMessage);
      fetchOrders();
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to update Order.";
      toast.error(errorMessage);
    }
  };

  return (
    <button
      className="ml-2 rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600"
      onClick={handleUpdate}
    >
      Perpared
    </button>
  );
};

export default PreparedOrder;
