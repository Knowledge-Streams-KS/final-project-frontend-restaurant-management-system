import React, { useEffect, useState } from "react";
import { fetchOrders } from "./fetchOrders";
import { ClipLoader } from "react-spinners";

const RevenueByDate = () => {
  const [revenue, setRevenue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
    return today.toISOString().split("T")[0]; // Set initial date to today in YYYY-MM-DD format
  });

  const fetchRevenue = async () => {
    try {
      const orders = await fetchOrders();

      const filteredOrders = orders.filter((order) => {
        return order.createdAt.includes(selectedDate);
      });
      const totalRevenue = filteredOrders.reduce((total, order) => {
        return total + order.totalAmountWithTax;
      }, 0);
      setRevenue(totalRevenue);
    } catch (error) {
      console.error("Error fetching revenue:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedDate) {
      fetchRevenue();
    }
  }, [selectedDate]);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <h2 className="mb-4 text-2xl font-semibold leading-tight">
        Revenue by Date
      </h2>
      <input
        type="date"
        value={selectedDate}
        onChange={handleDateChange}
        className="mb-4 rounded-md border border-gray-300 p-2"
      />
      <div className="rounded-lg p-4">
        <div className="flex items-center justify-center">
          {loading ? (
            <ClipLoader color={"#FF0000"} />
          ) : (
            <div className="flex items-center justify-center rounded-full bg-yellow-500 p-6">
              <span className="text-4xl font-bold text-white">
                PKR {revenue}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RevenueByDate;
