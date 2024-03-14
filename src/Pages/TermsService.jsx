import React, { useState, useEffect } from "react";
import { fetchDataFromFirebase } from "../firebase";
import styles from "../style";

const TermsAndServices = () => {
  const [data, setData] = useState({});
  useEffect(() => {
    const unsubscribe = fetchDataFromFirebase(
      (jsonData) => {
        setData(jsonData.terms);
      },
      (error) => {
        console.error("Error fetching data:", error);
      }
    );

    // Cleanup function to unsubscribe when the component is unmounted
    return () => {
      unsubscribe();
    };
  }, []); // Empty dependency array to run the effect only once on mount

  return (
    <div className="Dark-Gradient min-h-screen overflow-hidden">
      <div
        id="TermsAndServices"
        className="intro-container mx-auto max-w-screen-lg p-4 sm:p-8"
      >
        <h1 className="intro-title text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
          <span className={styles.heading2}>{data.h1}</span>
          <br />
          <span className={`text-gradient ${styles.heading2}`}>{data.h2}</span>
        </h1>
        <ul className="intro-keypoints">
          {data.points &&
            data.points.map((point) => (
              <li key={point.id} className="intro-keypoint">
                <strong className={styles.heading1}>
                  {point.id}. {point.heading}
                </strong>
                <span className={styles.paragraph}>{point.desc}</span>
              </li>
            ))}
        </ul>
        <h2 className={`intro-subtitle ${styles.paragraph}`}>{data.h3}</h2>
      </div>
    </div>
  );
};

export default TermsAndServices;