import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

import { Chart as ChartJS, defaults } from "chart.js/auto";
import { fetchOrders } from "./fetchOrders";

defaults.maintainAspectRatio = false;
defaults.responsive = true;
defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.font.size = 20;
defaults.plugins.title.color = "black";

const ReGraph = () => {
  const [revenueData, setRevenueData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const orders = await fetchOrders();
        const dailyData = orders.reduce((acc, order) => {
          const date = new Date(order.createdAt);
          const day = date.toISOString().split("T")[0];

          if (!acc[day]) {
            acc[day] = { revenue: 0, cost: 0 };
          }
          acc[day].revenue += order.totalAmountWithTax;

          return acc;
        }, {});

        const sortedData = Object.keys(dailyData)
          .sort((a, b) => new Date(a) - new Date(b))
          .map((key) => ({
            label: key,
            ...dailyData[key],
          }));

        setRevenueData(sortedData);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="ReGraph">
      {/* Line Chart for Daily Revenue & Cost */}
      <div className="dataCard revenueCard">
        <Line
          data={{
            labels: revenueData.map((data) => data.label),
            datasets: [
              {
                label: "Revenue",
                data: revenueData.map((data) => data.revenue),
                backgroundColor: "#064FF0",
                borderColor: "#064FF0",
              },
            ],
          }}
          options={{
            elements: {
              line: {
                tension: 0.5,
              },
            },
            plugins: {
              title: {
                text: "Daily Revenue & Cost",
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default ReGraph;
