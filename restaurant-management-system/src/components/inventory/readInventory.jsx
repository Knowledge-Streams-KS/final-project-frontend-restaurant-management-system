import React, { useEffect, useState } from "react";
import axiosInstance from "../../axios/axios";
import AddInventory from "./addInventory";
import DeleteInventory from "./deleteInventory";
import EditInventory from "./editInventory";

const ReadInventory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [Inventories, setInventories] = useState([]);
  const [editInventoryId, setInventoryId] = useState(null);

  const fetchInventory = async () => {
    try {
      const response = await axiosInstance.get("/inventory");
      setInventories(response.data.allInventory);
    } catch (error) {
      console.error("Error fetching inventory:", error);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);
  const filteredInvetories = Inventories.filter((inventory) =>
    `${inventory.ingredientsId}`.includes(searchTerm.toLowerCase()),
  );
  const handleEdit = (inventoryId) => {
    setInventoryId(inventoryId);
  };

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <AddInventory fetchInventory={fetchInventory} />
      <div className="py-8">
        <div>
          <h2 className="text-2xl font-semibold leading-tight">Inventory</h2>
          <input
            type="text"
            placeholder="Search by ingredient Id..."
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
                    Id
                  </th>
                  <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-700">
                    IngredientsId
                  </th>
                  <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-700">
                    Quantity
                  </th>
                  <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-700">
                    Unit Price
                  </th>
                  <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-700">
                    Date
                  </th>
                  <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-700">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredInvetories.map((inventory) => (
                  <tr className="border-b border-gray-200" key={inventory.id}>
                    <td className="bg-white px-5 py-5 text-center text-sm">
                      {inventory.id}
                    </td>
                    <td className="bg-white px-5 py-5 text-center text-sm">
                      {inventory.ingredientsId}
                    </td>
                    <td className="bg-white px-5 py-5 text-center text-sm">
                      {inventory.quantity}
                    </td>
                    <td className="bg-white px-5 py-5 text-center text-sm">
                      {inventory.unitPrice}
                    </td>
                    <td className="bg-white px-5 py-5 text-center text-sm">
                      {new Date(inventory.date).toLocaleDateString()}
                    </td>
                    <td className="flex justify-center px-5 py-5 text-center text-sm">
                      {editInventoryId === inventory.id ? (
                        <EditInventory
                          inventoryId={inventory.id}
                          fetchInventory={fetchInventory}
                          onEdit={handleEdit}
                        />
                      ) : (
                        <>
                          <button
                            className="rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600"
                            onClick={() => handleEdit(inventory.id)}
                          >
                            Edit
                          </button>
                          <DeleteInventory
                            inventoryId={inventory.id}
                            fetchInventory={fetchInventory}
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

export default ReadInventory;
