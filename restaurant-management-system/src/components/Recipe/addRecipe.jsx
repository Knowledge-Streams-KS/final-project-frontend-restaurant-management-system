import { Fragment, useState, useEffect } from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as yup from "yup";
import toast from "react-hot-toast";
import axiosInstance from "../../axios/axios";

const AddRecipe = ({ fetchRecipes }) => {
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
    type: "",
    title: "",
    size: "",
    price: "",
    recipeId: "",
    ingredients: [{ code: "", quantity: "" }],
  };

  const validationSchema = yup.object().shape({
    type: yup.string().required("Type is required"),
    title: yup.string().required("Title is required"),
    size: yup
      .string()
      .oneOf(["small", "medium", "large"])
      .required("Size is required"),
    price: yup
      .number()
      .min(1, "Price must be at least 1")
      .required("Price is required"),
    recipeId: yup.string().required("Recipe ID is required"),
    ingredients: yup.array().of(
      yup.object().shape({
        code: yup.string().required("Ingredient code is required"),
        quantity: yup
          .number()
          .min(1, "Quantity must be at least 1")
          .required("Quantity is required"),
      }),
    ),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      console.log(values);
      const response = await axiosInstance.post("/recipe", values);
      const successMessage =
        response.data.message || "Recipe added successfully.";
      toast.success(successMessage);
      fetchRecipes();
      resetForm();
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to add Recipe";
      toast.error(errorMessage);
    }
  };

  return (
    <Fragment>
      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto text-center">
          <h1 className="mb-8 text-center text-2xl font-bold text-gray-900 sm:text-3xl lg:text-4xl">
            Add Recipe
          </h1>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, setFieldValue }) => (
              <Form className="rounded-lg bg-white px-8 py-8 pt-8 shadow-md">
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
                      placeholder="type"
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
                    />
                    <p className="mt-1 text-sm text-red-600">
                      <ErrorMessage name="recipeId" />
                    </p>
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

                <button
                  className="px-3font-semibold mt-4 w-full rounded-lg bg-gray-500 px-4 py-3 text-white transition-colors hover:bg-gray-600 md:mt-0 md:w-auto"
                  type="submit"
                >
                  Add Recipe
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </Fragment>
  );
};

export default AddRecipe;
