import React, { useEffect, useState } from "react";
import axiosInstance from "../axios/axios";

const AllStock = () => {
  const [stock, setStock] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const token = localStorage.getItem("token");
  const fetchStock = async () => {
    try {
      const response = await axiosInstance.get("/allstock", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setStock(response.data.allInventory);
    } catch (error) {
      console.error("Error fetching stock:", error);
    }
  };

  useEffect(() => {
    fetchStock();
  }, []);
  const filteredstock = stock.filter((stock) =>
    stock.ingredientCode.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        <div>
          <h2 className="text-2xl font-semibold leading-tight">Total Stock</h2>
          <input
            type="text"
            placeholder="Search by order table Id..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mt-4 rounded-md border border-gray-300 p-2"
          />
        </div>
        <div className="-mx-4 overflow-x-auto px-4 py-4 sm:-mx-8 sm:px-8">
          <div className="inline-block min-w-full overflow-hidden rounded-lg shadow-md">
            <table className="min-w-full leading-normal">
              <thead>
                <tr className="border-b-2 border-gray-200 bg-gray-100">
                  <th className="px-5 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-700">
                    Id
                  </th>
                  <th className="px-5 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-700">
                    Ingredient Code
                  </th>
                  <th className="px-5 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-700">
                    Total Quantity
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredstock.map((stock) => (
                  <tr className="border-b border-gray-200" key={stock.id}>
                    <td className="px-5 py-5 text-center text-sm">
                      {stock.id}
                    </td>
                    <td className="px-5 py-5 text-center text-sm">
                      {stock.ingredientCode}
                    </td>
                    <td className="px-5 py-5 text-center text-sm">
                      {stock.totalQuantity}
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

export default AllStock;
