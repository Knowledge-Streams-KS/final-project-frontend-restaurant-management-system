import React, { Fragment } from "react";
import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import * as yup from "yup";
import toast from "react-hot-toast";
import axiosInstance from "../../axios/axios";

const AddOrderTable = ({ fetchOrderTables }) => {
  const initialValues = {
    tableNo: "",
    seats: 5,
  };

  const validationSchema = yup.object().shape({
    tableNo: yup.number().min(1, "Table No must start from 1").required(),
    seats: yup.number().min(2, "Seats must be at least 2").required(),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const response = await axiosInstance.post("/ordertable", values);
      const successMessage =
        response.data.message || "Table added successfully.";
      toast.success(successMessage);
      fetchOrderTables();
      resetForm();
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to add Table.";
      toast.error(errorMessage);
    }
  };

  return (
    <Fragment>
      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto text-center">
          <h1 className="mb-8 text-center text-2xl font-bold text-gray-900 sm:text-3xl lg:text-4xl">
            Add Order Table
          </h1>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form className="rounded-lg bg-white px-8 py-8 pt-8 shadow-md">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="mb-4">
                  <label
                    htmlFor="tableNo"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Table No
                  </label>
                  <Field
                    id="tableNo"
                    name="tableNo"
                    type="number"
                    placeholder="Enter Table No"
                    className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring focus:ring-gray-300"
                  />
                  <ErrorMessage
                    name="tableNo"
                    component="p"
                    className="mt-1 text-sm text-red-600"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="seats"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Seats
                  </label>
                  <Field
                    id="seats"
                    name="seats"
                    type="number"
                    placeholder="Enter Seats"
                    className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring focus:ring-gray-300"
                  />
                  <ErrorMessage
                    name="seats"
                    component="p"
                    className="mt-1 text-sm text-red-600"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="mr-4 mt-4 w-full rounded-lg bg-green-500 px-4 py-3 text-white transition-colors hover:bg-green-600 md:mt-0 md:w-auto"
              >
                Add Order Table
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </Fragment>
  );
};

export default AddOrderTable;
