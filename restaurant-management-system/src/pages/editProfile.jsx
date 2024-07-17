import React, { Fragment, useContext, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import toast from "react-hot-toast";
import { AuthContext } from "../context/authContext";
import axiosInstance from "../axios/axios";

const EditUserForm = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [showPasswordFields, setShowPasswordFields] = useState(false);

  const initialValues = {
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    role: user?.role || "",
    salary: user?.salary || 0,
    oldPassword: "",
    newPassword: "",
  };

  const validationSchema = yup.object().shape({
    oldPassword: yup.string().required("Please Enter your old password"),
    newPassword: yup
      .string()
      .required("Please Enter your new password")
      .min(6)
      .matches(/[0-9]/, "Password requires a number")
      .matches(/[a-z]/, "Password requires a lowercase letter")
      .matches(/[A-Z]/, "Password requires an uppercase letter")
      .matches(/[^\w]/, "Password requires a symbol"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    setLoading(true);
    try {
      console.log(values);
      const response = await axiosInstance.put(`/user/${user.id}`, values);
      const successMessage =
        response.data.message || "Password updated successfully.";
      toast.success(successMessage);
      resetForm();
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to update password";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <Fragment>
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-center text-4xl font-bold text-yellow-500">
          User Profile
        </h1>
        <div className="mx-auto mt-8 px-6 py-8 text-center">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {() => (
              <Form className="rounded-lg bg-white px-8 py-8 pt-8 shadow-md">
                <div className="mb-4 grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-left font-bold text-gray-700">
                      First Name
                    </label>
                    <Field
                      type="text"
                      name="firstName"
                      className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring focus:ring-gray-300"
                      disabled
                    />
                  </div>
                  <div>
                    <label className="block text-left font-bold text-gray-700">
                      Last Name
                    </label>
                    <Field
                      type="text"
                      name="lastName"
                      className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring focus:ring-gray-300"
                      disabled
                    />
                  </div>
                  <div>
                    <label className="block text-left font-bold text-gray-700">
                      Email
                    </label>
                    <Field
                      type="email"
                      name="email"
                      className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring focus:ring-gray-300"
                      disabled
                    />
                  </div>
                  <div>
                    <label className="block text-left font-bold text-gray-700">
                      Role
                    </label>
                    <Field
                      type="text"
                      name="role"
                      className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring focus:ring-gray-300"
                      disabled
                    />
                  </div>
                  <div>
                    <label className="block text-left font-bold text-gray-700">
                      Salary
                    </label>
                    <Field
                      type="number"
                      name="salary"
                      className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring focus:ring-gray-300"
                      disabled
                    />
                  </div>
                  <div className="col-span-2">
                    <button
                      type="button"
                      onClick={() => setShowPasswordFields(!showPasswordFields)}
                      className="w-1/3 rounded-lg bg-blue-500 py-2 text-white"
                    >
                      {showPasswordFields ? "Cancel " : "Change Password"}
                    </button>
                  </div>
                  {showPasswordFields && (
                    <>
                      <div className="col-span-2 mb-4">
                        <label className="block text-left font-bold text-gray-700">
                          Old Password
                        </label>
                        <Field
                          type="password"
                          name="oldPassword"
                          className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring focus:ring-gray-300"
                        />
                        <p className="mt-1 text-sm text-red-600">
                          <ErrorMessage name="oldPassword" />
                        </p>
                      </div>
                      <div className="col-span-2 mb-4">
                        <label className="block text-left font-bold text-gray-700">
                          New Password
                        </label>
                        <Field
                          type="password"
                          name="newPassword"
                          className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring focus:ring-gray-300"
                        />
                        <p className="mt-1 text-sm text-red-600">
                          <ErrorMessage name="newPassword" />
                        </p>
                      </div>
                    </>
                  )}
                  {showPasswordFields && (
                    <div className="col-span-2">
                      <button
                        className={`w-1/3 rounded-lg py-3 font-semibold text-white transition-colors ${
                          loading
                            ? "cursor-not-allowed bg-gray-400"
                            : "bg-gray-500 hover:bg-gray-600"
                        }`}
                        type="submit"
                        disabled={loading}
                      >
                        {loading ? "Please Wait..." : "Update Password"}
                      </button>
                    </div>
                  )}
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </Fragment>
  );
};

export default EditUserForm;
