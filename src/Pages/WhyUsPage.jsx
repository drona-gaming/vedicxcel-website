import React from "react";
import styles from "../style";
import { Introduction } from "../components/";
import Programming from "../components/Programming";

const WhyUsPage = () => {
  return (
    <div className="bg-primary min-h-screen overflow-hidden">
      <div className={`bg-primary ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          <Programming />
          <div style={{ height: "10px" }} />
          <Introduction />
        </div>
      </div>
    </div>
  );
};

export default WhyUsPage;