import React from "react";
const HeroSection = () => {
  return (
    <div
      className="bg-cover bg-fixed bg-center bg-no-repeat py-20"
      style={{
        backgroundImage:
          'url("https://img.freepik.com/free-photo/restaurant-interior_1127-3392.jpg?t=st=1721145678~exp=1721149278~hmac=9beb6ecf8b56f9e854fe75d38c0ad0895a847638df09c8ad2b20e04bcbc5573e&w=996")',
      }}
    >
      <div className="container mx-auto px-6 text-center opacity-100">
        <h2 className="mb-2 text-4xl font-bold text-slate-300">
          Welcome to FastFood Express
        </h2>
        <h3 className="mb-8 text-2xl text-gray-100">
          Serving delicious fast food that's out of this world!
        </h3>
      </div>
    </div>
  );
};

export default HeroSection;
