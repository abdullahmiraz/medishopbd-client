"use client";

import "@splidejs/react-splide/css";
import axios from "axios";
import { useEffect, useState } from "react";
import { baseUrl, serverUrl } from "../../../../api";
import ProductsViewCarousel from "../ProductsViewCarousel/ProductsViewCarousel";

export default function SkinCareProducts() {
  const [products, setProducts] = useState();
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${serverUrl}/api/products`);
        setProducts(res.data);
      } catch (error) {
        console.error("Error fetching users", error);
      }
    };

    fetchUsers();
  }, []);
  return (
    <ProductsViewCarousel
      title={"Prescription Medicines"}
      products={products}
    />
  );
}
