import OrderItemsDoughnutChart from "../components/dashboard/doughnutchart";

import RevenueByDate from "../components/dashboard/revenue";
import ReGraph from "../components/dashboard/revenueGraph";

import CostFromSalary from "../components/dashboard/Salaries";

const Dashboard = () => {
  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-lg bg-white p-4 shadow">
          <ReGraph />
        </div>
        <div className="rounded-lg bg-white p-4 shadow">
          <RevenueByDate />
        </div>
      </div>
      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <div className="rounded-lg bg-white p-4 shadow">
          <CostFromSalary />
        </div>
        <div className="rounded-lg bg-white p-4 shadow">
          <OrderItemsDoughnutChart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
