import { Routes, Route } from "react-router-dom";
import Signup from "../pages/signup";
import Signin from "../pages/signin";
import HomePage from "../pages/home";
import IngedientsCodePage from "../pages/ingredientsCode";
import InventoryPage from "../pages/inventory";
import OrderTablePage from "../pages/orderTable";
import RecipePage from "../pages/recipes";
import OrderPage from "../pages/orders";
import BillPage from "../components/order/bill";
import ReservationPage from "../pages/reservation";
import EmployeePage from "../pages/employees";
import EmailVerificationPage from "../pages/resendVerification";
import LayoutTemplate from "../components/layout/Admin";
import AllStock from "../pages/stock";
import Dashboard from "../pages/dashboard";

const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/emailverification" element={<EmailVerificationPage />} />
        <Route path="/" element={<HomePage />} />
        <Route
          path="/home"
          element={
            <LayoutTemplate>
              <Dashboard />
            </LayoutTemplate>
          }
        />
        <Route
          path="/ordertable"
          element={
            <LayoutTemplate>
              <OrderTablePage />
            </LayoutTemplate>
          }
        />
        <Route
          path="/allstock"
          element={
            <LayoutTemplate>
              <AllStock />
            </LayoutTemplate>
          }
        />
        <Route
          path="/ingredients/code"
          element={
            <LayoutTemplate>
              <IngedientsCodePage />
            </LayoutTemplate>
          }
        />
        <Route
          path="/inventory"
          element={
            <LayoutTemplate>
              <InventoryPage />
            </LayoutTemplate>
          }
        />
        <Route
          path="/recipe"
          element={
            <LayoutTemplate>
              <RecipePage />
            </LayoutTemplate>
          }
        />
        <Route
          path="/reservation"
          element={
            <LayoutTemplate>
              <ReservationPage />
            </LayoutTemplate>
          }
        />
        <Route
          path="/order"
          element={
            <LayoutTemplate>
              <OrderPage />
            </LayoutTemplate>
          }
        />
        <Route path="/order/bill/:orderId" element={<BillPage />} />
        <Route
          path="/employee"
          element={
            <LayoutTemplate>
              <EmployeePage />
            </LayoutTemplate>
          }
        />
      </Routes>
    </>
  );
};

export default Router;
