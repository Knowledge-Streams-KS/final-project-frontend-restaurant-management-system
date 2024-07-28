import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../../axios/axios";
import PreparedOrder from "./prepareOrder";
import { BeatLoader } from "react-spinners";
import { io } from "socket.io-client";

const OrderDetails = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("pending"); // Default to "pending"
  const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState(null);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axiosInstance.get("/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrders(response.data);
    } catch (error) {
      toast.error("Error fetching orders");
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    const newSocket = io("http://localhost:3000");
    console.log("Attempting to connect to socket...");
    newSocket.on("connect", () => {
      console.log("Connected to Socket.IO server");
    });
    newSocket.on("orderStatusUpdated", (updatedOrder) => {
      console.log("Order status updated:", updatedOrder);
      setOrders((prevOrders) => {
        const updatedOrders = prevOrders.map((order) => {
          console.log(
            "order id",
            order.id,
            "updated order id",
            updatedOrder.id,
          );
          if (order.id == updatedOrder.id) {
            console.log(
              `Updating order ${order.id} status from ${order.status} to ${updatedOrder.status}`,
            );
            return { ...order, status: updatedOrder.status };
          }
          return order;
        });
        console.log("Updated orders:", updatedOrders);
        return updatedOrders;
      });
    });
    newSocket.on("newOrder", async (newOrder) => {
      console.log("New order added:", newOrder);
      try {
        const token = localStorage.getItem("token");
        const response = await axiosInstance.get(`/order/${newOrder.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const completeOrder = response.data;

        setOrders((prevOrders) => [completeOrder, ...prevOrders]);
      } catch (error) {
        console.error("Error fetching new order details:", error);
        toast.error("Error fetching new order details");
      }
    });

    // Listen for order updates
    newSocket.on("orderUpdated", async ({ id, orderItems }) => {
      console.log("Order updated with new items:", { id, orderItems });
      try {
        const token = localStorage.getItem("token");
        const response = await axiosInstance.get(`/order/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const updatedOrder = response.data;

        setOrders((prevOrders) =>
          prevOrders.map((order) => (order.id === id ? updatedOrder : order)),
        );
      } catch (error) {
        console.error("Error fetching updated order details:", error);
        toast.error("Error fetching updated order details");
      }
    });

    newSocket.on("disconnect", () => {
      console.log("Disconnected from Socket.IO server");
    });

    setSocket(newSocket);

    return () => {
      console.log("Disconnecting socket...");
      newSocket.disconnect();
    };
  }, []);

  const filteredOrders = orders
    .filter((order) => `${order.id}`.includes(searchTerm.toLowerCase()))
    .filter((order) =>
      statusFilter === "" ? true : order.status === statusFilter,
    );

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        <div>
          <h2 className="text-2xl font-semibold leading-tight">Orders</h2>
          <input
            type="text"
            placeholder="Search by order Id..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mt-4 rounded-md border border-gray-300 p-2"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="ml-4 mt-4 rounded-md border border-gray-300 p-2"
          >
            <option value="">All</option>
            <option value="pending">Pending</option>
            <option value="served">Served</option>
            <option value="prepared">Prepared</option>
            <option value="billed">Billed</option>
          </select>
        </div>
        <div className="-mx-4 overflow-x-auto px-4 py-4 sm:-mx-8 sm:px-8">
          <div className="inline-block min-w-full overflow-hidden rounded-lg shadow-md">
            <table className="min-w-full leading-normal">
              <thead>
                <tr className="border-b-2 border-gray-200 bg-gray-100">
                  <th className="px-5 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-700">
                    Order ID
                  </th>
                  <th className="px-5 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-700">
                    Recipe ID
                  </th>
                  <th className="px-5 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-700">
                    Recipe Title
                  </th>
                  <th className="px-5 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-700">
                    Size
                  </th>
                  <th className="px-5 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-700">
                    Status
                  </th>
                  <th className="px-5 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-700">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="6" className="px-5 py-5">
                      <div className="flex h-full items-center justify-center">
                        <BeatLoader color="#111827" />
                      </div>
                    </td>
                  </tr>
                ) : filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <tr className="border-b border-gray-200" key={order.id}>
                      <td className="px-5 py-5 text-center text-sm">
                        {order.id}
                      </td>
                      <td className="px-5 py-5 text-center text-sm">
                        {order["Order Items"] &&
                          order["Order Items"]
                            .map((item) => item.Recipe?.recipeId)
                            .join(", ")}
                      </td>
                      <td className="px-5 py-5 text-center text-sm">
                        {order["Order Items"] &&
                          order["Order Items"]
                            .map((item) => item.Recipe?.title)
                            .join(", ")}
                      </td>
                      <td className="px-5 py-5 text-center text-sm">
                        {order["Order Items"] &&
                          order["Order Items"]
                            .map((item) => item.Recipe?.size)
                            .join(", ")}
                      </td>
                      <td className="px-5 py-5 text-center text-sm">
                        {order.status}
                      </td>
                      <td className="flex justify-center px-5 py-5 text-center text-sm">
                        <PreparedOrder
                          orderId={order.id}
                          fetchOrders={fetchOrders}
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-5 py-5 text-center text-sm">
                      No orders found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
