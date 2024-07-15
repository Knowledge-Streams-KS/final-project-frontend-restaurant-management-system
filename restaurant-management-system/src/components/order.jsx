import React, { useState } from "react";

const OrdersTable = ({ orders }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const filteredOrders = orders.filter((order) =>
    order.User.firstName.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        <div>
          <h2 className="text-2xl font-semibold leading-tight">Orders</h2>
          <input
            type="text"
            placeholder="Search by username..."
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
                    Total Amount
                  </th>

                  <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-700">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="border-b border-gray-200 bg-white px-5 py-5 text-center text-sm">
                      {order.id}
                    </td>
                    <td className="border-b border-gray-200 bg-white px-5 py-5 text-center text-sm">
                      {order.tableId}
                    </td>

                    <td className="border-b border-gray-200 bg-white px-5 py-5 text-center text-sm">
                      {order.User.firstName} {order.User.lastName}
                    </td>
                    <td className="border-b border-gray-200 bg-white px-5 py-5 text-center text-sm">
                      {order.User.role}
                    </td>
                    <td className="border-b border-gray-200 bg-white px-5 py-5 text-center text-sm">
                      {order.Customer.firstName} {order.Customer.lastName}
                    </td>

                    <td className="border-b border-gray-200 bg-white px-5 py-5 text-center text-sm">
                      {order.totalAmount}
                    </td>
                    <td className="border-b border-gray-200 bg-white px-5 py-5 text-center text-sm">
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersTable;
