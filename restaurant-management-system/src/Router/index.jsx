import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Signup from "../pages/signup";
import Signin from "../pages/signin";
import HomePage from "../pages/home";
import IngredientsCodePage from "../pages/ingredientsCode";
import InventoryPage from "../pages/inventory";
import OrderTablePage from "../pages/orderTable";
import RecipePage from "../pages/recipes";
import OrderPage from "../pages/orders";
import BillPage from "../components/order/bill";
import ReservationPage from "../pages/reservation";
import EmployeePage from "../pages/employees";
import EmailVerificationPage from "../pages/resendVerification";
import AllStock from "../pages/stock";
import Dashboard from "../pages/dashboard";
import PrivateRoute from "../context/protectedRoute";
import EditUserForm from "../pages/editProfile";
import OrderDetails from "../components/orderDetails/orderDetails";
import { AuthContext } from "../context/authContext";
import LayoutTemplate from "../components/layout/layout";
import NotFound from "../pages/notfound";
import RedirectIfAuthenticated from "../context/redirect";

const Router = () => {
  const { user } = useContext(AuthContext);

  const role = user?.role;

  return (
    <Routes>
      <Route
        path="/signup"
        element={
          <RedirectIfAuthenticated>
            <Signup />
          </RedirectIfAuthenticated>
        }
      />
      <Route
        path="/signin"
        element={
          <RedirectIfAuthenticated>
            <Signin />
          </RedirectIfAuthenticated>
        }
      />
      <Route path="/emailverification" element={<EmailVerificationPage />} />
      <Route path="/" element={<HomePage />} />
      <Route path="*" element={<NotFound />} />

      <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
        <Route
          path="/home"
          element={
            <LayoutTemplate role={role}>
              <Dashboard />
            </LayoutTemplate>
          }
        />
      </Route>
      <Route
        element={<PrivateRoute allowedRoles={["admin", "chef", "waiter"]} />}
      >
        <Route
          path="/orderdetails"
          element={
            <LayoutTemplate role={role}>
              <OrderDetails />
            </LayoutTemplate>
          }
        />
      </Route>
      <Route element={<PrivateRoute allowedRoles={["admin", "waiter"]} />}>
        <Route
          path="/ordertable"
          element={
            <LayoutTemplate role={role}>
              <OrderTablePage />
            </LayoutTemplate>
          }
        />
      </Route>
      <Route
        element={<PrivateRoute allowedRoles={["admin", "waiter", "chef"]} />}
      >
        <Route
          path="/profile"
          element={
            <LayoutTemplate role={role}>
              <EditUserForm />
            </LayoutTemplate>
          }
        />
      </Route>
      <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
        <Route
          path="/allstock"
          element={
            <LayoutTemplate role={role}>
              <AllStock />
            </LayoutTemplate>
          }
        />
      </Route>
      <Route element={<PrivateRoute allowedRoles={["admin", "chef"]} />}>
        <Route
          path="/ingredients/code"
          element={
            <LayoutTemplate role={role}>
              <IngredientsCodePage />
            </LayoutTemplate>
          }
        />
      </Route>
      <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
        <Route
          path="/inventory"
          element={
            <LayoutTemplate role={role}>
              <InventoryPage />
            </LayoutTemplate>
          }
        />
      </Route>
      <Route element={<PrivateRoute allowedRoles={["admin", "chef"]} />}>
        <Route
          path="/recipe"
          element={
            <LayoutTemplate role={role}>
              <RecipePage />
            </LayoutTemplate>
          }
        />
      </Route>
      <Route element={<PrivateRoute allowedRoles={["admin", "waiter"]} />}>
        <Route
          path="/reservation"
          element={
            <LayoutTemplate role={role}>
              <ReservationPage />
            </LayoutTemplate>
          }
        />
      </Route>
      <Route element={<PrivateRoute allowedRoles={["admin", "waiter"]} />}>
        <Route
          path="/order"
          element={
            <LayoutTemplate role={role}>
              <OrderPage />
            </LayoutTemplate>
          }
        />
      </Route>
      <Route path="/order/bill/:orderId" element={<BillPage />} />
      <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
        <Route
          path="/employee"
          element={
            <LayoutTemplate role={role}>
              <EmployeePage />
            </LayoutTemplate>
          }
        />
      </Route>
    </Routes>
  );
};

export default Router;
