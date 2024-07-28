import React, { Fragment, useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import toast from "react-hot-toast";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axiosInstance from "../../axios/axios";
import { io } from "socket.io-client";

const ReservationCustomer = ({ toggleOTPForm }) => {
  const [timeSlots, setTimeSlots] = useState([]);
  const [filteredTimeSlots, setFilteredTimeSlots] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [loading, setLoading] = useState(false);

  const socket = io("http://localhost:3000"); // Adjust the URL to your backend

  useEffect(() => {
    const fetchTimeSlots = async () => {
      try {
        const response = await axiosInstance.get("/timeslots");
        setTimeSlots(response.data || []);
        setFilteredTimeSlots(filterTimeSlots(new Date(), response.data || []));
      } catch (error) {
        console.error("Error fetching time slots:", error);
      }
    };

    fetchTimeSlots();
  }, []);

  useEffect(() => {
    socket.on("reservationCreated", (newReservation) => {
      // Handle real-time updates for new reservations

      // Update your state or UI as needed
    });

    socket.on("reservationUpdated", (updatedReservation) => {
      // Handle real-time updates for reservation updates

      // Update your state or UI as needed
    });

    socket.on("reservationDeleted", ({ id }) => {
      // Handle real-time updates for reservation deletions
  
      // Update your state or UI as needed
    });

    return () => {
      socket.off("reservationCreated");
      socket.off("reservationUpdated");
      socket.off("reservationDeleted");
    };
  }, [socket]);

  const initialValues = {
    fName: "",
    lName: "",
    email: "",
    phoneNo: "",
    date: currentDate,
    reservedBy: "customer",
    TimeSlotId: "",
    seats: "",
  };

  const validationSchema = yup.object().shape({
    fName: yup.string().required("First Name is required"),
    lName: yup.string().required("Last Name is required"),
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    phoneNo: yup
      .string()
      .matches(/^\d{11}$/, "Phone number must be exactly 11 digits")
      .required("Phone number is required"),
    date: yup.date().required("Date is required"),
    TimeSlotId: yup.string().required("Time Slot is required"),
    seats: yup
      .number()
      .positive("Number of seats should be a positive number")
      .integer("Number of seats should be an integer")
      .required("Number of seats is required"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    setLoading(true);
    try {
      console.log(values);
      const response = await axiosInstance.post("/reservation", values);
      const successMessage =
        response.data.message || "Reservation added successfully.";
      toast.success(successMessage);
      resetForm();
      toggleOTPForm(values.email);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to add Reservation";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const filterDate = (date) => {
    const today = new Date();
    const currentDate = new Date(today.toDateString());
    const futureDate = new Date();
    futureDate.setDate(currentDate.getDate() + 6);
    const selectedDate = new Date(date.toDateString());
    return selectedDate >= currentDate && selectedDate <= futureDate;
  };

  const filterTimeSlots = (date, timeSlots) => {
    const today = new Date();
    const selectedDate = new Date(date);
    if (selectedDate.toDateString() === today.toDateString()) {
      const currentTime = today.getHours() + ":" + today.getMinutes();
      return timeSlots.filter((slot) => slot.startTime >= currentTime);
    }
    return timeSlots;
  };

  return (
    <Fragment>
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-md text-center">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, setFieldValue }) => (
              <Form className="rounded-lg bg-white px-8 py-8 pt-8 shadow-md">
                <div className="">
                  <div className="mb-4">
                    <Field
                      type="text"
                      name="fName"
                      placeholder="First Name"
                      className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring focus:ring-gray-300"
                    />
                    <p className="mt-1 text-sm text-red-600">
                      <ErrorMessage name="fName" />
                    </p>
                  </div>
                  <div className="mb-4">
                    <Field
                      type="text"
                      name="lName"
                      placeholder="Last Name"
                      className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring focus:ring-gray-300"
                    />
                    <p className="mt-1 text-sm text-red-600">
                      <ErrorMessage name="lName" />
                    </p>
                  </div>
                  <div className="mb-4">
                    <Field
                      type="email"
                      name="email"
                      placeholder="Email"
                      className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring focus:ring-gray-300"
                    />
                    <p className="mt-1 text-sm text-red-600">
                      <ErrorMessage name="email" />
                    </p>
                  </div>
                  <div className="mb-4">
                    <Field
                      type="text"
                      name="phoneNo"
                      placeholder="Phone Number Format 03001234567"
                      className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring focus:ring-gray-300"
                    />
                    <p className="mt-1 text-sm text-red-600">
                      <ErrorMessage name="phoneNo" />
                    </p>
                  </div>
                  <div className="mb-4">
                    <DatePicker
                      selected={values.date}
                      onChange={(date) => {
                        setFieldValue("date", date);
                        setFilteredTimeSlots(filterTimeSlots(date, timeSlots));
                      }}
                      filterDate={filterDate}
                      dateFormat="yyyy/MM/dd"
                      className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring focus:ring-gray-300"
                      minDate={new Date()}
                      maxDate={
                        new Date(new Date().setDate(new Date().getDate() + 6))
                      }
                    />
                    <p className="mt-1 text-sm text-red-600">
                      <ErrorMessage name="date" />
                    </p>
                  </div>
                  <div className="mb-4">
                    <Field
                      as="select"
                      name="TimeSlotId"
                      className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring focus:ring-gray-300"
                    >
                      <option value="">Select Time Slot</option>
                      {filteredTimeSlots.map((slot) => (
                        <option key={slot.id} value={slot.id}>
                          {slot.startTime}-{slot.endTime}
                        </option>
                      ))}
                    </Field>
                    <p className="mt-1 text-sm text-red-600">
                      <ErrorMessage name="TimeSlotId" />
                    </p>
                  </div>
                  <div className="mb-4">
                    <Field
                      type="number"
                      name="seats"
                      placeholder="Seats"
                      className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring focus:ring-gray-300"
                    />
                    <p className="mt-1 text-sm text-red-600">
                      <ErrorMessage name="seats" />
                    </p>
                  </div>
                </div>
                <button
                  className={`w-full rounded-lg py-3 font-semibold text-white transition-colors ${
                    loading
                      ? "cursor-not-allowed bg-yellow-400"
                      : "bg-yellow-500 hover:bg-yellow-600"
                  }`}
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Please Wait..." : "Add Reservation"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </Fragment>
  );
};

export default ReservationCustomer;
