"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { serverUrl } from "../../../../../api";
import { ProductData } from "../AddProducts/products.types";
import Link from "next/link";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

const ProductsList: React.FC = () => {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState(true); // Added loading state

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<ProductData[]>(`${serverUrl}/api/products`);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("Error fetching products.");
      } finally {
        setLoading(false); // Set loading to false when done
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");

    if (confirmDelete) {
      try {
        await toast.promise(
          axios.delete(`${serverUrl}/api/products/${id}`),
          {
            loading: "Deleting...",
            success: <b>Product deleted!</b>,
            error: <b>Error deleting product.</b>,
          }
        );
        const updatedProducts = products.filter((product) => product._id !== id);
        setProducts(updatedProducts);
      } catch (error) {
        console.error("Error deleting product:", error);
        toast.error("Error deleting product.");
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Handle loading state
  }

  return (
    <div className="container mx-auto p-4 shadow-xl">
      <Toaster />
      <h2 className="font-extrabold text-2xl text-center my-4">Products List</h2>
      <div className="overflow-x-auto overflow-y-auto">
        <table className="table table-zebra table-xs table-pin-rows table-pin-cols">
          <thead>
            <tr>
              <th>Actions</th>
              <th>ID</th>
              <th>Name</th>
              <th>Measure</th>
              <th>Primary-Cat</th>
              <th>Sub-Cat</th>
              <th>Price/Unit</th>
              <th>Available Stock</th>
              <th>Manufacturer</th>
              <th>Expiration Date</th>
              <th>Batch No</th>
              <th>Aisle</th>
              <th>Prescription?</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product._id}>
                <td className="flex gap-2 items-center h-20">
                  <Link href={`/dashboard/product/${product._id}`}>
                    <button className="bg-blue-500 rounded-md text-white cursor-pointer px-2 py-1 flex">
                      <FaEye />
                    </button>
                  </Link>
                  <Link href={`/dashboard/editproduct/${product._id}`}>
                    <button className="bg-green-500 rounded-md text-white cursor-pointer px-2 py-1">
                      <FaEdit />
                    </button>
                  </Link>
                  <button
                    className="bg-red-500 rounded-md text-white cursor-pointer px-2 py-1"
                    onClick={() => handleDelete(product._id)}
                  >
                    <FaTrash />
                  </button>
                </td>
                <td>{index + 1}</td>
                <td>{product?.productName}</td>
                <td>{product?.measure}</td>
                <td>{product?.primaryCategory?.name || product?.primaryCategory}</td>
                <td>{product?.subCategory?.name || product?.subCategory }</td>
                <td>{product?.pricePerUnit}</td>
                <td>{product?.availableStock}</td>
                <td>{product?.manufacturer}</td>
                <td>
                  {product?.expirationDate
                    ? product.expirationDate.slice(0, 10)
                    : ""}
                </td>
                <td>{product?.batchNumber}</td>
                <td>{product?.aisleLocation}</td>
                <td>{product?.requiresPrescription ? "Yes" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductsList;
