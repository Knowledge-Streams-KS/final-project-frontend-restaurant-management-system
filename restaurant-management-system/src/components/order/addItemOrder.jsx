import { Fragment, useState, useEffect } from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as yup from "yup";
import toast from "react-hot-toast";
import axiosInstance from "../../axios/axios";

const AddItemOrder = ({ fetchOrders, orderId, onEdit }) => {
  const [recipes, setRecipes] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [uniqueTypes, setUniqueTypes] = useState([]);
  const [selectedTitle, setSelectedTitle] = useState("");
  const [editMode, setEditMode] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axiosInstance.get("/recipes");
        setRecipes(response.data.allRecipe || []);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

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
    try {
      const orderData = {
        userId: 3, // Assuming user ID is provided by the context or props

        orderItems: values.orderItems.map((item) => ({
          recipeId: item.recipeId,
          quantity: item.quantity,
        })),
      };
      const response = await axiosInstance.put(`/order/${orderId}`, orderData);
      console.log(orderData);
      toast.success(response.data.message || "Order Item added successfully.");
      resetForm();
      fetchOrders();
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to add order item.";
      toast.error(errorMessage);
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
  const handleCancel = () => {
    setEditMode(false);
    onEdit(null);
  };
  const handleEdit = () => {
    setEditMode(true);
    onEdit(orderId);
  };
  return (
    <Fragment>
      <div className="my-4">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue }) => (
            <Form className="rounded-md bg-gray-100 p-4 text-center shadow-md">
              <h2 className="mb-2 text-lg font-semibold">Add Order Item</h2>
              <FieldArray name="orderItems">
                {({ remove, push }) => (
                  <div>
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
                              handleTitleChange(setFieldValue, e.target.value);
                            }}
                            disabled={!selectedType}
                          >
                            <option value="">Select Title</option>
                            {recipes
                              .filter((recipe) => recipe.type === selectedType)
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
                            <ErrorMessage name={`orderItems.${index}.title`} />
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
                            className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                            onClick={() => remove(index)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                    <button
                      type="button"
                      className="mt-4 rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
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
                    <button
                      type="button"
                      className="flex-1 rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </FieldArray>
              <button
                className="mt-4 w-full rounded-lg bg-gray-500 px-4 py-3 font-semibold text-white transition-colors hover:bg-gray-600 md:mt-0 md:w-auto"
                type="submit"
              >
                Add Order
              </button>
            </Form>
          )}
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
    </Fragment>
  );
};

export default AddItemOrder;
