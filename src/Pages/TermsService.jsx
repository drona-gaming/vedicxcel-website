import React, { useState, useEffect } from "react";
import { fetchDataFromFirebase } from "../firebase";
import styles from "../style";
import { Footer, Navbar } from "../components";

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

    return () => unsubscribe();
  }, []);

  return (
    <div className="bg-primary w-full overflow-hidden min-h-screen flex flex-col">
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar />
        </div>
      </div>

      <div className={`bg-primary flex-grow ${styles.paddingX}`}>
        <div className={`${styles.boxWidth} mx-auto relative z-10`}>
          {/* Header Section */}
          <div className="w-full text-center mb-16 mt-10">
            <h1 className="font-poppins font-semibold text-[40px] xs:text-[48px] sm:text-[60px] md:text-[72px] text-white leading-[1.2] mb-4">
              {data.h1} <br></br>
              <span className="text-gradient block sm:inline">{data.h2}</span>
            </h1>
          </div>

          {/* Terms Cards Section */}
          <div className="space-y-6 md:space-y-8 px-4 sm:px-6 md:px-8">
            {data.points?.map((point) => (
              <div
                key={point.id}
                className="feature-card p-6 sm:p-8 rounded-[20px] transition-all duration-300 hover:scale-[1.01] backdrop-blur-sm"
              >
                <h2 className="font-poppins font-semibold text-[20px] sm:text-[22px] md:text-[24px] text-white mb-4 flex items-start">
                  <span className="text-gradient mr-2">{point.id}.</span>
                  <span>{point.heading}</span>
                </h2>
                <p className="font-poppins font-normal text-dimWhite text-[14px] sm:text-[15px] md:text-[16px] leading-[1.6] pl-6">
                  {point.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Footer Note */}
          <div className="mt-16 mb-10 text-center px-4">
            <p
              className={`${styles.paragraph} max-w-[800px] mx-auto text-[14px] sm:text-[16px] md:text-[18px] leading-[1.6]`}
            >
              {data.h3}
            </p>
          </div>

          {/* Gradient Effects */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute z-[0] w-[40%] h-[35%] top-0 pink__gradient opacity-30" />
            <div className="absolute z-[1] w-[80%] h-[80%] rounded-full white__gradient bottom-40 opacity-20" />
            <div className="absolute z-[0] w-[50%] h-[50%] right-20 bottom-20 blue__gradient opacity-30" />
          </div>
        </div>
      </div>

      <div
        className={`bg-primary ${styles.paddingX} ${styles.flexCenter} mt-auto`}
      >
        <div className={`${styles.boxWidth}`}>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default TermsAndServices;