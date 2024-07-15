import React, { useState, useEffect } from "react";
import BookingTable from "../components/reservation";
import axiosInstance from "../axios/axios";
import ReservationForm from "../components/addReservation";

const Booking = () => {
  const [bookings, setBookings] = useState([]);
  const fetchBookings = async () => {
    try {
      const response = await axiosInstance.get("/reservations");
      setBookings(response.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };
  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="Booking">
      <ReservationForm refreshReservation={fetchBookings} />
      <BookingTable bookings={bookings} />
    </div>
  );
};

export default Booking;
