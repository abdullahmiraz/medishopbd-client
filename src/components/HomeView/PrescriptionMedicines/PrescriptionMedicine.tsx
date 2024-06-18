"use client";

import "@splidejs/react-splide/css";
import axios from "axios";
import { useEffect, useState } from "react";
import { baseUrl } from "../../../../api";
import ProductsViewCarousel from "../ProductsViewCarousel/ProductsViewCarousel";

export default function PrescriptionMedicine() {
  const [products, setProducts] = useState();
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${baseUrl}/products`);
        setProducts(res.data);
      } catch (error) {
        console.error("Error fetching users", error);
      }
    };

    fetchUsers();
  }, []);

  console.log(products);
  return (
    <ProductsViewCarousel
      title={"Prescription Medicines"}
      products={products}
    />
  );
}
