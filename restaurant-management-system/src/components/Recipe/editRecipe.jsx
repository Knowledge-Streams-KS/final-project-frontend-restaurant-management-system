import React, { useState, useEffect } from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as yup from "yup";
import axiosInstance from "../../axios/axios";
import toast from "react-hot-toast";

const EditRecipe = ({ recipeId, fetchRecipes, onEdit }) => {
  const token = localStorage.getItem("token");
  const [editMode, setEditMode] = useState(true);
  const [ingredientCodes, setIngredientCodes] = useState([]);
  const initialValues = {
    type: "",
    title: "",
    size: "",
    price: "",
    recipeId: recipeId,
    ingredients: [{ code: "", quantity: "" }],
  };

  useEffect(() => {
    const fetchIngredientCodes = async () => {
      try {
        const response = await axiosInstance.get("/ingredients/code", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setIngredientCodes(response.data.ingredients || []);
      } catch (error) {
        console.error("Error fetching ingredient codes:", error);
      }
    };
    fetchIngredientCodes();
  }, [recipeId]);

  const validationSchema = yup.object().shape({
    type: yup.string(),
    title: yup.string(),
    size: yup
      .string()
      .oneOf(["small", "medium", "large"])
      .required("Size is required"),
    price: yup.number().min(1, "Price must be at least 1"),
    ingredients: yup.array().of(
      yup.object().shape({
        code: yup.string(),
        quantity: yup.number().min(1, "Quantity must be at least 1"),
      }),
    ),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const response = await axiosInstance.put(`/recipe/${recipeId}`, values);
      const successMessage =
        response.data.message || "Recipe updated successfully.";
      toast.success(successMessage);
      fetchRecipes();
      setEditMode(false);
      onEdit(null);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to update Recipe";
      toast.error(errorMessage);
    }
  };

  const handleCancel = () => {
    setEditMode(false);
    onEdit(null);
  };

  const handleEdit = () => {
    setEditMode(true);
    onEdit(recipeId);
  };

  return (
    <div className="my-4">
      {editMode ? (
        <Formik
          initialValues={initialValues}
          enableReinitialize
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values }) => (
            <Form className="rounded-lg bg-white px-8 py-8 pt-8 shadow-md">
              <h2 className="mb-8 text-4xl font-bold text-gray-900">
                Edit Recipe
              </h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="mb-4">
                  <Field
                    type="text"
                    name="title"
                    placeholder="Title"
                    className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring focus:ring-gray-300"
                  />
                  <p className="mt-1 text-sm text-red-600">
                    <ErrorMessage name="title" />
                  </p>
                </div>
                <div className="mb-4">
                  <Field
                    as="select"
                    name="size"
                    className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring focus:ring-gray-300"
                  >
                    <option value="">Select Size</option>
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                  </Field>
                  <p className="mt-1 text-sm text-red-600">
                    <ErrorMessage name="size" />
                  </p>
                </div>
                <div className="mb-4">
                  <Field
                    type="text"
                    name="type"
                    placeholder="Type"
                    className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring focus:ring-gray-300"
                  />
                  <p className="mt-1 text-sm text-red-600">
                    <ErrorMessage name="type" />
                  </p>
                </div>
                <div className="mb-4">
                  <Field
                    type="number"
                    name="price"
                    placeholder="Price"
                    className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring focus:ring-gray-300"
                  />
                  <p className="mt-1 text-sm text-red-600">
                    <ErrorMessage name="price" />
                  </p>
                </div>
                <div className="mb-4">
                  <Field
                    type="text"
                    name="recipeId"
                    placeholder="Recipe ID"
                    className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring focus:ring-gray-300"
                    disabled
                  />
                </div>
              </div>

              <div className="mb-4">
                <FieldArray name="ingredients">
                  {({ remove, push }) => (
                    <div>
                      {values.ingredients.map((ingredient, index) => (
                        <div
                          key={index}
                          className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3"
                        >
                          <div>
                            <Field
                              as="select"
                              name={`ingredients.${index}.code`}
                              className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring focus:ring-gray-300"
                            >
                              <option value="">Select Ingredient Code</option>
                              {ingredientCodes.map((ingredient) => (
                                <option
                                  key={ingredient.id}
                                  value={ingredient.code}
                                >
                                  {ingredient.code}
                                </option>
                              ))}
                            </Field>
                            <p className="mt-1 text-sm text-red-600">
                              <ErrorMessage
                                name={`ingredients.${index}.code`}
                              />
                            </p>
                          </div>
                          <div>
                            <Field
                              type="number"
                              name={`ingredients.${index}.quantity`}
                              placeholder="Quantity"
                              className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring focus:ring-gray-300"
                            />
                            <p className="mt-1 text-sm text-red-600">
                              <ErrorMessage
                                name={`ingredients.${index}.quantity`}
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
                        onClick={() => push({ code: "", quantity: "" })}
                      >
                        Add Ingredient
                      </button>
                    </div>
                  )}
                </FieldArray>
              </div>

              <div className="flex justify-end">
                <button
                  className="mr-2 rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
                  type="submit"
                >
                  Update Recipe
                </button>
                <button
                  className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                  type="button"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            </Form>
          )}
        </Formik>
      ) : (
        <button
          className="rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600"
          onClick={handleEdit}
        >
          Edit Recipe
        </button>
      )}
    </div>
  );
};

export default EditRecipe;
