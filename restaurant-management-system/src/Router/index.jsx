import { Routes, Route } from "react-router-dom";
import Signup from "../pages/signup";
import Signin from "../pages/signin";
import HomePage from "../pages/home";
import IngedientsCodePage from "../pages/ingredientsCode";
import InventoryPage from "../pages/inventory";
import OrderTablePage from "../pages/orderTable";

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
      </Routes>
    </>
  );
};

export default Router;
