"use client";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

export default function HeroCarousel() {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper max-w-screen-2xl"
      >
        <SwiperSlide>
          <div
            style={{
              width: 1920,
              height: 320,
              position: "relative",
            }}
          >
            <Image
              src={`https://osudpotro.com/_next/image?url=https%3A%2F%2Fcdn.osudpotro.com%2Fcarousal%2Fapp-banner-02-499-1708432950231.webp&w=1920&q=75`}
              layout="fill"
              objectFit="cover"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            style={{
              width: 1920,
              height: 320,
              position: "relative",
            }}
          >
            <Image
              src={`https://osudpotro.com/_next/image?url=https%3A%2F%2Fcdn.osudpotro.com%2Fcarousal%2Fapp-banner-02-499-1708432950231.webp&w=1920&q=75`}
              layout="fill"
              objectFit="cover"
            />
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
