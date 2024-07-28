import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../navbar";
import { MdEventSeat, MdFastfood, MdTableRestaurant } from "react-icons/md";
import { BiDetail } from "react-icons/bi";

const WaiterSidebar = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="flex">
        <div className="min-h-screen w-14 bg-gray-900 pt-4 transition-all sm:w-60">
          <ul className="mt-6">
            <li className="flex h-12 cursor-pointer items-center justify-center px-4 hover:bg-gray-800 sm:justify-start">
              <Link
                to="/ordertable"
                className="flex h-full w-full items-center text-gray-400 transition-colors hover:text-white"
              >
                <MdTableRestaurant className="text-xl" />
                <span className="ml-3 hidden font-semibold tracking-wide sm:block">
                  Order Table
                </span>
              </Link>
            </li>
            <li className="flex h-12 cursor-pointer items-center justify-center px-4 hover:bg-gray-800 sm:justify-start">
              <Link
                to="/orderdetails"
                className="flex h-full w-full items-center text-gray-400 transition-colors hover:text-white"
              >
                <BiDetail className="text-xl" />
                <span className="ml-3 hidden font-semibold tracking-wide sm:block">
                  Order Details
                </span>
              </Link>
            </li>
            <li className="flex h-12 cursor-pointer items-center justify-center px-4 hover:bg-gray-800 sm:justify-start">
              <Link
                to="/reservation"
                className="flex h-full w-full items-center text-gray-400 transition-colors hover:text-white"
              >
                <MdEventSeat className="text-xl" />
                <span className="ml-3 hidden font-semibold tracking-wide sm:block">
                  Reservation
                </span>
              </Link>
            </li>
            <li className="flex h-12 cursor-pointer items-center justify-center px-4 hover:bg-gray-800 sm:justify-start">
              <Link
                to="/order"
                className="flex h-full w-full items-center text-gray-400 transition-colors hover:text-white"
              >
                <MdFastfood className="text-xl" />
                <span className="ml-3 hidden font-semibold tracking-wide sm:block">
                  Order
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

export default WaiterSidebar;
