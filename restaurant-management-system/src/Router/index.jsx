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

const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/ordertable" element={<OrderTablePage />} />
        <Route path="/ingredients/code" element={<IngedientsCodePage />} />
        <Route path="/inventory" element={<InventoryPage />} />
        <Route path="/recipe" element={<RecipePage />} />
        <Route path="/reservation" element={<ReservationPage />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/order/bill/:orderId" element={<BillPage />} />
      </Routes>
    </>
  );
};

export default Router;
