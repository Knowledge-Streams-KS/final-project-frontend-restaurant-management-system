// src/components/AboutUs.jsx
import React from "react";

const AboutUs = () => {
  return (
    <section className="body-font text-gray-700">
      <div className="container mx-auto flex flex-col items-center px-5 py-24 md:flex-row">
        <div className="mb-16 flex flex-col items-center text-center md:mb-0 md:w-1/2 md:items-start md:pr-16 md:text-left lg:flex-grow lg:pr-24">
          <h1 className="title-font mb-4 text-3xl font-bold text-yellow-500 sm:text-4xl">
            Delicious Fast Food
            <br className="hidden lg:inline-block" /> Anytime, Anywhere
          </h1>
          <p className="mb-8 leading-relaxed text-gray-600">
            Indulge in the best fast food experience with our range of
            mouth-watering burgers, crispy fries, and refreshing drinks. Whether
            you're in a hurry or just craving something tasty, we've got you
            covered. Our ingredients are fresh, our service is fast, and our
            flavors are unforgettable.
          </p>
        </div>
        <div className="w-5/6 md:w-1/2 lg:w-full lg:max-w-lg">
          <img
            className="rounded object-cover object-center"
            alt="hero"
            src="https://plus.unsplash.com/premium_photo-1683619761464-6b7c9a2716a8?fm=jpg&w=3000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZmFzdGZvb2R8ZW58MHx8MHx8fDA%3D"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
