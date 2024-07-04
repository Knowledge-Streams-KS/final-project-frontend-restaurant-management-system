import { useEffect, useRef, useState } from "react";
import "./navbar.css";

const Navbar = () => {
  const [state, setState] = useState(false);
  const navRef = useRef();

  const navigation = [
    { title: "Customers", path: "javascript:void(0)" },
    { title: "Careers", path: "javascript:void(0)" },
    { title: "Guides", path: "javascript:void(0)" },
    { title: "Partners", path: "javascript:void(0)" },
    { title: "Teams", path: "javascript:void(0)" },
    { title: "Blog", path: "javascript:void(0)" },
  ];

  useEffect(() => {
    const body = document.body;

    // Disable scrolling
    const customBodyStyle = ["overflow-hidden", "lg:overflow-visible"];
    if (state) body.classList.add(...customBodyStyle);
    // Enable scrolling
    else body.classList.remove(...customBodyStyle);

    // Sticky strick
    const customStyle = ["sticky-nav", "fixed", "border-b"];
    window.onscroll = () => {
      if (window.scrollY > 80) navRef.current.classList.add(...customStyle);
      else navRef.current.classList.remove(...customStyle);
    };
  }, [state]);

  return (
    <nav ref={navRef} className="top-0 z-20 w-full bg-white">
      <div className="mx-auto max-w-screen-xl items-center px-4 md:px-8 lg:flex">
        <div className="flex items-center justify-between py-3 lg:block lg:py-4">
          <NavLink to="/">
            <img
              src="https://www.floatui.com/logo.svg"
              width={120}
              height={50}
              alt="Float UI logo"
            />
          </NavLink>
          <div className="lg:hidden">
            <button
              className="rounded-md p-2 text-gray-700 outline-none focus:border focus:border-gray-400"
              onClick={() => setState(!state)}
            >
              {state ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 8h16M4 16h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
        <div
          className={`flex-1 flex-row-reverse justify-between lg:flex lg:h-auto lg:overflow-visible lg:pb-0 lg:pr-0 ${
            state ? "h-screen overflow-auto pb-20 pr-4" : "hidden"
          }`}
        >
          <div>
            <ul className="flex flex-col-reverse space-x-0 lg:flex-row lg:space-x-6">
              <li className="mb-8 mt-8 lg:mb-0 lg:mt-0">
                <NavLink
                  to="/contact"
                  className="text-gray-600 hover:text-indigo-600"
                >
                  Contact
                </NavLink>
              </li>
              <li className="mt-4 lg:mt-0">
                <NavLink
                  to="/login"
                  className="block rounded-md border px-4 py-3 text-center text-gray-600 hover:text-indigo-600 lg:inline lg:border-0"
                >
                  Login
                </NavLink>
              </li>
              <li className="mt-8 lg:mt-0">
                <NavLink
                  to="/signup"
                  className="block rounded-md bg-indigo-600 px-4 py-3 text-center text-white shadow hover:bg-indigo-700 lg:inline"
                >
                  Sign Up
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="flex-1">
            <ul className="items-center justify-center space-y-8 lg:flex lg:space-x-6 lg:space-y-0">
              {navigation.map((item, idx) => (
                <li key={idx} className="text-gray-600 hover:text-indigo-600">
                  <NavLink to={item.path}>{item.title}</NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
