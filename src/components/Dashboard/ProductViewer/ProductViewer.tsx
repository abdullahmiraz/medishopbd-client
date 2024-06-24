"use client";

import axios from "axios";
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

  return (
    <div className="p-6 bg-gray-100">
      <Toaster />
      <div className="bg-white rounded-md p-6">
        <h2 className="text-2xl font-bold text-center pt-6">View Product</h2>
        {product ? (
          <div>
            <div className="my-4">
              <p>
                <strong>Product ID:</strong> {product.productId}
              </p>
              <p>
                <strong>Name:</strong> {product.productName}
              </p>
              <p>
                <strong>Measure:</strong> {product.measure}
              </p>
              <p>
                <strong>Active Ingredient:</strong> {product.activeIngredient}
              </p>
              <p>
                <strong>Dosage Form:</strong> {product.dosageForm}
              </p>
              <p>
                <strong>Application Area:</strong> {product.applicationArea}
              </p>
              <p>
                <strong>Primary Category:</strong> {product.primaryCategory}
              </p>
              <p>
                <strong>Sub Category:</strong> {product.subCategory}
              </p>
              <p>
                <strong>Product Type:</strong> {product.productType}
              </p>
              <p>
                <strong>Price Per Unit:</strong> {product.pricePerUnit}
              </p>
              <p>
                <strong>Available Stock:</strong> {product.availableStock}
              </p>
              <p>
                <strong>Manufacturer:</strong> {product.manufacturer}
              </p>
              <p>
                <strong>Expiration Date:</strong> {product.expirationDate}
              </p>
              <p>
                <strong>Batch Number:</strong> {product.batchNumber}
              </p>
              <p>
                <strong>Aisle Location:</strong> {product.aisleLocation}
              </p>
              <p>
                <strong>Requires Prescription:</strong>{" "}
                {product.requiresPrescription ? "Yes" : "No"}
              </p>
              <p>
                <strong>Page Category:</strong> {product.pageCategory}
              </p>
              {product.productImage && (
                <div>
                  <strong>Image:</strong>
                  <img
                    src={product.productImage}
                    alt={product.productName}
                    className="my-2"
                  />
                </div>
              )}
              <p>
                <strong>Pharmacology:</strong> {product.pharmacology}
              </p>
              <div>
                <strong>Packaging Details:</strong>
                <p>Units Per Strip: {product.packaging?.unitsPerStrip}</p>
                <p>Strips Per Box: {product.packaging?.stripsPerBox}</p>
              </div>
              <div>
                <strong>Usage Details:</strong>
                <p>Indications:</p>
                <p>
                  Main Title: {product.usageDetails?.indications?.mainTitle}
                </p>
                <p>
                  Subtitles:{" "}
                  {product.usageDetails?.indications?.subtitles?.join(", ")}
                </p>
                <p>Dosage Details:</p>
                {product.usageDetails?.dosageDetails?.map((dosage, index) => (
                  <div key={index}>
                    <p>Age Range: {dosage.ageRange}</p>
                    <p>User Group: {dosage.userGroup}</p>
                    <p>
                      Dosage Instructions:{" "}
                      {dosage.dosageInstructions?.join(", ")}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Print
            </button>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default ProductViewer;
