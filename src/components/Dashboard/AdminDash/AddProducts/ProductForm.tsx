"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { serverUrl } from "../../../../../api";
import BasicInformation from "./BasicInformation";
import CategoryDetails from "./CategoryDetails";
import ImageUpload from "./ImageUpload";
import Packaging from "./Packaging";
import StockInformation from "./StockInformation";
import UsageDetails from "./UsageDetails";

const ProductForm: React.FC = ({ onSubmit }) => {
  const [product, setProduct] = useState<{
    productName: string;
    measure: string;
    activeIngredient: string;
    dosageForm: string;
    applicationArea: string;
    productType: string;
    primaryCategory: string;
    subCategory: string;
    unitsPerStrip: number;
    stripsPerBox: number;
    batchNumber: string;
    quantity: number;
    expirationDate: string;
    aisleLocation: string;
    productImage: string;
    leafletImage: string;
    indications: string;
    ageRange: string;
    userGroup: string;
    dosageInstructions: string;
    pharmacology: string;
  }>({
    productName: "",
    measure: "",
    activeIngredient: "",
    dosageForm: "",
    applicationArea: "",
    productType: "",
    primaryCategory: "",
    subCategory: "",
    unitsPerStrip: 0,
    stripsPerBox: 0,
    batchNumber: "",
    quantity: 0,
    expirationDate: "",
    aisleLocation: "",
    productImage: "",
    leafletImage: "",
    indications: "",
    ageRange: "",
    userGroup: "",
    dosageInstructions: "",
    pharmacology: "",
  });

  const [categories, setCategories] = useState<{ _id: string; name: string }[]>(
    []
  );
  const [subCategories, setSubCategories] = useState<
    { _id: string; name: string }[]
  >([]);
  const [loadingProduct, setLoadingProduct] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedProductImage, setSelectedProductImage] = useState<File | null>(
    null
  );
  const [selectedLeafletImage, setSelectedLeafletImage] = useState<File | null>(
    null
  );

  const imageHostingKey = process.env.NEXT_PUBLIC_IMAGE_HOSTING_KEY;
  const imageHostingAPI = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await axios.get(`${serverUrl}/api/categories`);
        setCategories(response.data);

        // Initialize subCategories based on the initial product's primaryCategory
        const initialCategory = response.data.find(
          (cat: any) => cat._id === product.primaryCategory?.id
        );
        setSubCategories(initialCategory ? initialCategory.subCategories : []);
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    };

    loadCategories();
  }, [product.primaryCategory?.id]);

  useEffect(() => {
    const selectedCategory = categories.find(
      (category) => category._id === product.primaryCategory?.id
    );
    setSubCategories(selectedCategory ? selectedCategory.subCategories : []);
  }, [product.primaryCategory?.id, categories]);

  // Handle category change
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setProduct((prev) => ({
      ...prev,
      primaryCategory: e.target.value,
      subCategory: "",
    }));
  };

  // Handle sub-category change
  const handleSubCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setProduct((prev) => ({
      ...prev,
      subCategory: e.target.value,
    }));
  };

  // Handle input change
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle image file change and notify parent
  const handleImageChange = (
    productImage: File | null,
    leafletImage: File | null
  ) => {
    setSelectedProductImage(productImage);
    setSelectedLeafletImage(leafletImage);
  };

  // Upload images and submit the form
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent page reload

    setLoadingProduct(true);

    try {
      let productImageUrl = product.productImage;
      if (selectedProductImage) {
        const formDataProduct = new FormData();
        formDataProduct.append("image", selectedProductImage);
        const responseProduct = await fetch(imageHostingAPI, {
          method: "POST",
          body: formDataProduct,
        });

        const dataProduct = await responseProduct.json();
        if (dataProduct && dataProduct.data && dataProduct.data.url) {
          productImageUrl = dataProduct.data.url;
        } else {
          throw new Error("Product image upload failed");
        }
      }

      let leafletImageUrl = product.leafletImage;
      if (selectedLeafletImage) {
        const formDataLeaflet = new FormData();
        formDataLeaflet.append("image", selectedLeafletImage);
        const responseLeaflet = await fetch(imageHostingAPI, {
          method: "POST",
          body: formDataLeaflet,
        });

        const dataLeaflet = await responseLeaflet.json();
        if (dataLeaflet && dataLeaflet.data && dataLeaflet.data.url) {
          leafletImageUrl = dataLeaflet.data.url;
        } else {
          throw new Error("Leaflet image upload failed");
        }
      }

      // Submit product data
      // Final product data
      const productData = {
        ...product,
        productImage: productImageUrl,
        leafletImage: leafletImageUrl,
      };

      // Call the onSubmit prop function with the product data
      onSubmit(productData);
      // Replace with actual form submission logic
      console.log("Form submitted with data:", productData);
      // Example: await saveProduct(productData);
      alert("Product saved successfully!");
    } catch (error) {
      console.error("Failed to save product", error);
      alert("Failed to save product. Please try again.");
    } finally {
      setLoadingProduct(false);
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <BasicInformation
        productName={product.productName}
        measure={product.measure}
        activeIngredient={product.activeIngredient}
        dosageForm={product.dosageForm}
        applicationArea={product.applicationArea}
        productType={product.productType}
        primaryCategory={product.primaryCategory}
        subCategory={product.subCategory}
        onChange={handleInputChange}
      />
      <CategoryDetails
        primaryCategory={product.primaryCategory}
        subCategory={product.subCategory}
        onCategoryChange={handleCategoryChange}
        onSubCategoryChange={handleSubCategoryChange}
        categories={categories}
        subCategories={subCategories}
      />
      <Packaging
        unitsPerStrip={product.unitsPerStrip}
        stripsPerBox={product.stripsPerBox}
        onChange={handleInputChange}
      />
      <StockInformation
        batchNumber={product.batchNumber}
        quantity={product.quantity}
        expirationDate={product.expirationDate}
        aisleLocation={product.aisleLocation}
        onChange={handleInputChange}
      />

      <UsageDetails
        indications={product.indications}
        dosageDetails={{
          ageRange: product.ageRange,
          userGroup: product.userGroup,
          dosageInstructions: product.dosageInstructions,
        }}
        pharmacology={product.pharmacology}
        onChange={handleInputChange}
      />
      <ImageUpload
        onImageChange={handleImageChange}
        productImageUrl={product.productImage}
        leafletImageUrl={product.leafletImage}
      />
      <button
        type="submit"
        disabled={loadingProduct}
        className="btn btn-primary mt-4"
      >
        {loadingProduct ? "Saving Product..." : "Save Product"}
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
};

export default ProductForm;
