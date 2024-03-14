import React, { useState, useEffect } from "react";
import { fetchDataFromFirebase } from "../firebase";
import styles from "../style";

function Introduction() {
  const [data, setData] = useState({});

  useEffect(() => {
    const unsubscribe = fetchDataFromFirebase(
      (jsonData) => {
        setData(jsonData.whyUs);
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

  console.log(data.title2);

  return (
    <div id="whyus" className="intro-container">
      <h1 className="intro-title">
        <span className={styles.heading2}>{data.title1}</span>
        <span className={styles.heading2}>{data.title2}</span>
        <span className={`text-gradient ${styles.heading2}`}>
          {data.title3}
        </span>
      </h1>
      <ul className="intro-keypoints">
        {data.keyPoints &&
          data.keyPoints.map((point) => (
            <li key={point.id} className="intro-keypoint">
              <strong className={styles.heading1}>{point.title}</strong>
              <span className={styles.paragraph}>{point.body}</span>
            </li>
          ))}
      </ul>
      <h2 className={`intro-subtitle ${styles.paragraph}`}>{data.subtitle}</h2>
    </div>
  );
}

export default Introduction;