import React, { useState, useEffect } from "react";
import axiosInstance from "../../axios/axios";
import DeleteIngredientsCode from "./deleteIngredientsCode";
import AddIngredientsCode from "./addIngredientsCode";

const ReadIngredientsCode = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [ingredientsCodes, setIngredientsCodes] = useState([]);

  const fetchIngredientsCode = async () => {
    try {
      const response = await axiosInstance.get("/ingredients/code");
      setIngredientsCodes(response.data.ingredients);
    } catch (error) {
      console.error("Error fetching ingredients:", error);
    }
  };

  useEffect(() => {
    fetchIngredientsCode();
  }, []);

  const filteredIngredientsCode = ingredientsCodes.filter((ingredientCode) =>
    ingredientCode.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <AddIngredientsCode fetchIngredientsCode={fetchIngredientsCode} />
      <div className="py-8">
        <div>
          <h2 className="text-2xl font-semibold leading-tight">
            Ingredients Code
          </h2>
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mt-4 rounded-md border border-gray-300 p-2 focus:outline-none focus:ring focus:ring-gray-300"
          />
        </div>
        <div className="-mx-4 overflow-x-auto px-4 py-4 sm:-mx-8 sm:px-8">
          <div className="inline-block min-w-full overflow-hidden rounded-lg shadow-md">
            <table className="min-w-full leading-normal">
              <thead>
                <tr className="border-b-2 border-gray-200 bg-gray-100">
                  <th className="px-5 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-700">
                    Name
                  </th>
                  <th className="px-5 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-700">
                    Code
                  </th>
                  <th className="px-5 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-700">
                    Unit
                  </th>
                  <th className="px-5 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredIngredientsCode.map((ingredientCode) => (
                  <tr
                    key={ingredientCode.id}
                    className="border-b border-gray-200"
                  >
                    <td className="px-5 py-5 text-center text-sm">
                      {ingredientCode.name}
                    </td>
                    <td className="px-5 py-5 text-center text-sm">
                      {ingredientCode.code}
                    </td>
                    <td className="px-5 py-5 text-center text-sm">
                      {ingredientCode.unit}
                    </td>
                    <td className="flex justify-center px-5 py-5 text-center text-sm">
                      <DeleteIngredientsCode
                        codeId={ingredientCode.code}
                        fetchIngredientsCode={fetchIngredientsCode}
                      />
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

export default ReadIngredientsCode;
