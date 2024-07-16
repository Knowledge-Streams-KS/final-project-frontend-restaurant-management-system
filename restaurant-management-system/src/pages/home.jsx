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
      <Employee />
    </>
  );
};

export default HomePage;
