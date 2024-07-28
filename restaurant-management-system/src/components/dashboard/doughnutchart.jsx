import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { fetchOrders } from "./fetchOrders";
import { ClipLoader } from "react-spinners";

const OrderItemsDoughnutChart = () => {
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getOrderData = async () => {
      try {
        const orders = await fetchOrders();
        setOrderData(orders);
      } catch (error) {
        console.error("Error fetching order data:", error);
      } finally {
        setLoading(false);
      }
    };

    getOrderData();
  }, []);
  const aggregateData = orderData.reduce((acc, order) => {
    order["Order Items"].forEach((item) => {
      const recipeId = item.recipeId;
      if (acc[recipeId]) {
        acc[recipeId].quantity += item.quantity;
      } else {
        acc[recipeId] = {
          title: item.Recipe.title,
          quantity: item.quantity,
        };
      }
    });
    return acc;
  }, {});
  const sortedItems = Object.values(aggregateData).sort(
    (a, b) => b.quantity - a.quantity,
  );
  const top3Items = sortedItems.slice(0, 3);
  const chartData = {
    labels: top3Items.map((item) => item.title),
    datasets: [
      {
        label: "Most Sold Items",
        data: top3Items.map((item) => item.quantity),
        backgroundColor: [
          "rgba(43, 63, 229, 0.8)",
          "rgba(250, 192, 19, 0.8)",
          "rgba(253, 135, 135, 0.8)",
        ],
      },
    ],
  };
  const chartOptions = {
    plugins: {
      title: {
        display: true,

        font: {
          size: 20,
        },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <h2 className="mb-2 text-2xl font-semibold leading-tight">
        Top 3 Most Sold Items
      </h2>
      <div className="rounded-lg">
        <div className="flex items-center justify-center">
          {loading ? (
            <ClipLoader className="m-10" color={"#FF0000"} />
          ) : (
            <div className="h-60 w-full">
              <Doughnut data={chartData} options={chartOptions} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderItemsDoughnutChart;
