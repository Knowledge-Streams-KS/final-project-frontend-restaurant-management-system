import { Fragment, useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import toast from "react-hot-toast";

import "react-datepicker/dist/react-datepicker.css";
import axiosInstance from "../../axios/axios";
import { BeatLoader } from "react-spinners";

const AddReservation = ({ fetchBookings }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const initialValues = {
    fName: "",
    lName: "",
    email: "",
    phoneNo: "",
    date: currentDate,
    reservedBy: "employee",
    TimeSlotId: "2",
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
    seats: yup
      .number()
      .positive("Number of seats should be a positive number")
      .integer("Number of seats should be an integer")
      .required("Number of seats is required"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      const response = await axiosInstance.post("/reservation", values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const successMessage =
        response.data.message || "Reservation added successfully.";
      toast.success(successMessage);
      fetchBookings();
      resetForm();
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to add Reservation";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Fragment>
      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto text-center">
          <h1 className="mb-8 text-4xl font-bold text-gray-900">
            Add Reservation
          </h1>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, setFieldValue }) => (
              <Form className="rounded-lg bg-white px-8 py-8 pt-8 shadow-md">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
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
                  className={`w-1/4 rounded-lg py-3 font-semibold text-white transition-colors ${
                    loading
                      ? "cursor-not-allowed bg-gray-400"
                      : "bg-gray-500 hover:bg-gray-600"
                  }`}
                  type="submit"
                  disabled={loading}
                >
                  {loading ? (
                    <BeatLoader size={10} color="#ffffff" />
                  ) : (
                    "Add Reservation"
                  )}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </Fragment>
  );
};

export default AddReservation;
