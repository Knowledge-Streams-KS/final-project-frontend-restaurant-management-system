import { Fragment, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import toast from "react-hot-toast";
import axiosInstance from "../../axios/axios";
import { BeatLoader } from "react-spinners";

const AddIngredientsCode = ({ fetchIngredientsCode }) => {
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  const initialValues = {
    name: "",
    code: "",
    unit: "",
  };
  const validationSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    code: yup.string().required("Code is required"),
    unit: yup.string().required("Unit is required"),
  });
  const handleSubmit = async (values, { resetForm }) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post("/ingredients/code", values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const successMessage =
        response.data.message || "Ingredient added successfully.";
      toast.success(successMessage);
      fetchIngredientsCode();
      resetForm();
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to add ingredient.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Fragment>
      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto text-center">
          <h1 className="mb-8 text-center text-2xl font-bold text-gray-900 sm:text-3xl lg:text-4xl">
            Add Ingredient
          </h1>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form className="rounded-lg bg-white px-8 py-8 pt-8 shadow-md">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="mb-4">
                  <Field
                    type="text"
                    name="name"
                    placeholder="Ingredient Name"
                    className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring focus:ring-gray-300"
                  />
                  <p className="mt-1 text-sm text-red-600">
                    <ErrorMessage name="name" />
                  </p>
                </div>
                <div className="mb-4">
                  <Field
                    type="text"
                    name="code"
                    placeholder="Ingredient Code"
                    className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring focus:ring-gray-300"
                  />
                  <p className="mt-1 text-sm text-red-600">
                    <ErrorMessage name="code" />
                  </p>
                </div>
                <div className="mb-4">
                  <Field
                    type="text"
                    name="unit"
                    placeholder="Unit"
                    className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring focus:ring-gray-300"
                  />
                  <p className="mt-1 text-sm text-red-600">
                    <ErrorMessage name="unit" />
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
                  "Add Ingredients"
                )}
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </Fragment>
  );
};

export default AddIngredientsCode;
