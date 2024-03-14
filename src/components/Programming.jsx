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
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    fade: true,
    pauseOnHover: true,
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
      <Slider {...settings}>
        {data.items?.map((item, index) => (
          <div key={index} className="carousel-item">
            <img src={item.src} alt={item.name} className="carousel-image" />
            <div className="carousel-caption">
              <h2 className="carousel-title">{item.name}</h2>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
}

export default Programming;