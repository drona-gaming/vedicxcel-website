import styles, { layout } from "../style";
import React, { useState, useEffect } from "react";
import { fetchDataFromFirebase } from "../firebase";
import Button from "./Button";

const CardDeal = () => {
  const [cardDeal, setData] = useState({});

  useEffect(() => {
    const unsubscribe = fetchDataFromFirebase(
      (jsonData) => {
        setData(jsonData.cardDeal);
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
    <section className={layout.section}>
      <div className={layout.sectionInfo}>
        <h2 className={styles.heading2}>
          {cardDeal.h1} <br className="sm:block hidden" />{" "}
          <span className="title3-style">{cardDeal.h2}</span>
        </h2>
        <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
          {cardDeal.h3}
        </p>

        <Button buttonText={cardDeal.buttonText} styles={`mt-10`} />
      </div>

      <div className={layout.sectionImg}>
        <img src={cardDeal.card} alt="billing" className="w-[100%] h-[100%]" />
      </div>
    </section>
  );
};

export default CardDeal;