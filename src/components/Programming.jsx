import React, { useState, useEffect } from "react";
import { fetchDataFromFirebase } from "../firebase";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Programming() {
  const [data, setData] = useState({});

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    fade: true,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };

  useEffect(() => {
    const unsubscribe = fetchDataFromFirebase(
      (jsonData) => {
        setData(jsonData.programming);
      },
      (error) => {
        console.error("Error fetching data:", error);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <section className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative">
        <Slider {...settings}>
          {data.items?.map((item, index) => (
            <div key={index} className="outline-none">
              <div className="relative bg-gradient-to-b from-gray-900/80 to-gray-900/40 backdrop-blur-sm rounded-2xl p-8 flex flex-col items-center justify-center">
                <div className="w-[200px] h-[200px] relative mx-auto">
                  <img
                    src={item.src}
                    alt={item.name}
                    className="w-full h-full object-contain transition-transform duration-300 hover:scale-110"
                    style={{ imageRendering: "crisp-edges" }}
                  />
                </div>
                <div className="mt-6 text-center">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 transform transition-all duration-300 hover:scale-105">
                    {item.name}
                  </h2>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}

export default Programming;