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
const bannerImg3 = "/image/carousel/banner-image-3.jpg";
const bannerImg4 = "/image/carousel/doctor.svg";
const bannerImg5 = "/image/carousel/doctors.svg";
const bannerImg6 = "/image/carousel/injured.svg";
const bannerImg7 = "/image/carousel/jogging.svg";
const bannerImg8 = "/image/carousel/medical.svg";
const bannerImg9 = "/image/carousel/medicine.svg";
const bannerImg10 = "/image/carousel/research.svg";

const bannerSlides = [
  {
    id: 1,
    title: "Your Trusted Online Medical Store",
    subheading: "Wide Selection of Healthcare Products",
    description:
      "Providing quality healthcare products at your doorstep. Reliable, Affordable, and Fast. Discover medicines, healthcare products, and more at unbeatable prices.",
    image: bannerImg4,
  },
  {
    id: 2,
    title: "Shop Medicines with Ease",
    subheading: "Fast Delivery, Assured Quality",
    description:
      "Explore a wide range of medicines and health essentials, delivered fast to your doorstep. We ensure the highest quality for all your healthcare needs.",
    image: bannerImg9,
  },
  {
    id: 3,
    title: "Your Health, Our Priority",
    subheading: "Exceptional Service, Every Time",
    description:
      "We are dedicated to improving your well-being with a diverse selection of healthcare products. Our priority is to provide the best service and care for your health.",
    image: bannerImg8,
  },
  {
    id: 3,
    title: "Your Health, Our Priority",
    subheading: "Exceptional Service, Every Time",
    description:
      "We are dedicated to improving your well-being with a diverse selection of healthcare products. Our priority is to provide the best service and care for your health.",
    image: bannerImg7,
  },
];

// Import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

export default function HeroCarousel() {
  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      loop={true}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
      className="mySwiper my-8 shadow-lg"
    >
      {bannerSlides?.map((banner) => (
        <SwiperSlide key={banner.id}>
          <div className="relative w-full h-[500px] md:h-[600px] flex flex-col md:flex-row items-center justify-between bg-white">
            {/* Text container */}
            <div className="relative z-10 w-full md:w-1/2 p-8 md:p-16 text-left bg-opacity-75 bg-white">
              <h2 className="text-4xl md:text-5xl font-bold text-blue-800 leading-tight">
                {banner.title}
              </h2>
              <h3 className="mt-4 text-lg md:text-2xl text-gray-700 font-semibold">
                {banner.subheading}
              </h3>
              <p className="mt-4 text-sm md:text-lg text-gray-600 leading-relaxed">
                {banner.description}
              </p>
              <button className="mt-8 px-6 py-3 bg-blue-600 text-white text-lg rounded-lg shadow-md hover:bg-blue-700 transition-all">
                Shop Now
              </button>
            </div>
            {/* Image container */}
            <div className="relative w-full md:w-1/2 h-full">
              <Image
                src={banner.image}
                alt={`Banner ${banner.id}`}
                fill
                className="rounded-r-lg"
                quality={90}
              />
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
