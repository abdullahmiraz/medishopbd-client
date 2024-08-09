"use client";

import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import axios from "axios";
import { useEffect, useState } from "react";
import { serverUrl } from "../../../../api";
import { ProductData } from "../../Dashboard/AdminDash/AddProducts/products.types";
import TitleStyle from "../../Shared/TitleStyle/TitleStyle";
import BannerWide from "../BannerWide/BannerWide";
import ProductCard from "../ProductCard/ProductCard";

interface ProductsViewCarouselProps {
  categoryCode: string;
  title: string;
}

export default function ProductsViewCarousel({
  categoryCode,
  title,
}: ProductsViewCarouselProps) {
  const currentDate = JSON.stringify(new Date()).substring(1, 11);

  const [products, setProducts] = useState([]);
  const [productByCategory, setProductByCategory] = useState([]);
  // console.log(categoryCode);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${serverUrl}/api/products`);
        setProducts(res.data);
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      const categorizedProducts = () => {
        try {
          const filteredProducts = products.filter(
            (product) => product.primaryCategory === categoryCode
          );
          setProductByCategory(filteredProducts);
        } catch (error) {
          console.error("Error filtering category products", error);
        }
      };

      categorizedProducts();
    }
  }, [products, categoryCode]);

  // console.log("Products:", products);
  // console.log(productByCategory);

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
        {productByCategory.map((product: ProductData, index) => {
          const lastStockDetail =
            product.stockDetails[product.stockDetails.length - 1];
          return lastStockDetail &&
            lastStockDetail.expirationDate >= currentDate ? (
            <SplideSlide key={index}>
              <ProductCard product={product} />
            </SplideSlide>
          ) : null;
        })}
      </Splide>
      <BannerWide />
    </div>
  );
}
