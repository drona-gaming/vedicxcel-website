import React, { useState, useEffect } from "react";
import { fetchDataFromFirebase } from "../firebase";

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

  return (
    <div id="whyus" className="intro-container">
      <h1 className="intro-title">
        <span className="title1-style">{data.title1}</span>
        <span className="title2-style">{data.title2}</span>
        <span className="title3-style">{data.title3}</span>
      </h1>
      <ul className="intro-keypoints">
        {data.keyPoints &&
          data.keyPoints.map((point) => (
            <li key={point.id} className="intro-keypoint">
              <strong>{point.title}</strong>:{" "}
              <span className="text-dimWhite">{point.body}</span>
            </li>
          ))}
      </ul>
      <h2 className="intro-subtitle">{data.subtitle}</h2>
    </div>
  );
}

export default Introduction;