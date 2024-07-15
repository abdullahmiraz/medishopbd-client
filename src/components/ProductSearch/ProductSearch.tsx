"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { serverUrl } from "../../../api";
import { ProductData } from "../Dashboard/AdminDash/AddProducts/products.types";
import Image from "next/image";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";

const ProductSearch = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [products, setProducts] = useState<ProductData[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductData[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<ProductData[]>(
          `${serverUrl}/api/products`
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("Error fetching products.");
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      const filtered = products.filter((product) =>
        product.productName.toLowerCase().includes(lowerCaseSearchTerm)
      );
      setFilteredProducts(filtered);
      setIsDropdownOpen(true);
    } else {
      setFilteredProducts([]);
      setIsDropdownOpen(false);
    }
  }, [searchTerm, products]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleDropdownClose = () => {
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative hidden sm:block">
      {/* Search Bar */}
      <div className="relative ">
        <input
          type="text"
          className="input input-bordered mx-4 pl-2 py-2 sm:w-min w-40 "
          placeholder="Search products"
          value={searchTerm}
          onChange={handleSearchChange}
          onFocus={() => setIsDropdownOpen(true)} // Show dropdown when input is focused
        />
        <FaSearch className="absolute right-12 top-4 text-gray-500" />
        {isDropdownOpen && filteredProducts.length > 0 && (
          <div className="absolute mt-2 w-full bg-white shadow-lg border border-gray-300 max-h-60 overflow-y-auto z-20">
            <ul className="divide-y divide-gray-200">
              {filteredProducts.map((product) => (
                <li key={product.productId} className="p-2 hover:bg-gray-100">
                  <Link
                    href={`/products/${product.productCode}/?pid=${product._id}`}
                    onClick={handleDropdownClose}
                  >
                    <div className="flex items-center space-x-2">
                      <Image
                        src={product.productImage || "/placeholder.png"} // Add a default placeholder image
                        alt={product.productName}
                        width={50}
                        height={50}
                        className="object-cover rounded-md"
                      />
                      <span>{product.productName}</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductSearch;
