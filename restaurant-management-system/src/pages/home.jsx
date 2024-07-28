import { useState } from "react";
import AboutUs from "../components/User/aboutus";
import Footer from "../components/User/footer";
import HeroSection from "../components/User/herosection";
import ThankYouMessage from "../components/User/thankyou";
import OTPForm from "../components/User/otpverification";
import ReservationWrapper from "../components/User/reservationwrapper";
import ReservationCustomer from "../components/User/reservation";

const HomePage = () => {
  const [showOTPForm, setShowOTPForm] = useState(false);
  const [showThankYouForm, setShowThankYouForm] = useState(false);
  const [emailForOTP, setEmailForOTP] = useState("");

  const toggleOTPForm = (email) => {
    setEmailForOTP(email);
    setShowOTPForm(true);
  };

  const handleOTPFormSubmit = () => {
    setShowOTPForm(false);
    setShowThankYouForm(true);
  };

  return (
    <>
      <HeroSection />
      <AboutUs />
      {!showOTPForm && !showThankYouForm && (
        <ReservationWrapper>
          <ReservationCustomer toggleOTPForm={toggleOTPForm} />
        </ReservationWrapper>
      )}
      {showOTPForm && (
        <ReservationWrapper>
          <OTPForm email={emailForOTP} onSubmit={handleOTPFormSubmit} />
        </ReservationWrapper>
      )}
      {showThankYouForm && (
        <ReservationWrapper>
          <ThankYouMessage />
        </ReservationWrapper>
      )}
      <Footer />
    </>
  );
};

export default HomePage;
