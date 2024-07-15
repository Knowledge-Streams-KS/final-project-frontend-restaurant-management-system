import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import axiosInstance from "../../axios/axios";
import toast from "react-hot-toast";

const EditOrderTable = ({ tableId, fetchOrderTables, onEdit }) => {
  const [editMode, setEditMode] = useState(true);

  const validationSchema = yup.object().shape({
    seats: yup.number().min(2, "Seats must be at least 2").required(),
  });

  const initialValues = {
    seats: "",
  };

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const response = await axiosInstance.put(
        `/ordertable/${tableId}`,
        values,
      );
      const successMessage =
        response.data.message || "Table updated successfully.";
      toast.success(successMessage);
      fetchOrderTables();
      setEditMode(false);
      onEdit(null);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to update table.";
      toast.error(errorMessage);
    }
  };

  const handleCancel = () => {
    setEditMode(false);
    onEdit(null);
  };

  const handleEdit = () => {
    setEditMode(true);
    onEdit(tableId);
  };

  return (
    <div className="my-4">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="rounded-md border bg-gray-100 p-4">
          <h2 className="mb-2 text-lg font-semibold">Update Table Seats</h2>
          <Field
            name="seats"
            type="number"
            placeholder="Seats"
            className="rounded-lg border px-3 py-2 focus:outline-none focus:ring focus:ring-gray-300"
          />
          <ErrorMessage
            name="seats"
            component="p"
            className="mt-1 text-sm text-red-600"
          />

          <div className="mt-3 flex">
            <button
              type="submit"
              className="mr-2 flex-1 rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
            >
              Update
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

      {!editMode && (
        <button
          className="rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600"
          onClick={handleEdit}
        >
          Edit
        </button>
      )}
    </div>
  );
};

export default EditOrderTable;
