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

    return () => unsubscribe();
  }, []);

  return (
    <div className="space-y-8">
      {data.keyPoints?.map((point) => (
        <div
          key={point.id}
          className="feature-card p-6 sm:p-8 rounded-[20px] transition-all duration-300 hover:scale-[1.01] backdrop-blur-sm"
        >
          <h2 className="font-poppins font-semibold text-[20px] sm:text-[22px] md:text-[24px] text-white mb-4 flex items-start">
            <span className="text-gradient mr-2">{point.id}.</span>
            <span>{point.title}</span>
          </h2>
          <p className="font-poppins font-normal text-dimWhite text-[14px] sm:text-[15px] md:text-[16px] leading-[1.6] pl-6">
            {point.body}
          </p>
        </div>
      ))}

      <div className="mt-16 mb-10 text-center px-4">
        <p
          className={`${styles.paragraph} max-w-[800px] mx-auto text-[14px] sm:text-[16px] md:text-[18px] leading-[1.6]`}
        >
          {data.subtitle}
        </p>
      </div>
    </div>
  );
}

export default Introduction;