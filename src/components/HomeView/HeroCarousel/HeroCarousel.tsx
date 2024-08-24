"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const bannerImg1 = "/image/carousel/banner-image-1.jpg";
const bannerImg2 = "/image/carousel/banner-image-2.jpg";

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
          <Image src={bannerImg1} alt="slide" layout="fill" objectFit="cover" />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="relative w-full" style={{ paddingBottom: "36.25%" }}>
          <Image src={bannerImg2} alt="slide" layout="fill" objectFit="cover" />
        </div>
      </SwiperSlide>
    </Swiper>
  );
}
