import styles from "../style";
import FeedbackCard from "./FeedbackCard";
import React, { useState, useEffect } from "react";
import { fetchDataFromFirebase } from "../firebase";

const Testimonials = () => {
  const [feedback, setData] = useState([]);
  const [feedbackTexts, setTexts] = useState({});

  useEffect(() => {
    const unsubscribe = fetchDataFromFirebase(
      (jsonData) => {
        setData(jsonData.feedback);
        setTexts(jsonData.feedBackTexts);
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
      id="clients"
      className={`${styles.paddingY} ${styles.flexCenter} flex-col relative `}
    >
      <div className="absolute z-[0] w-[60%] h-[60%] -right-[50%] rounded-full blue__gradient bottom-40" />

      <div className="w-full flex justify-between items-center md:flex-row flex-col sm:mb-16 mb-6 relative z-[1]">
        <h2 className={styles.heading2}>
          {feedbackTexts.h1} <br className="sm:block hidden" />{" "}
          <span className="title3-style">{feedbackTexts.h2}</span>
        </h2>
        <div className="w-full md:mt-0 mt-6">
          <p className={`${styles.paragraph} text-left max-w-[450px]`}>
            {feedbackTexts.h3}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap sm:justify-start justify-center w-full feedback-container relative z-[1]">
        {feedback.map((card) => (
          <FeedbackCard key={card.id} {...card} quotes={feedbackTexts.quotes} />
        ))}
      </div>
    </section>
  );
};

export default Testimonials;