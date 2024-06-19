"use client";

import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { serverUrl } from "../../../../../api";

const AddProducts: React.FC = () => {
  const [productData, setProductData] = useState<ProductData>({
    productId: "",
    productName: "",
    measure: "",
    activeIngredient: "",
    dosageForm: "",
    applicationArea: "",
    primaryCategory: "",
    subCategory: "",
    productType: "",
    packaging: { unitsPerStrip: "", stripsPerBox: "" },
    pricePerUnit: "",
    availableStock: "",
    manufacturer: "",
    expirationDate: "",
    batchNumber: "",
    aisleLocation: "",
    requiresPrescription: false,
    pageCategory: "",
    productImage: "",
    usageDetails: {
      indications: { mainTitle: "", subtitles: [""] },
      dosageDetails: [
        { ageRange: "", userGroup: "", dosageInstructions: [""] },
      ],
    },
    pharmacology: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setProductData({ ...productData, [name]: checked });
    } else {
      setProductData({ ...productData, [name]: value });
    }
  };

  const handleNestedChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    nestedKey: string,
    index: number,
    subKey: string
  ) => {
    const { value } = e.target;
    const updatedData = { ...productData };

    // Split nested keys to handle deep nested objects
    const keys = nestedKey.split(".");

    // Traverse through the nested structure to the correct level
    let nestedObj: any = updatedData;
    for (let i = 0; i < keys.length; i++) {
      if (!nestedObj[keys[i]]) {
        nestedObj[keys[i]] = i === keys.length - 1 ? {} : [];
      }
      if (i === keys.length - 1) {
        if (Array.isArray(nestedObj[keys[i]])) {
          nestedObj[keys[i]][index][subKey] = value;
        } else {
          nestedObj[keys[i]][subKey] = value;
        }
      } else {
        nestedObj = nestedObj[keys[i]];
      }
    }

    setProductData(updatedData);
  };

  const handleArrayChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    nestedKey: string,
    index: number,
    subIndex: number
  ) => {
    const { value } = e.target;
    const updatedData = { ...productData };

    const keys = nestedKey.split(".");

    let nestedObj: any = updatedData;
    for (let i = 0; i < keys.length; i++) {
      if (!nestedObj[keys[i]]) {
        nestedObj[keys[i]] = i === keys.length - 1 ? [] : {};
      }
      nestedObj = nestedObj[keys[i]];
    }

    // Ensure the nested array at index exists
    if (!nestedObj[index]) {
      nestedObj[index] = { dosageInstructions: [] };
    }

    // Ensure the dosageInstructions array exists
    if (!nestedObj[index].dosageInstructions) {
      nestedObj[index].dosageInstructions = [];
    }

    nestedObj[index].dosageInstructions[subIndex] = value;

    setProductData(updatedData);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${serverUrl}/api/products`,
        productData
      );
      console.log(productData);
      toast.success("Product added successfully!");
      // Reset form or show success message
    } catch (error) {
      toast.error("Error adding product.");
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-100">
      <Toaster />
      <div className=" bg-white">
        <h2 className="text-2xl font-bold text-center mt-4">Add New Product</h2>
        <form
          onSubmit={handleSubmit}
          className="w-full mx-auto p-8 shadow-md rounded-lg"
        >
          <div className=" grid grid-cols-3 md:grid-cols-4 gap-4">
            {/* Product form fields */}
            {/* Repeated field examples */}
            <div className="mb-4">
              <label className="block mb-1">Product ID</label>
              <input
                type="number"
                name="productId"
                value={productData.productId}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Product Name</label>
              <input
                type="text"
                name="productName"
                value={productData.productName}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Measure</label>
              <input
                type="text"
                name="measure"
                value={productData.measure}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Active Ingredient</label>
              <input
                type="text"
                name="activeIngredient"
                value={productData.activeIngredient}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />
            </div>
            {/* Add remaining fields here */}
            <div className="mb-4">
              <label className="block mb-1">Units Per Strip</label>
              <input
                type="number"
                name="unitsPerStrip"
                value={productData.packaging.unitsPerStrip}
                onChange={(e) =>
                  handleNestedChange(e, "packaging", 0, "unitsPerStrip")
                }
                className="input input-bordered w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Strips Per Box</label>
              <input
                type="number"
                name="stripsPerBox"
                value={productData.packaging.stripsPerBox}
                onChange={(e) =>
                  handleNestedChange(e, "packaging", 0, "stripsPerBox")
                }
                className="input input-bordered w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Price Per Unit</label>
              <input
                type="number"
                name="pricePerUnit"
                value={productData.pricePerUnit}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Available Stock</label>
              <input
                type="number"
                name="availableStock"
                value={productData.availableStock}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Manufacturer</label>
              <input
                type="text"
                name="manufacturer"
                value={productData.manufacturer}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Expiration Date</label>
              <input
                type="date"
                name="expirationDate"
                value={productData.expirationDate}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Batch Number</label>
              <input
                type="text"
                name="batchNumber"
                value={productData.batchNumber}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Aisle Location</label>
              <input
                type="text"
                name="aisleLocation"
                value={productData.aisleLocation}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Page Category</label>
              <input
                type="text"
                name="pageCategory"
                value={productData.pageCategory}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Product Image URL</label>
              <input
                type="text"
                name="productImage"
                value={productData.productImage}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Indications Main Title</label>
              <input
                type="text"
                name="mainTitle"
                value={productData.usageDetails.indications.mainTitle}
                onChange={(e) =>
                  handleNestedChange(
                    e,
                    "usageDetails.indications",
                    0,
                    "mainTitle"
                  )
                }
                className="input input-bordered w-full"
              />
            </div>
            {productData.usageDetails.indications.subtitles.map(
              (subtitle, index) => (
                <div key={index} className="mb-4">
                  <label className="block mb-1">Subtitle {index + 1}</label>
                  <input
                    type="text"
                    name="subtitles"
                    value={subtitle}
                    onChange={(e) =>
                      handleArrayChange(
                        e,
                        "usageDetails.indications.subtitles",
                        0,
                        index
                      )
                    }
                    className="input input-bordered w-full"
                  />
                </div>
              )
            )}
            <div className="mb-4">
              <label className="block mb-1">Pharmacology</label>
              <input
                name="pharmacology"
                value={productData.pharmacology}
                onChange={handleChange}
                className="textarea textarea-bordered w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Requires Prescription</label>
              <input
                type="checkbox"
                name="requiresPrescription"
                checked={productData.requiresPrescription}
                onChange={handleChange}
                className="checkbox"
              />
            </div>
          </div>
          {productData.usageDetails.dosageDetails.map((detail, index) => (
            <div key={index} className="grid grid-cols-3 gap-4">
              <div className="mb-4">
                <label className="block mb-1">Age Range</label>
                <input
                  type="text"
                  name="ageRange"
                  value={detail.ageRange}
                  onChange={(e) =>
                    handleNestedChange(
                      e,
                      "usageDetails.dosageDetails",
                      index,
                      "ageRange"
                    )
                  }
                  className="input input-bordered w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">User Group</label>
                <input
                  type="text"
                  name="userGroup"
                  value={detail.userGroup}
                  onChange={(e) =>
                    handleNestedChange(
                      e,
                      "usageDetails.dosageDetails",
                      index,
                      "userGroup"
                    )
                  }
                  className="input input-bordered w-full"
                />
              </div>
              {detail.dosageInstructions.map((instruction, subIndex) => (
                <div key={subIndex} className="mb-4">
                  <label className="block mb-1">
                    Dosage Instruction {subIndex + 1}
                  </label>
                  <input
                    type="text"
                    name="dosageInstructions"
                    value={instruction}
                    onChange={(e) =>
                      handleArrayChange(
                        e,
                        "usageDetails.dosageDetails",
                        index,
                        subIndex
                      )
                    }
                    className="input input-bordered w-full"
                  />
                </div>
              ))}
            </div>
          ))}

          <button type="submit" className="btn btn-primary w-full">
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProducts;
