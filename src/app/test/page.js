"use client";

import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";

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
  {
    cardTitle: "Help Line",
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
        perPage: 2,
        autoScroll: {
          speed: 1,
        },
        slideSize: "10, 20",
      }}
      aria-label="React Splide Example"
      extensions={{ AutoScroll }}
    >
      <SplideSlide>
        <div>
          <img
            style={{ width: "300px", height: "200px", border: "1px solid red" }}
            src="http://localhost:3000/_next/image?url=https%3A%2F%2Floremflickr.com%2F640%2F340&w=1080&q=75"
            alt="Image 1"
          />
        </div>
      </SplideSlide>
      <SplideSlide>
        <div className="flex gap-2">
          <img
            style={{ width: "600px", height: "200px", border: "1px solid red" }}
            src="http://localhost:3000/_next/image?url=https%3A%2F%2Floremflickr.com%2F640%2F340&w=1080&q=75"
            alt="Image 1"
          />
        </div>
      </SplideSlide>
      <SplideSlide>
        <div className="flex gap-2">
          <img
            style={{ width: "600px", height: "200px", border: "1px solid red" }}
            src="http://localhost:3000/_next/image?url=https%3A%2F%2Floremflickr.com%2F640%2F340&w=1080&q=75"
            alt="Image 1"
          />
        </div>
      </SplideSlide>
    </Splide>
  );
}
