import React, { useState } from "react";

const BookingTable = ({ bookings }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const filteredBookings = bookings.filter((booking) =>
    `${booking.Customer.firstName} ${booking.Customer.lastName}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        <div>
          <h2 className="text-2xl font-semibold leading-tight">Bookings</h2>
          <input
            type="text"
            className="mt-4 rounded-lg border border-gray-300 px-4 py-2"
            placeholder="Search by Client Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="-mx-4 overflow-x-auto px-4 py-4 sm:-mx-8 sm:px-8">
          <div className="inline-block min-w-full overflow-hidden rounded-lg shadow-md">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="cursor-pointer border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">
                    Customer Name
                  </th>
                  <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">
                    Phone Number
                  </th>
                  <th className="cursor-pointer border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">
                    Email
                  </th>
                  <th className="cursor-pointer border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">
                    Date
                  </th>
                  <th className="cursor-pointer border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">
                    Time Slot
                  </th>
                  <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">
                    Reserved By
                  </th>
                  <th className="cursor-pointer border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">
                    Status
                  </th>
                  <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">
                    Table No
                  </th>
                  <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map((booking) => (
                  <tr key={booking.id}>
                    <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                      <div className="flex">
                        <div className="ml-3">
                          <p className="whitespace-no-wrap text-gray-900">
                            {`${booking.Customer.firstName} ${booking.Customer.lastName}`}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                      <p className="whitespace-no-wrap text-gray-900">
                        {booking.Customer.phoneNo}
                      </p>
                    </td>
                    <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                      <p className="whitespace-no-wrap text-gray-900">
                        {booking.Customer.email}
                      </p>
                    </td>
                    <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                      <p className="whitespace-no-wrap text-gray-900">
                        {booking.date}
                      </p>
                    </td>
                    <td className="border-b border-gray-200 bg-white px-5 py-5 text-center text-sm">
                      <p className="whitespace-no-wrap text-gray-900">
                        {booking.TimeSlotId}
                      </p>
                      <p className="whitespace-no-wrap text-gray-900">
                        {booking.TimeSlot.startTime}-{booking.TimeSlot.endTime}
                      </p>
                    </td>
                    <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                      <p className="whitespace-no-wrap text-gray-900">
                        {booking.reservedBy}
                      </p>
                    </td>
                    <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                      <span
                        className={`relative inline-block rounded-full px-3 py-1 font-semibold leading-tight ${
                          booking.status === "checked-out"
                            ? "bg-green-200 text-green-900"
                            : booking.status === "confirmed"
                              ? "bg-orange-200 text-orange-900"
                              : booking.status === "pending"
                                ? "bg-orange-200 text-orange-900"
                                : "bg-red-200 text-red-900"
                        }`}
                      >
                        <span
                          aria-hidden
                          className="absolute inset-0 rounded-full opacity-50"
                        ></span>
                        <span className="relative">{booking.status}</span>
                      </span>
                    </td>
                    <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                      <p className="whitespace-no-wrap text-gray-900">
                        {booking.tableId}
                      </p>
                    </td>
                    <td className="border-b border-gray-200 bg-white px-5 py-5 text-right text-sm">
                      <button
                        type="button"
                        className="inline-block text-gray-500 hover:text-gray-700"
                      >
                        <svg
                          className="inline-block h-6 w-6 fill-current"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 6a2 2 0 110-4 2 2 0 010 4zm0 8a2 2 0 110-4 2 2 0 010 4zm-2 6a2 2 0 104 0 2 2 0 00-4 0z" />
                        </svg>
                      </button>
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

export default BookingTable;
