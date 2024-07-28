import React from "react";
import TickAnimation from "./animationTick";
const ThankYouMessage = () => {
  return (
    <div className="mx-auto w-full max-w-6xl">
      <div className="flex justify-center">
        <div className="mx-auto max-w-md rounded-xl bg-white px-4 py-10 text-center shadow sm:px-8">
          <header className="mb-8">
            <h1 className="mb-1 text-2xl font-bold">
              Thank You for Your Reservation!
            </h1>
            <div className="mb-10 mt-10 flex justify-center">
              <TickAnimation />
            </div>
            <p className="text-[15px] text-slate-500">
              Your reservation has been confirmed successfully.
            </p>
            <p className="text-[15px] text-slate-500">
              You will receive confirmation Email .
            </p>
          </header>
        </div>
      </div>
    </div>
  );
};

export default ThankYouMessage;
