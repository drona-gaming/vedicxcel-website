import React from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { ContactUs } from "./ContactUs";

const Button = ({ buttonText, styles }) => (
  //  <Popup trigger={
  <button
    type="button"
    className={`py-4 px-6 font-poppins font-medium text-[18px] text-primary bg-blue-gradient rounded-[10px] outline-none ${styles}`}
  >
    {buttonText}{" "}
  </button>
  //  } modal>
  //    {(close) => (
  //      <div className="popup" style={{ background: '#000000'}} contentStyle={{margin : '0', padding : '0'}}>
  //        <button className="close" onClick={close}>
  //          &times;
  //        </button>
  //         <ContactUs />
  //      </div>
  //    )}
  //  </Popup>
);

export default Button;