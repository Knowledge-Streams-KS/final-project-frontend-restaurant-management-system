import React from "react";

const ThankYouMessage = () => {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-24 md:px-6">
      <div className="flex justify-center">
        <div className="mx-auto max-w-md rounded-xl bg-white px-4 py-10 text-center shadow sm:px-8">
          <header className="mb-8">
            <h1 className="mb-1 text-2xl font-bold">
              Thank You for Your Reservation!
            </h1>
            <div className="mb-4 mt-4 flex justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 122.88 101.6"
                className="tick-svg w-2/6"
              >
                <path
                  className="tick-path"
                  fill="#10a64a" // Green color
                  stroke="#10a64a" // Lighter stroke color
                  strokeWidth="1" // Adjust stroke width as needed
                  d="M4.67,67.27c-14.45-15.53,7.77-38.7,23.81-24C34.13,48.4,42.32,55.9,48,61L93.69,5.3c15.33-15.86,39.53,7.42,24.4,23.36L61.14,96.29a17,17,0,0,1-12.31,5.31h-.2a16.24,16.24,0,0,1-11-4.26c-9.49-8.8-23.09-21.71-32.91-30v0Z"
                />
              </svg>
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
