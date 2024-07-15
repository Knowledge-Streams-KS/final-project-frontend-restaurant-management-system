import React, { useState, useEffect } from "react";
import axiosInstance from "../axios/axios";
import EmployeeTable from "../components/employees";

const Employee = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axiosInstance.get("/users");

        setEmployees(response.data.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <div className="Employee">
      <EmployeeTable employees={employees} />
    </div>
  );
};

export default Employee;
