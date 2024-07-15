import React, { useEffect, useState } from "react";
import axiosInstance from "../../axios/axios";
import EditOrderTable from "./editTable";
import DeleteOrderTable from "./deleteTable";
import AddOrderTable from "./addTable";

const ReadOrderTable = () => {
  const [orderTables, setOrderTables] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editTableId, setEditTableId] = useState(null);

  const fetchOrderTables = async () => {
    try {
      const response = await axiosInstance.get("/ordertables");
      setOrderTables(response.data.orderTables);
    } catch (error) {
      console.error("Error fetching order tables:", error);
    }
  };

  useEffect(() => {
    fetchOrderTables();
  }, []);
  const filteredOrderTables = orderTables.filter((table) =>
    table.id.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleEdit = (tableId) => {
    setEditTableId(tableId);
  };

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <AddOrderTable fetchOrderTables={fetchOrderTables} />
      <div className="py-8">
        <div>
          <h2 className="text-2xl font-semibold leading-tight">Order Tables</h2>
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
                    Table No
                  </th>
                  <th className="px-5 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-700">
                    Seats
                  </th>
                  <th className="px-5 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredOrderTables.map((table) => (
                  <tr className="border-b border-gray-200" key={table.id}>
                    <td className="px-5 py-5 text-center text-sm">
                      {table.id}
                    </td>
                    <td className="px-5 py-5 text-center text-sm">
                      {table.tableNo}
                    </td>
                    <td className="px-5 py-5 text-center text-sm">
                      {table.seats}
                    </td>
                    <td className="flex justify-center px-5 py-5 text-center text-sm">
                      {editTableId === table.id ? (
                        <EditOrderTable
                          tableId={table.id}
                          fetchOrderTables={fetchOrderTables}
                          onEdit={handleEdit}
                        />
                      ) : (
                        <>
                          <button
                            className="rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600"
                            onClick={() => handleEdit(table.id)}
                          >
                            Edit
                          </button>
                          <DeleteOrderTable
                            tableId={table.id}
                            fetchOrderTables={fetchOrderTables}
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

export default ReadOrderTable;
