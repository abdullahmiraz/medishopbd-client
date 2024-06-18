"use client";

import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import Image from "next/image";
import Link from "next/link";
import TitleStyle from "../../Shared/TitleStyle/TitleStyle";
import BannerWide from "../BannerWide/BannerWide";

export default function ProductsViewCarousel({ title, products }) {
  console.log(products);
  return (
    <div className="shadow-md  pb-4">
      <TitleStyle title={title} />
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
        className=" mx-6"
      >
        {products?.map((product?, index) => (
          <SplideSlide key={index}>
            <Link href={`../products/${product.id}`}>
              <div className=" cursor-pointer rounded-md w-56  my-8 shadow-md">
                <figure>
                  <div className="relative " style={{ paddingBottom: "60%" }}>
                    <Image
                      src={product?.image}
                      alt="slide"
                      layout="fill"
                      objectFit="cover"
                      className=" rounded-t-md "
                    />
                  </div>
                </figure>
                <div className="card-body p-2">
                  <h2 className="card-title">
                    {product.name} {product.measure}
                  </h2>
                  <p>{product.type}</p>
                  <div className="price-view">
                    <p>
                      Price:
                      <span className="font-bold">
                        Tk. {product.pack_price}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </SplideSlide>
        ))}
      </Splide>
      <BannerWide />
    </div>
  );
}
