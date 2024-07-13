"use client";

import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import { ProductData } from "../../Dashboard/AdminDash/AddProducts/products.types";
import TitleStyle from "../../Shared/TitleStyle/TitleStyle";
import BannerWide from "../BannerWide/BannerWide";
import ProductCard from "../ProductCard/ProductCard";

export default function ProductsViewCarousel({ title, products }: any) {
  // console.log(products);
  const currentDate = JSON.stringify(new Date()).substring(1, 11);
  // console.log(currentDate);
  return (
    <div className="shadow-md  flex flex-col gap-8  border-b-8   my-16  ">
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
          gap: "2rem",
          fixedWidth: "18rem",
          // fixedHeight: "23rem",
          pagination: false, // hides the dots
        }}
        aria-label="React Splide Example"
        extensions={{ AutoScroll }}
        className="mx-6"
      >
        {products?.map((product: ProductData, index) =>
          product?.stockDetails[product?.stockDetails.length - 1]?.expirationDate >= currentDate ? (
            <SplideSlide key={index}>
              <ProductCard product={product} />
            </SplideSlide>
          ) : null
        )}
      </Splide>
      <BannerWide />
    </div>
  );
}
