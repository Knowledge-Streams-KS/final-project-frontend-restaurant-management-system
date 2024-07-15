import { Fragment } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import toast from "react-hot-toast";
import axiosInstance from "../../axios/axios";

const AddIngredientsCode = ({ fetchIngredientsCode }) => {
  // const {user}=

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
    try {
      const response = await axiosInstance.post("/ingredients/code", values);
      const successMessage =
        response.data.message || "Ingredient added successfully.";
      toast.success(successMessage);
      fetchIngredientsCode();
      resetForm();
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to add ingredient.";
      toast.error(errorMessage);
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
                className="px-3font-semibold mt-4 w-full rounded-lg bg-gray-500 px-4 py-3 text-white transition-colors hover:bg-gray-600 md:mt-0 md:w-auto"
                type="submit"
              >
                Add Ingredient
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </Fragment>
  );
};

export default AddIngredientsCode;
