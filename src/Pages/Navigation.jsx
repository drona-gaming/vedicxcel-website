import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/whyUs">Why Us</Link>
        </li>
        <li>
          <Link to="/ContactUs">Contact Us</Link>
        </li>
        <li>
          <Link to="/terms">Terms & Service</Link>
        </li>
        <li>
          <Link to="/partnerLogin">Partner Login</Link>
        </li>
        <li>
          <Link to="/partnerLogin/Report">Partner Report</Link>
        </li>
        {/* Add more navigation links */}
      </ul>
    </nav>
  );
};

export default Navigation;