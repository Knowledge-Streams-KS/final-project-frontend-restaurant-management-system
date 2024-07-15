import React from "react";
import { Bar } from "react-chartjs-2";

const BarChart = ({ chartData }) => {
  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default BarChart;
