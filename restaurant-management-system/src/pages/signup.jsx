import { Fragment, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { AuthContext } from "../context/authContext";
import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const { signup } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const defaultValue = {
    fname: "",
    lname: "",
    email: "",
    password: "",
    role: "",
    checkbox: false,
  };

  const validationSchema = yup.object().shape({
    fname: yup.string().required("Please Enter your First Name"),
    lname: yup.string().required("Please Enter your Last Name"),
    email: yup.string().required("Please Enter your Email").email(),
    password: yup
      .string()
      .required("Please Enter your Password")
      .min(6)
      .matches(/[0-9]/, "Password requires a number")
      .matches(/[a-z]/, "Password requires a lowercase letter")
      .matches(/[A-Z]/, "Password requires an uppercase letter")
      .matches(/[^\w]/, "Password requires a symbol"),
    cnfmpassword: yup
      .string()
      .required("Please Enter password to confirm")
      .oneOf([yup.ref("password"), null], "Passwords must match"),
    role: yup.string().required("Role is required"),
    checkbox: yup.boolean().oneOf([true], "Please accept terms & conditions"),
  });

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const response = await signup(
        values.fname,
        values.lname,
        values.email,
        values.password,
        values.role,
      );
      if (response.status === 201) {
        navigate("/emailverification", {
          state: { email: values.email, password: values.password },
        });
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <Fragment>
      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="mb-8 text-4xl font-bold text-gray-900">Sign Up</h1>
          <Formik
            initialValues={defaultValue}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form className="rounded-lg bg-white px-8 py-8 pt-8 shadow-md">
              <div className="mb-4">
                <Field
                  type="text"
                  name="fname"
                  placeholder="Enter your First Name"
                  className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring focus:ring-gray-300"
                />
                <p className="mt-1 text-sm text-red-600">
                  <ErrorMessage name="fname" />
                </p>
              </div>
              <div className="mb-4">
                <Field
                  type="text"
                  name="lname"
                  placeholder="Enter your Last Name"
                  className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring focus:ring-gray-300"
                />
                <p className="mt-1 text-sm text-red-600">
                  <ErrorMessage name="lname" />
                </p>
              </div>
              <div className="mb-4">
                <Field
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring focus:ring-gray-300"
                />
                <p className="mt-1 text-sm text-red-600">
                  <ErrorMessage name="email" />
                </p>
              </div>
              <div className="mb-4">
                <Field
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring focus:ring-gray-300"
                />
                <p className="mt-1 text-sm text-red-600">
                  <ErrorMessage name="password" />
                </p>
              </div>
              <div className="mb-4">
                <Field
                  type="password"
                  name="cnfmpassword"
                  placeholder="Enter your password again"
                  className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring focus:ring-gray-300"
                />
                <p className="mt-1 text-sm text-red-600">
                  <ErrorMessage name="cnfmpassword" />
                </p>
              </div>
              <div className="mb-4">
                <Field
                  as="select"
                  name="role"
                  className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring focus:ring-gray-300"
                >
                  <option value="" label="Select your role" />
                  <option value="admin" label="Admin" />
                  <option value="waiter" label="Waiter" />
                  <option value="chef" label="Chef" />
                </Field>
                <p className="mt-1 text-sm text-red-600">
                  <ErrorMessage name="role" />
                </p>
              </div>
              <div className="mb-4 text-left">
                <label className="flex items-center">
                  <Field
                    type="checkbox"
                    name="checkbox"
                    className="mr-2 leading-tight"
                  />
                  <span className="text-sm text-gray-700">
                    I agree to the
                    <a
                      className="text-green-500 transition-colors hover:text-green-700"
                      href="#"
                    >
                      &nbsp;Terms and Conditions
                    </a>
                  </span>
                </label>
                <p className="mt-1 text-sm text-red-600">
                  <ErrorMessage name="checkbox" />
                </p>
              </div>

              <button
                className={`w-full rounded-lg py-3 font-semibold text-white transition-colors ${
                  loading
                    ? "cursor-not-allowed bg-gray-400"
                    : "bg-gray-500 hover:bg-gray-600"
                }`}
                type="submit"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
              <div className="mt-4 text-center">
                <Link
                  to="/Signin"
                  className="text-red-500 transition-colors hover:text-red-700"
                >
                  Already have an account? Sign in
                </Link>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </Fragment>
  );
};

export default Signup;
