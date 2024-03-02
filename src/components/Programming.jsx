import React, { useState, useEffect } from "react";
import { fetchDataFromFirebase } from "../firebase";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Programming() {
  const [data, setData] = useState({});

  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000, // You can adjust the speed as needed
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

    // Cleanup function to unsubscribe when the component is unmounted
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <section className="container mx-auto">
      {
        <Slider {...settings}>
          {data.items?.map((item, index) => (
            <div key={index} className="carousel-item">
              <div className="flex flex-col items-center mt-8">
                <div className="flex justify-center mb-6">
                  <img
                    src={item.src}
                    alt="Project"
                    className="w-full max-w-md"
                  />
                </div>

                <div className="flex flex-col items-center mt-6 mb-8 mx-4 sm:mx-8 xl:mx-16">
                  <h1 className="text-3xl text-gray-400 font-bold mb-3">
                    {item.name}
                  </h1>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      }
    </section>
  );
}

export default Programming;