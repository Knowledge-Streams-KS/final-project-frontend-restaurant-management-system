import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { fetchOrders } from "./fetchOrders";

const OrderItemsDoughnutChart = () => {
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    const getOrderData = async () => {
      try {
        const orders = await fetchOrders();
        setOrderData(orders);
      } catch (error) {
        console.error("Error fetching order data:", error);
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

  // Convert aggregateData to an array and sort by quantity in descending order
  const sortedItems = Object.values(aggregateData).sort(
    (a, b) => b.quantity - a.quantity,
  );

  // Get top 3 items
  const top3Items = sortedItems.slice(0, 3);

  // Prepare data for Doughnut chart
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

  // Chart options
  const chartOptions = {
    plugins: {
      title: {
        display: true,
        text: "Top 3 Most Sold Items",
        font: {
          size: 20,
        },
      },
    },
  };

  return (
    <div className="dataCard">
      <Doughnut data={chartData} options={chartOptions} />
    </div>
  );
};

export default OrderItemsDoughnutChart;
