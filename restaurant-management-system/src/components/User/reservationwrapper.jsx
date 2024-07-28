import reserveImage from "../../assets/images/reserve.jpg";

const ReservationWrapper = ({ children }) => {
  return (
    <>
      <div className="container mx-auto px-4 pb-10 pt-20">
        <h1 className="text-center text-4xl font-bold text-yellow-500">
          Add Reservation
          <div className="mb-10 mt-10 flex justify-center"></div>
        </h1>
      </div>

      <div className="container mx-auto flex flex-col items-center px-5 pb-32 md:flex-row">
        <div className="mb-16 flex flex-col items-center text-center md:mb-0 md:w-1/2 md:items-start md:pr-16 md:text-left lg:flex-grow lg:pr-24">
          <img
            className="rounded object-cover object-center"
            alt="banner Image"
            src={reserveImage}
          />
        </div>
        <div className="w-5/6 md:w-1/2 lg:max-w-lg">{children}</div>
      </div>
    </>
  );
};

export default ReservationWrapper;
