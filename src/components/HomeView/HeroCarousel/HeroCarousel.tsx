"use client";
import React from "react";
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
      className="mySwiper my-6 shadow-md"
    >
      <SwiperSlide>
        <div className="relative w-full" style={{ paddingBottom: "36.25%" }}>
          <Image
            src="https://osudpotro.com/_next/image?url=https%3A%2F%2Fcdn.osudpotro.com%2Fcarousal%2Fapp-banner-02-499-1708432950231.webp&w=1920&q=75"
            alt="slide"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="relative w-full" style={{ paddingBottom: "36.25%" }}>
          <Image
            src="https://osudpotro.com/_next/image?url=https%3A%2F%2Fcdn.osudpotro.com%2Fcarousal%2Fapp-banner-02-499-1708432950231.webp&w=1920&q=75"
            alt="slide"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </SwiperSlide>
    </Swiper>
  );
}
