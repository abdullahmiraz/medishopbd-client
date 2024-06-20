"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { serverUrl } from "../../../../../api";
import { ProductData } from "../AddProducts/AddProducts.types";
import Link from "next/link";
import { FaEdit, FaTrash } from "react-icons/fa";

const ProductsList: React.FC = () => {
  const [products, setProducts] = useState<ProductData[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<ProductData[]>(
          `${serverUrl}/api/products`
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${serverUrl}/api/products/${id}`);
      setProducts(products.filter((product) => product._id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  if (products === undefined) {
    return <div>Loading...</div>; // Handle loading state
  }

  return (
    <div className="container mx-auto">
      <h2 className="font-extrabold text-2xl text-center my-4">
        Products List
      </h2>
      <div className="overflow-x-auto m-4 border">
        <table className="table table-zebra table-xs">
          <thead>
            <tr>
              <th>Actions</th>
              <th>Serial</th>
              <th>ID</th>
              <th>Name</th>
              <th>Measure</th>
              <th>Active Ingredient</th>
              <th>Dosage Form</th>
              <th>Application Area</th>
              <th>Primary Category</th>
              <th>Sub Category</th>
              <th>Product Type</th>
              <th>Units Per Strip</th>
              <th>Strips Per Box</th>
              <th>Price Per Unit</th>
              <th>Available Stock</th>
              <th>Manufacturer</th>
              <th>Expiration Date</th>
              <th>Batch Number</th>
              <th>Aisle Location</th>
              <th>Requires Prescription</th>
              <th>Page Category</th>
              <th>Product Image</th>
              <th>Main Title</th>
              <th>Subtitles</th>
              <th>Age Range</th>
              <th>User Group</th>
              <th>Dosage Instructions</th>
              <th>Pharmacology</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product._id}>
                <td className="flex gap-2 items-center mt-[15%]">
                  <button className="text-blue-500  cursor-pointer p-2 ">
                    <Link href={`/editproduct/${product._id}`}>
                      <FaEdit />
                    </Link>
                  </button>
                  <button className="text-red-500 cursor-pointer">
                    <FaTrash onClick={() => handleDelete(product._id)} />
                  </button>
                </td>
                <td>{index + 1}</td>
                <td>{product.productId}</td>
                <td>{product?.productName}</td>
                <td>{product?.measure}</td>
                <td>{product?.activeIngredient}</td>
                <td>{product?.dosageForm}</td>
                <td>{product?.applicationArea}</td>
                <td>{product?.primaryCategory}</td>
                <td>{product?.subCategory}</td>
                <td>{product?.productType}</td>
                <td>{product?.packaging?.unitsPerStrip}</td>
                <td>{product?.packaging?.stripsPerBox}</td>
                <td>{product?.pricePerUnit}</td>
                <td>{product?.availableStock}</td>
                <td>{product?.manufacturer}</td>
                <td>{formatDate(product?.expirationDate)}</td>
                <td>{product?.batchNumber}</td>
                <td>{product?.aisleLocation}</td>
                <td>{product?.requiresPrescription ? "Yes" : "No"}</td>
                <td>{product?.pageCategory}</td>
                <td>{product?.productImage}</td>
                <td>{product?.usageDetails?.indications?.mainTitle}</td>
                <td>
                  {product?.usageDetails?.indications?.subtitles.join(", ")}
                </td>
                <td>{product?.usageDetails?.dosageDetails?.[0]?.ageRange}</td>
                <td>{product?.usageDetails?.dosageDetails?.[0]?.userGroup}</td>
                <td>
                  {product?.usageDetails?.dosageDetails?.[0]?.dosageInstructions.join(
                    ", "
                  )}
                </td>
                <td>{product?.pharmacology}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Function to format date as 'YYYY-MM-DD'
const formatDate = (date?: Date): string => {
  if (!date) return "";
  const d = new Date(date);
  const year = d.getFullYear();
  let month = "" + (d.getMonth() + 1);
  let day = "" + d.getDate();
  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;
  return [year, month, day].join("-");
};

export default ProductsList;
