"use client";

import "@splidejs/react-splide/css";
import axios from "axios";
import { useEffect, useState } from "react";
import { serverUrl } from "../../../../api";
import ProductsViewCarousel from "../ProductsViewCarousel/ProductsViewCarousel";

export default function PrescriptionMedicine() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${serverUrl}/api/products`);
        const allProducts = res.data;
        setProducts(allProducts);
        const medicineProducts = allProducts.filter(
          (product) => product.primaryCategory === "Medicine"
        );
        setFilteredProducts(medicineProducts);
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <ProductsViewCarousel
      title={"Prescription Medicines"}
      products={filteredProducts}
    />
  );
}
