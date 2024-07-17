import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../navbar";

const ChefSidebar = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="flex">
        <div className="min-h-screen w-14 bg-gray-900 pt-4 transition-all sm:w-60">
          <ul className="mt-6">
            <li className="flex h-12 cursor-pointer items-center justify-center px-4 hover:bg-gray-800 sm:justify-start">
              <Link to="/orderdetails" className="flex items-center">
                <span className="ml-3 hidden font-semibold tracking-wide text-gray-400 transition-colors hover:text-white sm:block">
                  Order Details
                </span>
              </Link>
            </li>
            <li className="flex h-12 cursor-pointer items-center justify-center px-4 hover:bg-gray-800 sm:justify-start">
              <Link to="/ingredients/code" className="flex items-center">
                <span className="ml-3 hidden font-semibold tracking-wide text-gray-400 transition-colors hover:text-white sm:block">
                  Ingredients Code
                </span>
              </Link>
            </li>
            <li className="flex h-12 cursor-pointer items-center justify-center px-4 hover:bg-gray-800 sm:justify-start">
              <Link to="/recipe" className="flex items-center">
                <span className="ml-3 hidden font-semibold tracking-wide text-gray-400 transition-colors hover:text-white sm:block">
                  Recipe
                </span>
              </Link>
            </li>
          </ul>
        </div>
        <section className="flex-1 bg-opacity-20"> {children}</section>
      </main>
    </>
  );
};

export default ChefSidebar;