import React, { useState, useEffect } from "react";

import axiosInstance from "../axios/axios";
import OrdersTable from "../components/order";
import OrderForm from "../components/addOrder";

const Order = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axiosInstance.get("/orders");
      setOrders(response.data); // Assuming response.data is an array of booking objects
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);
  return (
    <div className="Orders">
      <OrderForm refreshOrders={fetchOrders} />
      <OrdersTable orders={orders} />
    </div>
  );
};

export default Order;
