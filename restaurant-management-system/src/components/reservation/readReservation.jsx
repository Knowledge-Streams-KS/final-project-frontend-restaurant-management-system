import React, { useEffect, useState } from "react";
import axiosInstance from "../../axios/axios";
import AddReservation from "./addReservation";
import DeleteReservation from "./deleteReservation";
import { BeatLoader } from "react-spinners";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

const ReadReservation = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().slice(0, 10),
  ); // Default to current date
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axiosInstance.get("/reservations", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBookings(response.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();

    const handleReservationCreated = (newReservation) => {
      console.log("New reservation created:", newReservation);
      setBookings((prevBookings) => [newReservation, ...prevBookings]);
    };

    const handleReservationUpdated = (updatedReservation) => {
      console.log("Reservation updated:", updatedReservation);
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking.id === updatedReservation.reservationId
            ? { ...booking, status: updatedReservation.status }
            : booking,
        ),
      );
    };

    const handleReservationDeleted = ({ id }) => {
      console.log("Reservation deleted:", id);
      setBookings((prevBookings) =>
        prevBookings.filter((booking) => booking.id !== id),
      );
    };

    socket.on("reservationCreated", handleReservationCreated);
    socket.on("reservationUpdated", handleReservationUpdated);
    socket.on("reservationDeleted", handleReservationDeleted);

    return () => {
      socket.off("reservationCreated", handleReservationCreated);
      socket.off("reservationUpdated", handleReservationUpdated);
      socket.off("reservationDeleted", handleReservationDeleted);
    };
  }, []);

  const filteredBookings = bookings
    .filter((booking) =>
      `${booking.Customer?.firstName || ""} ${booking.Customer?.lastName || ""}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()),
    )
    .filter((booking) => booking.date === selectedDate);

  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  const currentBookings = filteredBookings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <AddReservation fetchBookings={fetchBookings} />
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
          <input
            type="date"
            className="ml-4 mt-4 rounded-lg border border-gray-300 px-4 py-2"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
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
                  <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">
                    Seats
                  </th>
                  <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="10" className="px-5 py-5">
                      <div className="flex h-full items-center justify-center">
                        <BeatLoader color="#111827" />
                      </div>
                    </td>
                  </tr>
                ) : currentBookings.length > 0 ? (
                  currentBookings.map((booking) => (
                    <tr className="border-b border-gray-200" key={booking.id}>
                      <td className="bg-white px-5 py-5 text-sm">
                        <div className="flex">
                          <div className="ml-3">
                            <p className="whitespace-no-wrap text-gray-900">
                              {`${booking.Customer?.firstName || ""} ${booking.Customer?.lastName || ""}`}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="bg-white px-5 py-5 text-sm">
                        <p className="whitespace-no-wrap text-gray-900">
                          {booking.Customer?.phoneNo || ""}
                        </p>
                      </td>
                      <td className="bg-white px-5 py-5 text-sm">
                        <p className="whitespace-no-wrap text-gray-900">
                          {booking.Customer?.email || ""}
                        </p>
                      </td>
                      <td className="bg-white px-5 py-5 text-sm">
                        <p className="whitespace-no-wrap text-gray-900">
                          {booking.date}
                        </p>
                      </td>
                      <td className="bg-white px-5 py-5 text-center text-sm">
                        <p className="whitespace-no-wrap text-gray-900">
                          {booking.TimeSlotId}
                        </p>
                        <p className="whitespace-no-wrap text-gray-900">
                          {booking.TimeSlot?.startTime || ""} -{" "}
                          {booking.TimeSlot?.endTime || ""}
                        </p>
                      </td>
                      <td className="bg-white px-5 py-5 text-sm">
                        <p className="whitespace-no-wrap text-gray-900">
                          {booking.reservedBy}
                        </p>
                      </td>
                      <td className="bg-white px-5 py-5 text-sm">
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
                      <td className="bg-white px-5 py-5 text-sm">
                        <p className="whitespace-no-wrap text-gray-900">
                          {booking.tableId}
                        </p>
                      </td>
                      <td className="bg-white px-5 py-5 text-sm">
                        <p className="whitespace-no-wrap text-gray-900">
                          {booking.seats}
                        </p>
                      </td>
                      <td className="flex justify-center px-5 py-5 text-center text-sm">
                        <DeleteReservation
                          bookingId={booking.id}
                          fetchBookings={fetchBookings}
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="10" className="px-5 py-5 text-center text-sm">
                      No bookings found for the selected date.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <div className="my-4 flex justify-center">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  className={`mx-1 rounded px-3 py-1 ${
                    currentPage === index + 1
                      ? "bg-blue-500 text-white"
                      : "bg-gray-300 text-gray-700"
                  }`}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadReservation;
