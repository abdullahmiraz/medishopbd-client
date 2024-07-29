"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { serverUrl } from "../../../../../api";
import ProductForm from "./ProductForm";
import { ProductData } from "./products.types";

const AddProducts: React.FC = () => {
  const router = useRouter();

  const handleAddProduct = async (product: ProductData) => {
    try {
      const response = await axios.post(`${serverUrl}/api/products`, product);
      console
      .log(response.data);
      toast.success("Product added successfully!");
      // Reset form or show success message
    } catch (error) {
      toast.error("Error adding product.");
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 ">
      <Toaster />
      <div className=" bg-white rounded-md">
        <h2 className="text-2xl font-bold p-4">Add/Update Products</h2>

        <ProductForm onSubmit={handleAddProduct} />
      </div>
    </div>
  );
};

export default AddProducts;
