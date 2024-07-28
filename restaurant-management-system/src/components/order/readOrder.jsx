import React, { useContext, useEffect, useState } from "react";
import axiosInstance from "../../axios/axios";
import AddOrder from "./addOrder";
import AddItemOrder from "./addItemOrder";
import DeleteOrder from "./deleteOrder";
import UpdateOrderServed from "./updateOrder";
import UpdateOrderBill from "./billOrder";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { BeatLoader } from "react-spinners";
import { io } from "socket.io-client";

const ReadOrder = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [orders, setOrders] = useState([]);
  const [editOrderId, setEditOrderId] = useState(null);
  const [editBillId, setEditBillId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Set the number of items per page
  const { user } = useContext(AuthContext);
  const userId = user.userId;
  const token = localStorage.getItem("token");

  const fetchOrders = async () => {
    try {
      const response = await axiosInstance.get("/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();

    const newSocket = io("http://localhost:3000");

    // Check connection
    console.log("Attempting to connect to socket...");
    newSocket.on("connect", () => {
      console.log("Connected to Socket.IO server");
    });

    // Listen for order status updates
    newSocket.on("orderStatusUpdated", (updatedOrder) => {
      console.log("Order status updated:", updatedOrder);

      setOrders((prevOrders) => {
        const updatedOrders = prevOrders.map((order) => {
          if (order.id === updatedOrder.id) {
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

    newSocket.on("disconnect", () => {
      console.log("Disconnected from Socket.IO server");
    });

    setSocket(newSocket);

    return () => {
      console.log("Disconnecting socket...");
      newSocket.disconnect();
    };
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const filteredOrders = orders.filter((order) =>
    `${order.id}`.includes(searchTerm.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const currentOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleEdit = (orderId) => {
    setEditOrderId(orderId);
  };

  const handleOrder = (orderId, status) => {
    if (status === "billed") {
      navigate(`/order/bill/${orderId}`);
    }
    setEditBillId(orderId);
    setEditOrderId(null);
  };

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <AddOrder fetchOrders={fetchOrders} userId={userId} />
      <div className="py-8">
        <div>
          <h2 className="text-2xl font-semibold leading-tight">Orders</h2>
          <input
            type="text"
            placeholder="Search by Order Id..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mt-4 rounded-md border border-gray-300 p-2"
          />
        </div>
        <div className="-mx-4 overflow-x-auto px-4 py-4 sm:-mx-8 sm:px-8">
          <div className="inline-block min-w-full overflow-hidden rounded-lg shadow-md">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-700">
                    ID
                  </th>
                  <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-700">
                    Table ID
                  </th>
                  <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-700">
                    Employee Name
                  </th>
                  <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-700">
                    Role
                  </th>
                  <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-700">
                    Customer Name
                  </th>
                  <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-700">
                    Sub Total
                  </th>
                  <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-700">
                    Tax
                  </th>
                  <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-700">
                    Total Amount
                  </th>
                  <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-700">
                    Status
                  </th>
                  <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-700">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="10" className="px-5 py-5">
                      <div className="flex h-full items-center justify-center">
                        <BeatLoader color="#111827" />
                      </div>
                    </td>
                  </tr>
                ) : currentOrders.length > 0 ? (
                  currentOrders.map((order, index) => (
                    <tr
                      className="border-b border-gray-200"
                      key={`order-${order.id}-${index}`}
                    >
                      <td className="bg-white px-5 py-5 text-center text-sm">
                        {order.id}
                      </td>
                      <td className="bg-white px-5 py-5 text-center text-sm">
                        {order.tableId}
                      </td>
                      <td className="bg-white px-5 py-5 text-center text-sm">
                        {order.User.firstName} {order.User.lastName}
                      </td>
                      <td className="bg-white px-5 py-5 text-center text-sm">
                        {order.User.role}
                      </td>
                      <td className="bg-white px-5 py-5 text-center text-sm">
                        {order.Customer.firstName} {order.Customer.lastName}
                      </td>
                      <td className="bg-white px-5 py-5 text-center text-sm">
                        {order.totalAmount}
                      </td>
                      <td className="bg-white px-5 py-5 text-center text-sm">
                        {order.tax * 100}%
                      </td>
                      <td className="bg-white px-5 py-5 text-center text-sm">
                        {order.totalAmountWithTax}
                      </td>
                      <td className="bg-white px-5 py-5 text-center text-sm">
                        <span
                          className={`relative inline-block rounded-full px-3 py-1 font-semibold leading-tight ${
                            order.status === "pending"
                              ? "bg-orange-200 text-orange-900"
                              : order.status === "processed"
                                ? "bg-blue-200 text-blue-900"
                                : order.status === "served"
                                  ? "bg-purple-200 text-purple-900"
                                  : order.status === "billed"
                                    ? "bg-green-200 text-green-900"
                                    : "bg-gray-200 text-gray-900"
                          }`}
                        >
                          <span
                            aria-hidden
                            className="absolute inset-0 rounded-full opacity-50"
                          ></span>
                          <span className="relative">{order.status}</span>
                        </span>
                      </td>
                      <td className="flex flex-col justify-center px-5 py-5 text-center text-sm">
                        <div className="flex items-center">
                          {editOrderId === order.id ? (
                            <AddItemOrder
                              orderId={order.id}
                              userId={userId}
                              fetchOrders={fetchOrders}
                              onEdit={handleEdit}
                            />
                          ) : (
                            <>
                              <button
                                className="rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600"
                                onClick={() => handleEdit(order.id)}
                              >
                                Add
                              </button>
                              <DeleteOrder
                                orderId={order.id}
                                fetchOrders={fetchOrders}
                              />
                              <UpdateOrderServed
                                orderId={order.id}
                                fetchOrders={fetchOrders}
                              />
                            </>
                          )}
                        </div>
                        <div className="mt-2">
                          {editBillId === order.id ? (
                            <UpdateOrderBill
                              fetchOrders={fetchOrders}
                              orderId={order.id}
                              onEdit={handleOrder}
                            />
                          ) : (
                            <>
                              <button
                                className="rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600"
                                onClick={() =>
                                  handleOrder(order.id, order.status)
                                }
                              >
                                Get Bill
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="10" className="px-5 py-5 text-center text-sm">
                      No Orders Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <div className="my-4 flex justify-center">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  className={`mx-1 rounded px-3 py-1 ${
                    currentPage === index + 1
                      ? "bg-blue-500 text-white"
                      : "bg-gray-300 text-gray-700"
                  }`}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadOrder;
