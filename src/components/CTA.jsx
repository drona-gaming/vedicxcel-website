import styles from "../style";
import Button from "./Button";
import React, { useState, useEffect } from "react";
import { fetchDataFromFirebase } from "../firebase";

const CTA = () => {
  const [ctaTexts, setData] = useState({});

  useEffect(() => {
    const unsubscribe = fetchDataFromFirebase(
      (jsonData) => {
        setData(jsonData.ctaTexts);
      },
      (error) => {
        console.error("Error fetching data:", error);
      }
    );

    // Cleanup function to unsubscribe when the component is unmounted
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <section
      id="footer"
      className={`${styles.flexCenter} ${styles.marginY} ${styles.padding} sm:flex-row flex-col bg-black-gradient-2 rounded-[20px] box-shadow`}
    >
      <div className="flex-1 flex flex-col">
        <h2 className={styles.heading2}>
          <span className="title3-style">{ctaTexts.h1}</span>
        </h2>
        <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
          {ctaTexts.h2}
        </p>
      </div>

      <div className={`${styles.flexCenter} sm:ml-10 ml-0 sm:mt-0 mt-10`}>
        <Button buttonText={ctaTexts.buttonText} />
      </div>
    </section>
  );
};

export default CTA;