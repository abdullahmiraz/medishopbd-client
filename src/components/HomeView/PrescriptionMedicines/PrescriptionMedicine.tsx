"use client";

import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import Image from "next/image";
import TitleStyle from "../../Shared/TitleStyle/TitleStyle";

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

export default function PrescriptionMedicine() {
  return (
    <>
      <TitleStyle title={"Prescription Medicines"} />
      <Splide
        options={{
          type: "loop",
          autoStart: true,
          pauseOnHover: true,
          rewind: true,
          perPage: 4,
          autoScroll: {
            speed: 1,
          },
          gap: "1rem",
          fixedWidth: "15rem",
          fixedHeight: "23rem",
        }}
        aria-label="React Splide Example"
        extensions={{ AutoScroll }}
        className=" mb-10 mx-8"
      >
        {rewardList.map((item, index) => (
          <SplideSlide key={index}>
            <div className=" rounded-md w-56  my-8 shadow-2xl">
              <figure>
                <div className="relative " style={{ paddingBottom: "60%" }}>
                  <Image
                    src={item.imgLink}
                    alt="slide"
                    layout="fill"
                    objectFit="cover"
                    className=" rounded-t-md "
                  />
                </div>
              </figure>
              <div className="card-body p-2">
                <h2 className="card-title">{item.cardTitle}</h2>
                <p>Type: Injection/Tablet</p>
                <p>Details: </p>
                <h3>
                  Best Price:{" "}
                  <span className="text-green-500 font-medium">
                    Tk.{"Money"}
                  </span>{" "}
                </h3>
              </div>
            </div>
          </SplideSlide>
        ))}
      </Splide>
    </>
  );
}
