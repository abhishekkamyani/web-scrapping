import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Collapse, initTWE, Dropdown } from "tw-elements";
import { RenderHumburgerIcon } from "../utils/iconsHelper";
function Navbar() {
  useEffect(() => {
    initTWE({ Collapse, Dropdown });
  });

  return (
    <>
      {/* Main navigation container */}
      <nav className="flex-no-wrap theme-switch-transition select-none relative flex w-full items-center justify-between bg-primary py-2 shadow-dark-mild lg:flex-wrap lg:justify-start lg:py-4">
        <div className="flex w-full flex-wrap items-center px-3">
          {/* Hamburger button for mobile view */}
          <button
            className="block border-0 bg-transparent px-2 text-white hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 lg:hidden"
            type="button"
            data-twe-collapse-init=""
            data-twe-target="#navbarSupportedContent1"
            aria-controls="navbarSupportedContent1"
          >
            {/* Hamburger icon */}
            <span>
            <RenderHumburgerIcon className="w-10 h-10" color="white" />
            </span>
          </button>
          <div
            className="!visible hidden transition-all ease-linear flex-grow basis-[100%] items-center lg:!flex lg:basis-auto"
            id="navbarSupportedContent1"
            data-twe-collapse-item=""
          >
            {/* Logo */}
            <a href="/">
              <img
                className="h-7 hover:scale-110 transition-all ease-linear max-lg:my-5 mx-auto"
                src="/images/company-logo.png"
              />
            </a>
            {/* Left navigation links */}
            <ul
              className="list-style-none ms-auto lg:me-2 max-lg:mb-5 flex flex-col gap-y-2 ps-0 lg:flex-row"
              data-twe-navbar-nav-ref=""
            >
              <Link
                to="/"
                type="button"
                data-twe-ripple-color="light"
                className="me-3 inline-block rounded px-2 pb-2 pt-2.5 text-sm font-medium uppercase leading-normal text-white hover:text-black 
                transition duration-150 ease-in-out"
              >
                Home
              </Link>
              <Link
                to="/login"
                type="button"
                data-twe-ripple-init=""
                data-twe-ripple-color="light"
                className="me-3 inline-block rounded px-2 pb-2 pt-2.5 text-sm font-medium uppercase leading-normal text-white hover:text-black transition duration-150 ease-in-out"
              >
                Login
              </Link>

              <Link
                to="/register"
                type="button"
                data-twe-ripple-init=""
                data-twe-ripple-color="light"
                className="me-3 inline-block rounded bg-dark-main px-2 lg:px-6  pb-2 pt-2.5 text-sm font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-black"
              >
                Sign up for free
              </Link>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
