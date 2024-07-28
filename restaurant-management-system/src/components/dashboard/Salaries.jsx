import React, { useEffect, useState } from "react";
import axiosInstance from "../../axios/axios";
import { ClipLoader } from "react-spinners";

const CostFromSalary = () => {
  const [totalCost, setTotalCost] = useState(0);
  const [loading, setLoading] = useState(true);
  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axiosInstance.get("/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const users = response.data.data;

      const totalSalary = users.reduce((total, user) => {
        return total + (user.salary || 0);
      }, 0);
      setTotalCost(totalSalary);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <h2 className="mb-4 text-2xl font-semibold leading-tight">
        Cost from Salary
      </h2>
      <div className="rounded-lg p-4">
        <div className="flex items-center justify-center">
          {loading ? (
            <ClipLoader color={"#FF0000"} />
          ) : (
            <div className="flex items-center justify-center rounded-full bg-red-500 p-6">
              <span className="text-4xl font-bold text-white">
                PKR {totalCost}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CostFromSalary;
