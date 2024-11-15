import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchDataFromFirebase } from "../firebase";

const Navbar = () => {
  const [active, setActive] = useState("Home");
  const [toggle, setToggle] = useState(false);
  const [navLinks, setData] = useState([]);
  const [images, setImages] = useState({});
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = fetchDataFromFirebase(
      (jsonData) => {
        setData(jsonData.navLinks);
        setImages(jsonData);
      },
      (error) => {
        console.error("Error fetching data:", error);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleNavigation = (nav) => {
    setActive(nav.title);
    if (location.pathname === "/") {
      // If on home page, use hash navigation
      document
        .querySelector(`#${nav.id}`)
        ?.scrollIntoView({ behavior: "smooth" });
    } else {
      // If on other pages, navigate to home page with hash
      navigate(`/#${nav.id}`);
    }
  };

  const handleLogoClick = () => {
    navigate("/");
    setActive("Home");
  };

  return (
    <nav className="w-full flex py-6 justify-between items-center navbar">
      <img
        src={images.logo}
        alt="hoobank"
        className="w-[130px] h-[39px] cursor-pointer"
        onClick={handleLogoClick}
      />

      <ul className="list-none sm:flex hidden justify-end items-center flex-1">
        {navLinks.map((nav, index) => (
          <li
            key={nav.id}
            className={`font-poppins font-normal cursor-pointer text-[16px] ${
              active === nav.title ? "text-white" : "text-dimWhite"
            } ${
              index === navLinks.length - 1 ? "mr-0" : "mr-10"
            } hover:text-white transition-colors`}
            onClick={() => handleNavigation(nav)}
          >
            {nav.title}
          </li>
        ))}
      </ul>

      <div className="sm:hidden flex flex-1 justify-end items-center">
        <img
          src={toggle ? images.close : images.menu}
          alt="menu"
          className="w-[28px] h-[28px] object-contain cursor-pointer"
          onClick={() => setToggle(!toggle)}
        />

        <div
          className={`${
            !toggle ? "hidden" : "flex"
          } p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar z-[20]`}
        >
          <ul className="list-none flex justify-end items-start flex-1 flex-col">
            {navLinks.map((nav, index) => (
              <li
                key={nav.id}
                className={`font-poppins font-medium cursor-pointer text-[16px] ${
                  active === nav.title ? "text-white" : "text-dimWhite"
                } ${
                  index === navLinks.length - 1 ? "mb-0" : "mb-4"
                } hover:text-white transition-colors`}
                onClick={() => {
                  handleNavigation(nav);
                  setToggle(false);
                }}
              >
                {nav.title}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;