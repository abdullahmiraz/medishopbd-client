"use client";

import React from "react";
import Slider from "react-slick";
import TestCard from "./TestCard";

const rewardList = [
  {
    cardTitle: "Upload Prescription",
    buttonTitle: "Upload Now",
    imgLink: "https://loremflickr.com/640/340",
  },
  {
    cardTitle: "Healthcare Products",
    buttonTitle: "Order Now",
    imgLink: "https://loremflickr.com/640/340",
  },
];

function MultipleItems() {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
  };
  return (
    <div className="slider-container w-screen absolute">
      <Slider
        {...settings}
        className="flex items-center bg-orange-600  w-screen"
      >
        <div>
          <img src="https://dummyimage.com/444x244.png?text=444" alt="" />
        </div>
      </Slider>
    </div>
  );
}

export default MultipleItems;
