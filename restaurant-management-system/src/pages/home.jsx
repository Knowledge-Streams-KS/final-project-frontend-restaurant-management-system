import AboutUs from "../components/User/aboutus";
import Footer from "../components/User/footer";
import HeroSection from "../components/User/herosection";
import ReservationCustomer from "../components/User/reservation";

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <AboutUs />
      <ReservationCustomer />
      <Footer />
    </>
  );
};

export default HomePage;
