import React, { useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import axiosInstance from "../../axios/axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const UpdateOrderBill = ({ orderId, fetchOrders, onEdit }) => {
  const [editMode, setEditMode] = useState(true);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const validationSchema = yup.object().shape({
    paymentMethod: yup.string().required("Please select a payment method."),
  });

  const initialValues = {
    paymentMethod: "",
  };

  const handleSubmit = async (values) => {
    try {
      const response = await axiosInstance.put(
        `/order/bill/${orderId}`,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const successMessage =
        response.data.message || "Order completed successfully.";
      toast.success(successMessage);
      fetchOrders();

      navigate(`/order/bill/${orderId}`);

      setEditMode(false);
      onEdit(null);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to update order.";
      toast.error(errorMessage);
    }
  };

  const handleCancel = () => {
    setEditMode(false);
    onEdit(null);
  };

  const handleEdit = () => {
    setEditMode(true);
    onEdit(orderId);
  };

  return (
    <div className="my-4">
      {!editMode ? (
        <button
          className="rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600"
          onClick={handleEdit}
        >
          Get Bill
        </button>
      ) : (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, values }) => (
            <Form className="rounded-md border bg-gray-100 p-4">
              <h2 className="mb-2 text-lg font-semibold">
                Update Order Payment Method
              </h2>
              <div className="mb-4">
                <button
                  type="button"
                  className={`mr-2 rounded px-3 py-1 ${
                    values.paymentMethod === "cash"
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  } hover:bg-green-600`}
                  onClick={() => setFieldValue("paymentMethod", "cash")}
                >
                  Cash
                </button>
                <button
                  type="button"
                  className={`rounded px-3 py-1 ${
                    values.paymentMethod === "card"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  } hover:bg-blue-600`}
                  onClick={() => setFieldValue("paymentMethod", "card")}
                >
                  Card
                </button>
              </div>
              <ErrorMessage
                name="paymentMethod"
                component="p"
                className="mt-1 text-sm text-red-600"
              />

              <div className="mt-3">
                <button
                  type="submit"
                  className="mr-2 flex-1 rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
                >
                  Generate Bill
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
          )}
        </Formik>
      )}
    </div>
  );
};

export default UpdateOrderBill;
