import React from "react";
import { Link } from "react-router-dom";
import "./notfound.css";

const NotFound = () => {
  return (
    <section className="page_404">
      <div className="container mx-auto">
        <div className="row">
          <div className="col-sm-12">
            <div className="col-sm-10 col-sm-offset-1 text-center">
              <div className="four_zero_four_bg">
                <h1 className="text-center">404</h1>
              </div>
              <div className="contant_box_404">
                <h3 className="h2">Look like you're lost</h3>
                <p className="mb-5">
                  The page you are looking for is not available!
                </p>
                <Link
                  to="/"
                  className="mt-4 w-full rounded-lg bg-gray-500 px-4 py-3 font-semibold text-white transition-colors hover:bg-gray-600 md:mt-0 md:w-auto"
                >
                  Go to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
