import OTPForm from "../components/otpverification";
import Booking from "./booking";
import Employee from "./employees";
import Order from "./orders";
import Recipes from "./recipes";

const HomePage = () => {
  return (
    <>
      <Booking />
      <OTPForm></OTPForm>
      <Order />
      <Employee />
     
      <Recipes />
    </>
  );
};

export default HomePage;
