"use client";

import "@splidejs/react-splide/css";
import axios from "axios";
import { useEffect, useState } from "react";
import { serverUrl } from "../../../../api";
import ProductsViewCarousel from "../ProductsViewCarousel/ProductsViewCarousel";
import error from "next/error";

const AllCategoryProductViewCarousel = () => {
  const [products, setProducts] = useState([]);
  const [categoryList, setCategoryList] = useState([]);


  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await axios.get(`${serverUrl}/api/categories`);
        setCategoryList(res.data);
      } catch (error) {
        console.error("Error fetching users", error);
      }
    };

    fetchCategory();
  }, []);

  console.log(categoryList);

  return (
    <div>
      {categoryList?.map((category, index) => (
        <ProductsViewCarousel
          key={index}
          title={category?.name}
          categoryCode={category?.code}
        />
      ))}
    </div>
  );
};

export default AllCategoryProductViewCarousel;
