import React, { useEffect, useState } from "react";
import AllowAcess from "./allowAcess";
import InvokeAcess from "./invokeAcess";
import axiosInstance from "../../axios/axios";
import AddSalary from "./setSalary";

const EmployeeTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [employees, setEmployees] = useState([]);
  const [employeeId, setEmployeeId] = useState(null);

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
  const filteredEmployees = employees.filter((employee) =>
    employee.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  const handleEdit = (employeeId) => {
    setEmployeeId(employeeId);
  };

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        <div>
          <h2 className="text-2xl font-semibold leading-tight">Employees</h2>
          <input
            type="text"
            placeholder="Search by email..."
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
                    Name
                  </th>

                  <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-700">
                    Email
                  </th>
                  <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-700">
                    Role
                  </th>
                  <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-700">
                    Verified
                  </th>
                  <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-700">
                    Salary
                  </th>
                  <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-700">
                    Access
                  </th>
                  <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-700">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((employee) => (
                  <tr className="border-b border-gray-200" key={employee.id}>
                    <td className="bg-white px-5 py-5 text-center text-sm">
                      {employee.id}
                    </td>
                    <td className="bg-white px-5 py-5 text-center text-sm">
                      {employee.firstName} {employee.lastName}
                    </td>

                    <td className="bg-white px-5 py-5 text-center text-sm">
                      {employee.email}
                    </td>
                    <td className="bg-white px-5 py-5 text-center text-sm">
                      {employee.role}
                    </td>

                    <td className="bg-white px-5 py-5 text-center text-sm">
                      <span
                        className={`relative inline-block rounded-full px-3 py-1 font-semibold leading-tight ${
                          employee.verified
                            ? "bg-green-200 text-green-900"
                            : "bg-red-200 text-red-900"
                        }`}
                      >
                        <span
                          aria-hidden
                          className="absolute inset-0 rounded-full opacity-50"
                        ></span>
                        <span className="relative">
                          {employee.verified ? "Yes" : "No"}
                        </span>
                      </span>
                    </td>
                    <td className="bg-white px-5 py-5 text-center text-sm">
                      {employee.salary}
                    </td>
                    <td className="bg-white px-5 py-5 text-center text-sm">
                      <span
                        className={`relative inline-block rounded-full px-3 py-1 font-semibold leading-tight ${
                          employee.allowAcess
                            ? "bg-green-200 text-green-900"
                            : "bg-red-200 text-red-900"
                        }`}
                      >
                        <span
                          aria-hidden
                          className="absolute inset-0 rounded-full opacity-50"
                        ></span>
                        <span className="relative">
                          {employee.allowAcess ? "Yes" : "No"}
                        </span>
                      </span>
                    </td>
                    <td className="flex justify-center px-5 py-5 text-center text-sm">
                      {employeeId === employee.id ? (
                        <AddSalary
                          fetchEmployees={filteredEmployees}
                          userId={employee.id}
                          onEdit={handleEdit}
                        />
                      ) : (
                        <>
                          <button
                            className="rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600"
                            onClick={() => handleEdit(employee.id)}
                          >
                            Salary
                          </button>
                          <AllowAcess
                            fetchEmployees={filteredEmployees}
                            userId={employee.id}
                          />
                          <InvokeAcess
                            fetchEmployees={filteredEmployees}
                            userId={employee.id}
                          />
                        </>
                      )}
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

export default EmployeeTable;
