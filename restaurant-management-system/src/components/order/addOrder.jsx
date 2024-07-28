import { Fragment, useState, useEffect, useContext } from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as yup from "yup";
import toast from "react-hot-toast";
import axiosInstance from "../../axios/axios";
import { BeatLoader } from "react-spinners";

const AddOrder = ({ fetchOrders, userId }) => {
  const [loading, setLoading] = useState(false);
  const [reservations, setReservations] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [uniqueTypes, setUniqueTypes] = useState([]);
  const [selectedTitle, setSelectedTitle] = useState("");
  const token = localStorage.getItem("token");

  const fetchReservations = async () => {
    try {
      const response = await axiosInstance.get("/reservations", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const checkedInReservations = response.data.filter(
        (reservation) =>
          (reservation.status === "checked-in" ||
            reservation.status === "confirmed") &&
          reservation.Customer.Orders.length === 0,
      );
      setReservations(checkedInReservations || []);
    } catch (error) {
      console.error("Error fetching reservations:", error);
    }
  };

  const fetchRecipes = async () => {
    try {
      const response = await axiosInstance.get("/recipes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRecipes(response.data.allRecipe || []);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  useEffect(() => {
    fetchReservations();
    fetchRecipes();
  }, []);

  useEffect(() => {
    const types = Array.from(new Set(recipes.map((recipe) => recipe.type)));
    setUniqueTypes(types);
  }, [recipes]);

  const initialValues = {
    userId: "",
    customerId: "",
    orderItems: [{ type: "", title: "", size: "", recipeId: "", quantity: 1 }],
  };

  const validationSchema = yup.object().shape({
    customerId: yup.string().required("Customer ID is required"),
    orderItems: yup.array().of(
      yup.object().shape({
        type: yup.string().required("Type is required"),
        title: yup.string().required("Title is required"),
        size: yup.string().required("Size is required"),
        recipeId: yup.string().required("Recipe ID is required"),
        quantity: yup
          .number()
          .min(1, "Quantity must be at least 1")
          .required("Quantity is required"),
      }),
    ),
  });

  const handleSubmit = async (values, { resetForm }) => {
    setLoading(true);
    try {
      const orderData = {
        userId: userId,
        customerId: values.customerId,
        orderItems: values.orderItems.map((item) => ({
          recipeId: item.recipeId,
          quantity: item.quantity,
        })),
      };
      const response = await axiosInstance.post("/order", orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success(response.data.message || "Order added successfully.");
      fetchOrders();
      fetchReservations(); // Re-fetch reservations after adding the order

      resetForm();
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to add order.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleTypeChange = (setFieldValue, value) => {
    setSelectedType(value);
    setSelectedTitle("");
    setFieldValue("title", "");
    setFieldValue("size", "");
    setFieldValue("recipeId", "");
  };

  const handleTitleChange = (setFieldValue, value) => {
    setSelectedTitle(value);
    setFieldValue("size", "");
    setFieldValue("recipeId", "");
  };

  return (
    <Fragment>
      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto text-center">
          <h1 className="mb-8 text-center text-2xl font-bold text-gray-900 sm:text-3xl lg:text-4xl">
            Add Order
          </h1>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, setFieldValue }) => (
              <Form className="rounded-lg bg-white px-8 py-8 pt-8 shadow-md">
                <div className="mb-4">
                  <Field
                    as="select"
                    name="customerId"
                    className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring focus:ring-gray-300"
                  >
                    <option value="">Select Customer</option>
                    {reservations.map((reservation) => (
                      <option
                        key={reservation.customerId}
                        value={reservation.customerId}
                      >
                        {reservation.customerId}-
                        {reservation.Customer.firstName}{" "}
                        {reservation.Customer.lastName} Table No.
                        {reservation.tableId}
                      </option>
                    ))}
                  </Field>
                  <p className="mt-1 text-sm text-red-600">
                    <ErrorMessage name="customerId" />
                  </p>
                </div>
                <FieldArray name="orderItems">
                  {({ remove, push }) => (
                    <div className="mb-2">
                      {values.orderItems.map((item, index) => (
                        <div
                          key={index}
                          className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-4"
                        >
                          <div>
                            <Field
                              as="select"
                              name={`orderItems.${index}.type`}
                              className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring focus:ring-gray-300"
                              onChange={(e) => {
                                setFieldValue(
                                  `orderItems.${index}.type`,
                                  e.target.value,
                                );
                                handleTypeChange(setFieldValue, e.target.value);
                              }}
                            >
                              <option value="">Select Type</option>
                              {uniqueTypes.map((type) => (
                                <option key={type} value={type}>
                                  {type}
                                </option>
                              ))}
                            </Field>
                            <p className="mt-1 text-sm text-red-600">
                              <ErrorMessage name={`orderItems.${index}.type`} />
                            </p>
                          </div>
                          <div>
                            <Field
                              as="select"
                              name={`orderItems.${index}.title`}
                              className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring focus:ring-gray-300"
                              onChange={(e) => {
                                setFieldValue(
                                  `orderItems.${index}.title`,
                                  e.target.value,
                                );
                                handleTitleChange(
                                  setFieldValue,
                                  e.target.value,
                                );
                              }}
                              disabled={!selectedType}
                            >
                              <option value="">Select Title</option>
                              {recipes
                                .filter(
                                  (recipe) => recipe.type === selectedType,
                                )
                                .map((recipe) => (
                                  <option
                                    key={recipe.recipeId}
                                    value={recipe.title}
                                  >
                                    {recipe.title}
                                  </option>
                                ))}
                            </Field>
                            <p className="mt-1 text-sm text-red-600">
                              <ErrorMessage
                                name={`orderItems.${index}.title`}
                              />
                            </p>
                          </div>
                          <div>
                            <Field
                              as="select"
                              name={`orderItems.${index}.size`}
                              className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring focus:ring-gray-300"
                              onChange={(e) => {
                                const selectedRecipe = recipes.find(
                                  (recipe) =>
                                    recipe.title === selectedTitle &&
                                    recipe.size === e.target.value,
                                );
                                setFieldValue(
                                  `orderItems.${index}.size`,
                                  e.target.value,
                                );
                                setFieldValue(
                                  `orderItems.${index}.recipeId`,
                                  selectedRecipe ? selectedRecipe.recipeId : "",
                                );
                              }}
                              disabled={!selectedTitle}
                            >
                              <option value="">Select Size</option>
                              {recipes
                                .filter(
                                  (recipe) => recipe.title === selectedTitle,
                                )
                                .map((recipe) => (
                                  <option
                                    key={recipe.recipeId}
                                    value={recipe.size}
                                  >
                                    {recipe.size}
                                  </option>
                                ))}
                            </Field>
                            <p className="mt-1 text-sm text-red-600">
                              <ErrorMessage name={`orderItems.${index}.size`} />
                            </p>
                          </div>
                          <div>
                            <Field
                              type="number"
                              name={`orderItems.${index}.quantity`}
                              placeholder="Quantity"
                              className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring focus:ring-gray-300"
                            />
                            <p className="mt-1 text-sm text-red-600">
                              <ErrorMessage
                                name={`orderItems.${index}.quantity`}
                              />
                            </p>
                          </div>
                          <div className="flex items-center">
                            <button
                              type="button"
                              className="rounded-lg bg-red-500 px-4 py-2 text-white"
                              onClick={() => remove(index)}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      ))}
                      <button
                        type="button"
                        className="mt-4 rounded-lg bg-blue-500 px-4 py-2 text-white"
                        onClick={() =>
                          push({
                            type: "",
                            title: "",
                            size: "",
                            recipeId: "",
                            quantity: 1,
                          })
                        }
                      >
                        Add Order Item
                      </button>
                    </div>
                  )}
                </FieldArray>

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
                    "Add Order"
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

export default AddOrder;
