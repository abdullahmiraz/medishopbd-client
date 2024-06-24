"use client";

import axios from "axios";
import { useRouter, useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ProductData } from "../AdminDash/AddProducts/products.types";
import { serverUrl } from "../../../../api";
import ProductForm from "../AdminDash/AddProducts/ProductForm";
import { Toaster, toast } from "react-hot-toast";

const EditProductsById: React.FC = () => {
  const [product, setProduct] = useState<ProductData | null>(null);
  const router = useRouter();
  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${serverUrl}/api/products/${id}`);
        setProduct(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleUpdateProduct = async (updatedProduct: ProductData) => {
    try {
      const response = await axios.put(
        `${serverUrl}/api/products/${id}`,
        updatedProduct
      );
      console.log(response.data);
      toast.success("Product Updated successfully!");
      router.push("/dashboard/productlist"); // Redirect to products list after updating
    } catch (error) {
      toast.error("Error Updating product.");

      console.error("Failed to update product:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 ">
      <Toaster />
      <div className=" bg-white rounded-md">
        <h2 className="text-2xl font-bold text-center pt-6">Edit Product</h2>
        {product ? (
          <ProductForm
            initialProduct={product}
            onSubmit={handleUpdateProduct}
          />
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};
export default EditProductsById;
