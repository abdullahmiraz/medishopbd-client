"use client";

import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { serverUrl } from "../../../../api";
import { ProductData } from "../AdminDash/AddProducts/products.types";

const ProductViewer: React.FC<{ productId: string }> = ({ productId }) => {
  const [product, setProduct] = useState<ProductData | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${serverUrl}/api/products/${productId}`
        );
        setProduct(response.data);
        sessionStorage.setItem("productDetails", JSON.stringify(response.data)); // Save to localStorage
      } catch (error) {
        console.error("Failed to fetch product:", error);
      }
    };
    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const handlePrint = () => {
    router.push(`../product/print/${productId}`);
  };

  if (!product) {
    return <div className="text-center my-20">Loading...</div>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <Toaster />
      <div className="bg-white rounded-md shadow-md p-6">
        <h2 className="text-2xl font-bold text-center mb-6">View Product</h2>
        <div className="">
          {product.productImage && (
            <div className="w-full w-full">
              <Image
                src={product.productImage}
                alt={product.productName}
                width={500}
                height={500}
                className="rounded-md border border-gray-300 mx-auto my-5"
              />
            </div>
          )}
          <div className="w-full  ">
            <table className="min-w-full divide-y divide-gray-200">
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <th className="text-left px-4 py-2 font-semibold">
                    Product ID
                  </th>
                  <td className="px-4 py-2">{product.productId}</td>
                </tr>
                <tr>
                  <th className="text-left px-4 py-2 font-semibold">Name</th>
                  <td className="px-4 py-2">{product.productName}</td>
                </tr>
                <tr>
                  <th className="text-left px-4 py-2 font-semibold">Measure</th>
                  <td className="px-4 py-2">{product.measure}</td>
                </tr>
                <tr>
                  <th className="text-left px-4 py-2 font-semibold">
                    Active Ingredient
                  </th>
                  <td className="px-4 py-2">{product.activeIngredient}</td>
                </tr>
                <tr>
                  <th className="text-left px-4 py-2 font-semibold">
                    Dosage Form
                  </th>
                  <td className="px-4 py-2">{product.dosageForm}</td>
                </tr>
                <tr>
                  <th className="text-left px-4 py-2 font-semibold">
                    Application Area
                  </th>
                  <td className="px-4 py-2">{product.applicationArea}</td>
                </tr>
                <tr>
                  <th className="text-left px-4 py-2 font-semibold">
                    Primary Category
                  </th>
                  <td className="px-4 py-2">{product.primaryCategory}</td>
                </tr>
                <tr>
                  <th className="text-left px-4 py-2 font-semibold">
                    Sub Category
                  </th>
                  <td className="px-4 py-2">{product.subCategory}</td>
                </tr>
                <tr>
                  <th className="text-left px-4 py-2 font-semibold">
                    Product Type
                  </th>
                  <td className="px-4 py-2">{product.productType}</td>
                </tr>
                <tr>
                  <th className="text-left px-4 py-2 font-semibold">
                    Price Per Unit
                  </th>
                  <td className="px-4 py-2">{product.pricePerUnit}</td>
                </tr>
                <tr>
                  <th className="text-left px-4 py-2 font-semibold">
                    Available Stock
                  </th>
                  <td className="px-4 py-2">{product.availableStock}</td>
                </tr>
                <tr>
                  <th className="text-left px-4 py-2 font-semibold">
                    Manufacturer
                  </th>
                  <td className="px-4 py-2">{product.manufacturer}</td>
                </tr>
                <tr>
                  <th className="text-left px-4 py-2 font-semibold">
                    Expiration Date
                  </th>
                  <td className="px-4 py-2">{product.expirationDate}</td>
                </tr>
                <tr>
                  <th className="text-left px-4 py-2 font-semibold">
                    Batch Number
                  </th>
                  <td className="px-4 py-2">{product.batchNumber}</td>
                </tr>
                <tr>
                  <th className="text-left px-4 py-2 font-semibold">
                    Aisle Location
                  </th>
                  <td className="px-4 py-2">{product.aisleLocation}</td>
                </tr>
                <tr>
                  <th className="text-left px-4 py-2 font-semibold">
                    Requires Prescription
                  </th>
                  <td className="px-4 py-2">
                    {product.requiresPrescription ? "Yes" : "No"}
                  </td>
                </tr>
                <tr>
                  <th className="text-left px-4 py-2 font-semibold">
                    Page Category
                  </th>
                  <td className="px-4 py-2">{product.pageCategory}</td>
                </tr>
                <tr>
                  <th className="text-left px-4 py-2 font-semibold">
                    Pharmacology
                  </th>
                  <td className="px-4 py-2">{product.pharmacology}</td>
                </tr>
                <tr>
                  <th className="text-left px-4 py-2 font-semibold">
                    Packaging Details
                  </th>
                  <td className="px-4 py-2">
                    Units Per Strip: {product.packaging?.unitsPerStrip}
                    <br />
                    Strips Per Box: {product.packaging?.stripsPerBox}
                  </td>
                </tr>
                <tr>
                  <th className="text-left px-4 py-2 font-semibold">
                    Usage Details
                  </th>
                  <td className="px-4 py-2">
                    <p>
                      Main Title: {product.usageDetails?.indications?.mainTitle}
                    </p>
                    <p>
                      Subtitles:{" "}
                      {product.usageDetails?.indications?.subtitles?.join(", ")}
                    </p>
                    <div>
                      <p>Dosage Details:</p>
                      {product.usageDetails?.dosageDetails?.map(
                        (dosage, index) => (
                          <div key={index} className="mt-2">
                            <p>Age Range: {dosage.ageRange}</p>
                            <p>User Group: {dosage.userGroup}</p>
                            <p>
                              Dosage Instructions:{" "}
                              {dosage.dosageInstructions?.join(", ")}
                            </p>
                          </div>
                        )
                      )}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <button
          onClick={handlePrint}
          className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Print
        </button>
      </div>
    </div>
  );
};

export default ProductViewer;
