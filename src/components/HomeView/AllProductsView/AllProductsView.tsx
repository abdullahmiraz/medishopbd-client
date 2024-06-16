"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { baseUrl } from "../../../../api";
import ProductCard from "../ProductCard/ProductCard";

const AllProductsView = () => {
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

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 mt-8 px-6">
      {products?.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default AllProductsView;