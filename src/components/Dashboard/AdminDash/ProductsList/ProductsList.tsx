"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { serverUrl } from "../../../../../api";
import Link from "next/link";
import {
  FaCloudUploadAlt,
  FaEdit,
  FaEye,
  FaStackOverflow,
  FaTrash,
} from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import { ProductData } from "../AddProducts/products.types";

const ProductsList: React.FC = () => {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState(true);

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
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete?")) {
      try {
        await toast.promise(axios.delete(`${serverUrl}/api/products/${id}`), {
          loading: "Deleting...",
          success: <b>Product deleted!</b>,
          error: <b>Error deleting product.</b>,
        });
        setProducts(products.filter((product) => product._id !== id));
      } catch (error) {
        console.error("Error deleting product:", error);
        toast.error("Error deleting product.");
      }
    }
  };

  if (loading) {
    return <div className="text-center mt-4">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4 shadow-xl">
      <Toaster />
      <h2 className="font-extrabold text-2xl text-center my-4">
        Products List
      </h2>
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
              <th>Manufacturer</th>
              <th>Available Stock</th>
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
                    <button className="bg-blue-500 rounded-md text-white cursor-pointer px-2 py-1 flex items-center">
                      <FaEye />
                      <span className="sr-only">View</span>
                    </button>
                  </Link>
                  <Link href={`/dashboard/editproduct/${product._id}`}>
                    <button className="bg-green-500 rounded-md text-white cursor-pointer px-2 py-1 flex items-center">
                      <FaCloudUploadAlt />
                      <span className="sr-only">Restock</span>
                    </button>
                  </Link>
                  <Link href={`/dashboard/editproduct/${product._id}`}>
                    <button className="bg-green-500 rounded-md text-white cursor-pointer px-2 py-1 flex items-center">
                      <FaEdit />
                      <span className="sr-only">Edit</span>
                    </button>
                  </Link>
                  <button
                    className="bg-red-500 rounded-md text-white cursor-pointer px-2 py-1 flex items-center"
                    onClick={() => handleDelete(product._id)}
                  >
                    <FaTrash />
                    <span className="sr-only">Delete</span>
                  </button>
                </td>
                <td>{index + 1}</td>
                <td>{product.productName}</td>
                <td>{product.measure}</td>
                <td>
                  {product?.primaryCategory?.name || product?.primaryCategory}
                </td>
                <td>{product?.subCategory?.name || product?.subCategory}</td>
                <td>{product.pricePerUnit}</td>
                <td>{product.manufacturer}</td>
                {product.stockDetails.map((prod) => (
                  <>
                    <td>{prod.quantity}</td>
                    <td>{prod.batchNumber}</td>
                    <td>{prod.expirationDate}</td>
                    <td>{prod.aisleLocation}</td>
                  </>
                ))}
                {/* Ensure aisleLocation is displayed */}
                <td>{product.requiresPrescription ? "Yes" : "No"}</td>{" "}
                {/* Ensure requiresPrescription is displayed */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductsList;
