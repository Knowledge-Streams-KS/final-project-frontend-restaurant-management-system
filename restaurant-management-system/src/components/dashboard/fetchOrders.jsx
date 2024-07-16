import axiosInstance from "../../axios/axios";

export const fetchOrders = async () => {
  try {
    const response = await axiosInstance.get("/orders");
    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};
