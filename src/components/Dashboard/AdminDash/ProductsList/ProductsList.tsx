"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { serverUrl } from "../../../../../api";
import { ProductData } from "../AddProducts/products.types";

const ProductsList: React.FC = () => {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState(true);
  const currentDate = JSON.stringify(new Date()).substring(1, 11);
  console.log(currentDate);
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

  console.log(products[0]?.stockDetails[0]?.expirationDate);
  if (loading) {
    return <div className="text-center mt-4">Loading...</div>;
  }

  return (
    <div className="p-4 shadow-xl relative">
      <Toaster />
      <h2 className="text-2xl font-bold mb-4">Products List</h2>

      <div className="">
        <table className="table table-zebra table-xs border ">
          <thead>
            <tr className="bg-gray-200 text-black">
              <th className="max-w-32 border   ">Actions</th>
              <th className="max-w-32 border">ID</th>
              <th className="max-w-32 border">Name</th>
              <th className="max-w-32 border">Measure</th>
              <th className="max-w-32 border">Code</th>
              <th className="max-w-32 border">Primary-Cat</th>
              <th className="max-w-32 border">Sub-Cat</th>
              <th className="max-w-32 border">Buy Price</th>
              <th className="max-w-32 border">Price/Unit</th>
              <th className="max-w-32 border">Manufacturer</th>
              <th className="border ">Available Stock</th>
              <th className=" border">Expiration Date</th>
              <th className=" border">Batch Num.</th>
              <th className="border">Aisle No.</th>
              <th className="max-w-32 border">Prescription?</th>
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
                <td className="max-w-32 border ">{index + 1}</td>
                <td className="max-w-32 border">{product.productName}</td>
                <td className="max-w-32 border">{product.measure}</td>
                <td className="max-w-32 border">{product?.productCode}</td>
                <td className="max-w-32 border">
                  {product?.primaryCategory?.name || product?.primaryCategory}
                </td>
                <td className="max-w-32 border">
                  {product?.subCategory?.name || product?.subCategory}
                </td>
                <td className="max-w-32 border">
                  {product.buyingPricePerUnit}
                </td>
                <td className="max-w-32 border">{product.pricePerUnit}</td>
                <td className="max-w-32 border">{product.manufacturer}</td>
                {/* stock details  */}
                <td className="border">
                  {product?.stockDetails?.map((item) => (
                    <li
                      className={
                        item?.quantity <= 10 ? "bg-red-500 text-white" : ""
                      }
                      key={item.quantity}
                    >
                      {item?.quantity}
                    </li>
                  ))}
                </td>

                <td className="border ">
                  {product?.stockDetails?.map((item) => (
                    <li
                      key={item.expirationDate}
                      className={
                        new Date(item.expirationDate) < new Date(currentDate)
                          ? "bg-red-500 text-white"
                          : ""
                      }
                    >
                      {item?.expirationDate}
                    </li>
                  ))}
                </td>

                <td className="border ">
                  {product?.stockDetails?.map((item) => (
                    <li key={item.batchNumber}>{item?.batchNumber}</li>
                  ))}
                </td>
                <td className="w-32 border">
                  {product?.stockDetails?.map((item) => (
                    <li key={item.aisleLocation}>{item?.aisleLocation}</li>
                  ))}
                </td>
                <td className="max-w-32 border">
                  {product.requiresPrescription == "true" ? "Yes" : "No"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductsList;
