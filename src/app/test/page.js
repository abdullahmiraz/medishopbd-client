"use client";

import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import Image from "next/image";

const rewardList = [
  {
    cardTitle: "1 Prescription",
    buttonTitle: "Upload Now",
    imgLink: "https://loremflickr.com/640/340",
  },
  {
    cardTitle: "2 Products",
    buttonTitle: "Order Now",
    imgLink: "https://loremflickr.com/640/340",
  },
  {
    cardTitle: "3 Line",
    buttonTitle: "Call Now",
    imgLink: "https://loremflickr.com/640/340",
  },
  {
    cardTitle: "4 Products",
    buttonTitle: "Order Now",
    imgLink: "https://loremflickr.com/640/340",
  },
  {
    cardTitle: "5 Line",
    buttonTitle: "Call Now",
    imgLink: "https://loremflickr.com/640/340",
  },
  {
    cardTitle: "6 Products",
    buttonTitle: "Order Now",
    imgLink: "https://loremflickr.com/640/340",
  },
  {
    cardTitle: "7 Line",
    buttonTitle: "Call Now",
    imgLink: "https://loremflickr.com/640/340",
  },
];

export default function Slider() {
  return (
    <Splide
      options={{
        type: "loop",
        autoStart: true,
        pauseOnHover: true,
        rewind: true,
        perPage: 3,
        autoScroll: {
          speed: 2,
        },
        gap: "2rem",
      }}
      aria-label="React Splide Example"
      extensions={{ AutoScroll }}
    >
      {rewardList.map((item, index) => (
        <SplideSlide key={index} className="   w-80 bg-base-100 shadow-xl">
          <figure>
            <div
              className="relative w-full"
              style={{ paddingBottom: "36.25%" }}
            >
              <Image
                src={item.imgLink}
                alt="slide"
                layout="fill"
                objectFit="cover"
              />
            </div>
          </figure>
          <div className="card-body">
            <h2 className="card-title">{item.cardTitle}</h2>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">{item.buttonTitle}</button>
            </div>
          </div>
        </SplideSlide>
      ))}
    </Splide>
  );
}
