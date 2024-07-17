import { Fragment, useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import toast from "react-hot-toast";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axiosInstance from "../../axios/axios";

const AddInventory = ({ fetchInventory }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [ingredientCodes, setIngredientCodes] = useState([]);

  useEffect(() => {
    const fetchIngredientCodes = async () => {
      try {
        const response = await axiosInstance.get("/ingredients/code");
        setIngredientCodes(response.data.ingredients || []);
      } catch (error) {
        console.error("Error fetching ingredient codes:", error);
      }
    };

    fetchIngredientCodes();
  }, []);

  const initialValues = {
    ingredientsId: "",
    quantity: "",
    unitPrice: "",
    date: selectedDate,
  };

  const validationSchema = yup.object().shape({
    ingredientsId: yup.string().required("Ingredient ID is required"),
    quantity: yup
      .number()
      .min(1, "Quantity must be at least 1")
      .required("Quantity is required"),
    unitPrice: yup
      .number()
      .min(1, "Unit Price must be at least 1")
      .required("Unit Price is required"),
    date: yup.date().required("Date is required"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const token = localStorage.getItem("token");
      const formattedValues = {
        ...values,
        date: values.date.toLocaleDateString(),
      };
      const response = await axiosInstance.post("/inventory", formattedValues, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const successMessage =
        response.data.message || "Ingredient added successfully.";
      toast.success(successMessage);
      resetForm();
      fetchInventory();
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
            Add Inventory
          </h1>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue }) => (
              <Form className="rounded-lg bg-white px-8 py-8 pt-8 shadow-md">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div className="mb-4">
                    <Field
                      as="select"
                      name="ingredientsId"
                      className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring focus:ring-gray-300"
                    >
                      <option value="">Select Ingredient ID</option>
                      {ingredientCodes.map((ingredient) => (
                        <option key={ingredient.id} value={ingredient.code}>
                          {ingredient.code}
                        </option>
                      ))}
                    </Field>
                    <p className="mt-1 text-sm text-red-600">
                      <ErrorMessage name="ingredientsId" />
                    </p>
                  </div>
                  <div className="mb-4">
                    <Field
                      type="number"
                      name="quantity"
                      placeholder="Quantity"
                      className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring focus:ring-gray-300"
                    />
                    <p className="mt-1 text-sm text-red-600">
                      <ErrorMessage name="quantity" />
                    </p>
                  </div>
                  <div className="mb-4">
                    <Field
                      type="number"
                      name="unitPrice"
                      placeholder="Unit Price"
                      className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring focus:ring-gray-300"
                    />
                    <p className="mt-1 text-sm text-red-600">
                      <ErrorMessage name="unitPrice" />
                    </p>
                  </div>
                  <div className="mb-4 flex">
                    <DatePicker
                      selected={selectedDate}
                      onChange={(date) => {
                        setSelectedDate(date);
                        setFieldValue("date", date);
                      }}
                      dateFormat="MM/dd/yyyy"
                      className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring focus:ring-gray-300"
                    />
                    <p className="mt-1 text-sm text-red-600">
                      <ErrorMessage name="date" />
                    </p>
                  </div>
                </div>
                <button
                  className="px-3font-semibold mt-4 w-full rounded-lg bg-gray-500 px-4 py-3 text-white transition-colors hover:bg-gray-600 md:mt-0 md:w-auto"
                  type="submit"
                >
                  Add Inventory
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </Fragment>
  );
};

export default AddInventory;
