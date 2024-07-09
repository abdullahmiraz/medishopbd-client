"use client";

import axios from "axios";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { serverUrl } from "../../../../api";
import { ProductData } from "../AdminDash/AddProducts/products.types";

const ProductViewer: React.FC<{ productId: string }> = ({ productId }) => {
  const [product, setProduct] = useState<ProductData | null>(null);
  const router = useRouter();
  const printableRef = useRef<HTMLDivElement>(null); // Ref to hold printable content

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
    if (printableRef.current) {
      const printableContent = printableRef.current.innerHTML;

      // Create a new iframe for printing
      const iframe = document.createElement("iframe");
      iframe.style.position = "fixed";
      iframe.style.top = "0";
      iframe.style.left = "0";
      iframe.style.width = "100%";
      iframe.style.height = "100%";
      iframe.style.border = "0";
      iframe.style.zIndex = "99999";
      document.body.appendChild(iframe);

      // Write the content to the iframe
      const doc = iframe.contentDocument || iframe.contentWindow?.document;
      if (doc) {
        doc.open();
        doc.write("<html><head><title>Print</title>");
        doc.write(
          "<style>body { font-family: Arial, sans-serif; padding: 20px; } table { width: 100%; border-collapse: collapse; } th, td { padding: 8px 12px; border: 1px solid #ddd; } th { background-color: #f4f4f4; } h2, h3 { color: #333; }</style>"
        );
        doc.write("</head><body>");
        doc.write(printableContent);
        doc.write("</body></html>");
        doc.close();

        // Wait for iframe to load before printing
        iframe.onload = () => {
          iframe.contentWindow?.focus();
          iframe.contentWindow?.print();
        };
      } else {
        console.error("Failed to access iframe document");
      }

      // Remove iframe after printing
      setTimeout(() => {
        document.body.removeChild(iframe);
      }, 1000); // Adjust timeout as needed
    } else {
      console.warn("Printable area ref is null.");
    }
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
            <div className="w-full">
              <Image
                src={product.productImage}
                alt={product.productName}
                width={500}
                height={500}
                className="rounded-md border border-gray-300 mx-auto my-5"
              />
            </div>
          )}
          <div className="w-full" ref={printableRef}>
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
                  <td className="px-4 py-2">
                    ${product.pricePerUnit.toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <th className="text-left px-4 py-2 font-semibold">
                    Manufacturer
                  </th>
                  <td className="px-4 py-2">{product.manufacturer}</td>
                </tr>
                <tr>
                  <th className="text-left px-4 py-2 font-semibold">
                    Requires Prescription
                  </th>
                  <td className="px-4 py-2">
                    {product.requiresPrescription === "true" ? "Yes" : "No"}
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
                  <td className="px-4 py-2">
                    {product.usageDetails.pharmacology || "N/A"}
                  </td>
                </tr>
                <tr>
                  <th className="text-left px-4 py-2 font-semibold">
                    Packaging Details
                  </th>
                  <td className="px-4 py-2">
                    Units Per Strip: {product.packaging?.unitsPerStrip || "N/A"}
                    <br />
                    Strips Per Box: {product.packaging?.stripsPerBox || "N/A"}
                  </td>
                </tr>
                <tr>
                  <th className="text-left px-4 py-2 font-semibold">
                    Usage Details
                  </th>
                  <td className="px-4 py-2">
                    <div>
                      <p>
                        Main Title:{" "}
                        {product.usageDetails?.indications?.mainTitle || "N/A"}
                      </p>
                      <p>
                        Subtitles:{" "}
                        {product.usageDetails?.indications?.subtitles?.join(
                          ", "
                        ) || "N/A"}
                      </p>
                      <div>
                        <p>Dosage Details:</p>
                        {product.usageDetails?.dosageDetails?.map(
                          (dosage, index) => (
                            <div key={index} className="mt-2">
                              <p>Age Range: {dosage.ageRange || "N/A"}</p>
                              <p>User Group: {dosage.userGroup || "N/A"}</p>
                              <p>
                                Dosage Instructions:{" "}
                                {dosage.dosageInstructions?.join(", ") || "N/A"}
                              </p>
                            </div>
                          )
                        ) || "N/A"}
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <h3 className="text-xl font-bold mt-6 mb-4">Stock Details</h3>
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="text-left px-4 py-2 font-semibold">
                    Batch Number
                  </th>
                  <th className="text-left px-4 py-2 font-semibold">
                    Quantity
                  </th>
                  <th className="text-left px-4 py-2 font-semibold">
                    Expiration Date
                  </th>
                  <th className="text-left px-4 py-2 font-semibold">
                    Aisle Location
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {product.stockDetails.map((stock, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2">{stock.batchNumber}</td>
                    <td className="px-4 py-2">{stock.quantity}</td>
                    <td className="px-4 py-2">
                      {stock.expirationDate.slice(0, 10)}
                    </td>
                    <td className="px-4 py-2">{stock.aisleLocation}</td>
                  </tr>
                ))}
                {product.stockDetails.length === 0 && (
                  <tr>
                    <td colSpan={4} className="text-center px-4 py-2">
                      No stock details available
                    </td>
                  </tr>
                )}
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
