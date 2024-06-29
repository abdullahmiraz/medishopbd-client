"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { baseUrl, serverUrl } from "../../../../api";
import ProductCard from "../ProductCard/ProductCard";

const AllProductsView = () => {
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
    <div className="grid grid-cols-1 sm:grid-cols-2   md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-8 px-6">
      {products?.map((product) => (
        <ProductCard key={product?.productId} product={product} />
      ))}
    </div>
  );
};

export default AllProductsView;
