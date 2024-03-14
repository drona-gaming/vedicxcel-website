import React from "react";
import styles from "../style";
import { Introduction } from "../components/";
import Programming from "../components/Programming";

const WhyUsPage = () => {
  return (
    <div className="Dark-Gradient min-h-screen overflow-hidden">
      <div className={styles.flexStart}>
        <div className={styles.boxWidth}>
          <Programming />
          <Introduction />
        </div>
      </div>
    </div>
  );
};

export default WhyUsPage;