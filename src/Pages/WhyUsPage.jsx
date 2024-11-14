import React from "react";
import styles from "../style";
import { Footer, Navbar } from "../components";
import Programming from "../components/Programming";
import Introduction from "../components/Introduction";

const WhyUsPage = () => {
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
              Why Choose <br className="sm:hidden" />
              <span className="text-gradient">VedicXcel?</span>
            </h1>
          </div>

          {/* Carousel Section */}
          <div className="mb-16">
            <Programming />
          </div>

          {/* Introduction Section */}
          <div className="space-y-6 md:space-y-8 px-4 sm:px-6 md:px-8">
            <Introduction />
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

export default WhyUsPage;