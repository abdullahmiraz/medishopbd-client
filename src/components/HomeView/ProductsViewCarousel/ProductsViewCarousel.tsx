"use client";

import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import Image from "next/image";
import Link from "next/link";
import TitleStyle from "../../Shared/TitleStyle/TitleStyle";
import BannerWide from "../BannerWide/BannerWide";

export default function ProductsViewCarousel({ title, products }: any) {
  console.log(products);
  return (
    <div className="shadow-md max-h-min  pb-4">
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
        {products?.map((product, index) => (
          <SplideSlide key={index}>
            <Link href={`/products/${product._id}`}>
              <div className="cursor-pointer rounded-md w-56 my-8 shadow-md">
                <figure className="relative" style={{ paddingBottom: "60%" }}>
                  <Image
                    src={"https://via.placeholder.com/450x250"}
                    // product?.productImage ||
                    alt={product?.productName}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-md"
                  />
                </figure>
                <div className="card-body flex flex-col  justify-between p-2 h-40 ">
                  <h2 className="card-title">
                    {product.productName} {product.measure}
                  </h2>
                  <p>{product.productType}</p>
                  <div className="price-view">
                    <p>
                      Price:{" "}
                      <span className="font-bold">
                        Tk. {product.pricePerUnit}
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
