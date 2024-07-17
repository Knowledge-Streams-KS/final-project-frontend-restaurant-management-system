import axiosInstance from "../../axios/axios";

export const fetchOrders = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axiosInstance.get("/orders", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};
