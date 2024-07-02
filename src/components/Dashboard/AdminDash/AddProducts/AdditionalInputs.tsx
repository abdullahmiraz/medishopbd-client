"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { serverUrl } from "../../../../../api";
import { ProductData } from "../../../../../types/products.types";  // Import the correct ProductData type

interface SubCategory {
  id: string;
  name: string;
}

interface Category {
  id: string;
  name: string;
  subCategories: SubCategory[];
}

interface Props {
  productData: ProductData;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onCategoryChange: (categoryId: string) => void;
  onSubCategoryChange: (subCategoryId: string) => void;
}

const AdditionalInputs: React.FC<Props> = ({ productData, onChange, onCategoryChange, onSubCategoryChange }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${serverUrl}/api/categories`);
        setCategories(response.data);
      } catch (err) {
        setError("Failed to fetch categories");
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (productData.primaryCategory && productData.primaryCategory.id) {
      setSelectedCategoryId(productData?.primaryCategory?.id);
    } else {
      setSelectedCategoryId(null);
    }
  }, [productData.primaryCategory]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategoryId = e.target.value;
    setSelectedCategoryId(selectedCategoryId);
    onChange(e);  // Pass the event to the parent component
    onCategoryChange(selectedCategoryId);  // Call the additional handler for category change
  };

  const handleSubCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e);  // Pass the event to the parent component
    onSubCategoryChange(e.target.value);  // Call the additional handler for sub-category change
  };

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <>
      <div className="mb-4">
        <label className="block mb-1">Dosage Form</label>
        <select
          name="dosageForm"
          value={productData.dosageForm}
          onChange={onChange}
          className="select select-bordered w-full"
        >
          <option value="">Select Dosage Form</option>
          <option value="Tablet">Tablet</option>
          <option value="Capsule">Capsule</option>
          <option value="Liquid">Liquid</option>
          <option value="Injection">Injection</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-1">Application Area</label>
        <select
          name="applicationArea"
          value={productData?.applicationArea}
          onChange={onChange}
          className="select select-bordered w-full"
        >
          <option value="">Select Application Area</option>
          <option value="Oral">Oral</option>
          <option value="Topical">Topical</option>
          <option value="Injection">Injection</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-1">Primary Category</label>
        <select
          name="primaryCategory.id"
          value={productData?.primaryCategory.id}
          onChange={handleCategoryChange}
          className="select select-bordered w-full"
        >
          <option value="">Select Primary Category</option>
          {categories.map((category) => (
            <option key={category?.id} value={category?.id}>
              {category?.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-1">Sub Category</label>
        <select
          name="subCategory.id"
          value={productData?.subCategory?.id}
          onChange={handleSubCategoryChange}
          className="select select-bordered w-full"
          disabled={!selectedCategoryId}
        >
          <option value="">Select Sub Category</option>
          {selectedCategoryId &&
            categories
              .find((category) => category.id === selectedCategoryId)
              ?.subCategories?.map((subCategory) => (
                <option key={subCategory.id} value={subCategory.id}>
                  {subCategory.name}
                </option>
              ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-1">Product Type</label>
        <select
          name="productType"
          value={productData.productType}
          onChange={onChange}
          className="select select-bordered w-full"
        >
          <option value="">Select Product Type</option>
          <option value="Medicine">Medicine</option>
          <option value="Supplement">Supplement</option>
          <option value="Cosmetic">Cosmetic</option>
        </select>
      </div>
    </>
  );
};

export default AdditionalInputs;
