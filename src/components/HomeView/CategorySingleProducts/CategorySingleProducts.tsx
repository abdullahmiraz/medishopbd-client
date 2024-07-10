"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { serverUrl } from "../../../../api";
import ProductCard from "../ProductCard/ProductCard";

interface Product {
  productId: string;
  primaryCategory: string;
  // Add other product fields as needed
}

const CategorySingleProducts = ({ categoryCode }: { categoryCode: string }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${serverUrl}/api/products`);
        setProducts(res.data);
        console.log(res.data);
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    // Filter products based on categoryCode
    const filtered = products.filter(
      (product) => product.primaryCategory === categoryCode
    );
    console.log(filtered);
    setFilteredProducts(filtered);
  }, [products, categoryCode]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 my-8 px-6 ">
      {filteredProducts.map((product) => (
        <ProductCard key={product.productId} product={product} />
      ))}
    </div>
  );
};

export default CategorySingleProducts;
