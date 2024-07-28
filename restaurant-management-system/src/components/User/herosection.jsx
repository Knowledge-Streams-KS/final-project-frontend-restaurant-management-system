import React from "react";
import heroImage from "../../assets/images/heroimage.jpg";

const HeroSection = () => {
  return (
    <div
      className="bg-slate-600 bg-cover bg-fixed bg-bottom bg-no-repeat py-36 bg-blend-overlay"
      style={{
        backgroundImage: `url(${heroImage})`,
      }}
    >
      <div className="container mx-auto px-6 text-center opacity-100">
        <h2 className="mb-2 text-4xl font-bold text-yellow-500">
          Welcome to FastFood Express
        </h2>
        <h3 className="mb-8 text-2xl text-yellow-500">
          Serving delicious fast food that's out of this world!
        </h3>
      </div>
    </div>
  );
};

export default HeroSection;
