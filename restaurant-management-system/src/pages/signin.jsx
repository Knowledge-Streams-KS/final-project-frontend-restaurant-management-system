import { Fragment } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { AuthContext } from "../context/authContext";
import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
const Signin = () => {
  const { signin } = useContext(AuthContext);
  const navigate = useNavigate();

  const defaultValue = {
    email: "",
    password: "",
  };
  const validationSchema = yup.object().shape({
    email: yup.string().required("Please Enter your Email").email(),
    password: yup.string().required("Please Enter your Password"),
  });
  const handleSubmit = async (values) => {
    console.log("values", values);
    try {
      const response = await signin(values.email, values.password);
      if (response.status == 200) {
        navigate("/");
      }
    } catch (error) {
      console.error("Sign-in error:", error);
    }
  };
  return (
    <Fragment>
      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="mb-8 text-4xl font-bold text-gray-900">Sign In</h1>
          <Formik
            initialValues={defaultValue}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form className="rounded-lg bg-white px-8 py-8 pt-8 shadow-md">
              <div className="mb-4">
                <Field
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring focus:ring-pink-300"
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
                  className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring focus:ring-pink-300"
                />
                <p className="mt-1 text-sm text-red-600">
                  <ErrorMessage name="password" />
                </p>
              </div>
              <button
                className="w-full rounded-lg bg-pink-500 py-3 font-semibold text-white transition-colors hover:bg-pink-600"
                type="submit"
              >
                Log In
              </button>
              <div className="mt-4 text-center">
                <Link
                  to="/signup"
                  className="text-red-500 transition-colors hover:text-red-700"
                >
                  Do not have an account? Sign up
                </Link>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </Fragment>
  );
};

export default Signin;