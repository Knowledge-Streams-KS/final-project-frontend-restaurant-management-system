import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import axiosInstance from "../../axios/axios";
import toast from "react-hot-toast";

const AddSalary = ({ employeeId, fetchSalaries, onEdit }) => {
  const validationSchema = yup.object().shape({
    salary: yup
      .number()
      .min(1, "Salary amount must be at least 1")
      .required("Salary amount is required"),
  });

  const initialValues = {
    employeeId: employeeId,
    salary: "",
  };

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const response = await axiosInstance.post(`/salaries`, values);
      const successMessage =
        response.data.message || "Salary added successfully.";
      toast.success(successMessage);
      fetchSalaries();
      onEdit(null);
      resetForm();
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to add salary.";
      toast.error(errorMessage);
    }
  };

  const handleCancel = () => {
    onEdit(null); // Close the form
  };

  return (
    <div className="my-4">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="rounded-md border bg-gray-100 p-4">
          <h2 className="mb-2 text-lg font-semibold">Add Salary</h2>
          <Field
            name="salary"
            type="number"
            placeholder="Salary Amount"
            className="rounded-lg border px-3 py-2 focus:outline-none focus:ring focus:ring-gray-300"
          />
          <ErrorMessage
            name="salary"
            component="p"
            className="mt-1 text-sm text-red-600"
          />
          <div className="mt-3">
            <button
              type="submit"
              className="mr-2 flex-1 rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
            >
              Add Salary
            </button>
            <button
              type="button"
              className="flex-1 rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default AddSalary;
