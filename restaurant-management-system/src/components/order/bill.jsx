import React, { useEffect, useState } from "react";
import axiosInstance from "../../axios/axios";
import { useParams } from "react-router-dom";

const BillPage = () => {
  const { orderId } = useParams();
  console.log(orderId);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axiosInstance.get(`/order/${orderId}`);
        const orderData = response.data;
        setOrder(orderData);
      } catch (error) {
        console.error("Failed to fetch order:", error);
      }
    };

    fetchOrder();
  }, [orderId]);

  const handlePrint = () => {
    window.print();
  };

  if (!order) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <style>
        {`
          @media print {
            .no-print {
              display: none;
            }
          }
        `}
      </style>
      <div className="mx-auto mt-8 max-w-md rounded-lg border bg-white px-6 py-8 shadow-lg">
        <h1 className="my-4 text-center text-2xl font-bold text-blue-600">
          Restaurant Management System
        </h1>
        <hr className="mb-2" />
        <div className="mb-4">
          <h1 className="text-center text-lg font-bold">
            Invoice Receipt #: INV-00{order.id}
          </h1>
          <div className="flex justify-between">
            <div className="text-gray-700">Table: {order.tableId}</div>
            <div>Date: {new Date(order.createdAt).toLocaleDateString()}</div>
          </div>
          <div className="text-gray-700">
            Employee: {order.User.firstName} {order.User.lastName}
          </div>
        </div>
        <div className="mb-4">
          <h2 className="text-md font-bold">
            Customer Name:
            <span className="ml-2 font-light text-gray-700">
              {order.Customer.firstName} {order.Customer.lastName}
            </span>
          </h2>
          <h2 className="text-md font-bold">
            Phone Number:
            <span className="ml-2 font-light text-gray-700">
              +{order.Customer.phoneNo}
            </span>
          </h2>
          <h2 className="text-md font-bold">
            Email:
            <span className="ml-2 font-light text-gray-700">
              {order.Customer.email}
            </span>
          </h2>
        </div>
        <hr className="mb-2" />
        <table className="mb-8 w-full">
          <thead>
            <tr>
              <th className="text-left font-bold text-gray-700">Description</th>
              <th className="text-right font-bold text-gray-700">Amount</th>
            </tr>
          </thead>
          <tbody>
            {order["Order Items"].map((item) => (
              <tr key={item.id}>
                <td className="text-left text-gray-700">
                  {item.Recipe.title} - {item.Recipe.size} - Quantity:{" "}
                  {item.quantity}
                </td>
                <td className="text-right text-gray-700">
                  PKR{item.price.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td className="text-left font-bold text-gray-700">Subtotal</td>
              <td className="text-right font-bold text-gray-700">
                PKR{order.totalAmount.toFixed(2)}
              </td>
            </tr>
            <tr>
              <td className="text-left font-bold text-gray-700">
                Tax ({(order.tax * 100).toFixed(0)}%)
              </td>
              <td className="text-right font-bold text-gray-700">
                PKR{(order.totalAmount * order.tax).toFixed(2)}
              </td>
            </tr>
            <tr>
              <td className="text-left font-bold text-gray-700">Total</td>
              <td className="text-right font-bold text-gray-700">
                PKR{order.totalAmountWithTax.toFixed(2)}
              </td>
            </tr>
          </tfoot>
        </table>
        <div className="mb-2 text-center text-gray-700">
          Thank you for visiting Us!
        </div>
        <div className="no-print text-center">
          <button
            onClick={handlePrint}
            className="mt-4 inline-flex items-center rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
          >
            Print
          </button>
        </div>
      </div>
    </>
  );
};

export default BillPage;
