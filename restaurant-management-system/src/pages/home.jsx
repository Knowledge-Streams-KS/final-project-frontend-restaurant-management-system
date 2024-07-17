import { useState } from "react";
import AboutUs from "../components/User/aboutus";
import Footer from "../components/User/footer";
import HeroSection from "../components/User/herosection";
import ReservationCustomer from "../components/User/reservation";
import ThankYouMessage from "../components/User/thankyou";
import OTPForm from "../components/User/otpverification"; // Import OTPForm

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
        <ReservationCustomer toggleOTPForm={toggleOTPForm} />
      )}
      {showOTPForm && (
        <OTPForm email={emailForOTP} onSubmit={handleOTPFormSubmit} />
      )}
      {showThankYouForm && <ThankYouMessage />}
      <Footer />
    </>
  );
};

export default HomePage;
