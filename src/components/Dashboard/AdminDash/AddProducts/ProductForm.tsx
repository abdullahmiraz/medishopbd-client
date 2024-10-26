"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { serverUrl } from "../../../../../api";
import BasicInformation from "./BasicInformation";
import CategoryDetails from "./CategoryDetails";
import ImageUpload from "./ImageUpload";
import Packaging from "./Packaging";
import StockInformation from "./StockInformation";
import UsageDetails from "./UsageDetails";

const ProductForm = ({ onSubmit, initialProduct }: any) => {
  const [product, setProduct] = useState(
    initialProduct || {
      productId: 0,
      productName: "",
      measure: "",
      dosageForm: "",
      // productCode: "",
      activeIngredient: "",
      applicationArea: "",
      productType: "",
      primaryCategory: "",
      subCategory: "",
      packaging: {
        unitsPerStrip: 0,
        stripsPerBox: 0,
      },
      buyingPricePerUnit: 0,
      pricePerUnit: 0,
      stockDetails: [
        {
          batchNumber: "",
          quantity: 0,
          expirationDate: "",
          aisleLocation: "",
        },
      ],
      manufacturer: "",
      requiresPrescription: "",
      pageCategory: "",
      productImage: "",
      leafletImage: "",
      usageDetails: {
        indications: {
          mainTitle: "",
          subtitles: [],
        },
        dosageDetails: [
          {
            ageRange: "",
            userGroup: "",
            dosageInstructions: [],
          },
        ],
        pharmacology: "",
      },
    }
  );

  const [categories, setCategories] = useState<
    {
      _id: string;
      name: string;
      subCategories: { _id: string; name: string }[];
    }[]
  >([]);
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
          (cat) => cat._id === product.primaryCategory
        );
        setSubCategories(initialCategory ? initialCategory.subCategories : []);
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    };

    loadCategories();
  }, [product.primaryCategory]);

  useEffect(() => {
    const selectedCategory = categories.find(
      (category) => category._id === product.primaryCategory
    );
    setSubCategories(selectedCategory ? selectedCategory.subCategories : []);
  }, [product.primaryCategory, categories]);

  // Handle category change
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategoryId = e.target.value;
    console.log(selectedCategoryId);
    const selectedCategory = categories.find(
      (cat) => cat._id === selectedCategoryId
    );
    setProduct((prev) => ({
      ...prev,
      primaryCategory: selectedCategoryId,
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
    const numericValue =
      name === "unitsPerStrip" ||
      name === "stripsPerBox" ||
      name === "pricePerUnit" ||
      name === "buyingPricePerUnit"
        ? parseFloat(value)
        : value;

    setProduct((prev) => ({
      ...prev,
      [name]: numericValue,
    }));
  };

  // Handle changes in packaging details
  const handlePackagingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      packaging: {
        ...prev.packaging,
        [name]: parseFloat(value),
      },
    }));
  };

  // Handle changes in usage details
  const handleUsageDetailsChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      usageDetails: {
        ...prev.usageDetails,
        [name]: value,
      },
    }));
  };

  // Handle changes in indications
  const handleIndicationsChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      usageDetails: {
        ...prev.usageDetails,
        indications: {
          ...prev.usageDetails.indications,
          [name]: value,
        },
      },
    }));
  };

  // Handle changes in dosage details
  const handleDosageDetailChange = (
    index: number,
    field: string,
    value: any
  ) => {
    setProduct((prev) => {
      const updatedDosageDetails = [...prev.usageDetails.dosageDetails];
      updatedDosageDetails[index] = {
        ...updatedDosageDetails[index],
        [field]: value,
      };
      return {
        ...prev,
        usageDetails: {
          ...prev.usageDetails,
          dosageDetails: updatedDosageDetails,
        },
      };
    });
  };

  // Add or remove dosage detail
  const handleAddDosageDetail = () => {
    setProduct((prev) => ({
      ...prev,
      usageDetails: {
        ...prev.usageDetails,
        dosageDetails: [
          ...prev.usageDetails.dosageDetails,
          {
            ageRange: "",
            userGroup: "",
            dosageInstructions: [],
          },
        ],
      },
    }));
  };

  const handleRemoveDosageDetail = (index: number) => {
    setProduct((prev) => ({
      ...prev,
      usageDetails: {
        ...prev.usageDetails,
        dosageDetails: prev.usageDetails.dosageDetails.filter(
          (_, i) => i !== index
        ),
      },
    }));
  };

  // Handle dosage instruction change
  const handleDosageInstructionChange = (
    dosageIndex: number,
    instructionIndex: number,
    value: string
  ) => {
    setProduct((prev) => {
      const updatedDosageDetails = [...prev.usageDetails.dosageDetails];
      updatedDosageDetails[dosageIndex].dosageInstructions[instructionIndex] =
        value;
      return {
        ...prev,
        usageDetails: {
          ...prev.usageDetails,
          dosageDetails: updatedDosageDetails,
        },
      };
    });
  };

  // Handle indication subtitle change
  const handleIndicationSubtitleChange = (index: number, value: string) => {
    setProduct((prev) => {
      const updatedSubtitles = [...prev.usageDetails.indications.subtitles];
      updatedSubtitles[index] = value;
      return {
        ...prev,
        usageDetails: {
          ...prev.usageDetails,
          indications: {
            ...prev.usageDetails.indications,
            subtitles: updatedSubtitles,
          },
        },
      };
    });
  };

  // Handle input change for stock details
  const handleStockChange = (index: number, field: string, value: any) => {
    setProduct((prev) => {
      const updatedStockDetails = [...prev.stockDetails];
      updatedStockDetails[index] = {
        ...updatedStockDetails[index],
        [field]: value,
      };
      return { ...prev, stockDetails: updatedStockDetails };
    });
  };

  // Add or remove stock detail
  const handleAddStock = () => {
    setProduct((prev) => ({
      ...prev,
      stockDetails: [
        ...prev.stockDetails,
        { batchNumber: "", quantity: 0, expirationDate: "", aisleLocation: "" },
      ],
    }));
  };

  const handleRemoveStock = (index: number) => {
    setProduct((prev) => ({
      ...prev,
      stockDetails: prev.stockDetails.filter((_, i) => i !== index),
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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

      onSubmit(productData);
      console.log("Form submitted with data:", productData);
    } catch (error) {
      console.error("Failed to save product", error);
      toast.error("Failed to save product. Please try again.");
    } finally {
      setLoadingProduct(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 rounded-md">
      <Toaster />
      {error && <p className="text-red-500">{error}</p>}
      <BasicInformation
        productId={product.productId}
        productName={product.productName}
        measure={product.measure}
        dosageForm={product.dosageForm}
        productCode={product.productCode}
        activeIngredient={product.activeIngredient}
        manufacturer={product.manufacturer}
        requiresPrescription={product.requiresPrescription}
        pageCategory={product.pageCategory}
        applicationArea={product.applicationArea}
        productType={product.productType}
        buyingPricePerUnit={product.buyingPricePerUnit}
        pricePerUnit={product.pricePerUnit}
        // primaryCategory={product.primaryCategory}
        // subCategory={product.subCategory}
        onChange={handleInputChange}
      />
      <CategoryDetails
        primaryCategory={product.primaryCategory}
        subCategory={product.subCategory}
        onCategoryChange={handleCategoryChange}
        onSubCategoryChange={handleSubCategoryChange}
        // categories={categories}
        // subCategories={subCategories}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4">
        <ImageUpload
          productImageUrl={product.productImage}
          leafletImageUrl={product.leafletImage}
          onImageChange={handleImageChange}
        />
        <Packaging
          unitsPerStrip={product?.packaging?.unitsPerStrip}
          stripsPerBox={product?.packaging?.stripsPerBox}
          handlePackagingChange={handlePackagingChange}
        />
      </div>
      <StockInformation
        stockDetails={product.stockDetails}
        handleStockChange={handleStockChange}
        handleAddStock={handleAddStock}
        handleRemoveStock={handleRemoveStock}
      />
      <UsageDetails
        indications={product?.usageDetails?.indications}
        dosageDetails={product?.usageDetails?.dosageDetails}
        pharmacology={product?.usageDetails?.pharmacology}
        handleUsageDetailsChange={handleUsageDetailsChange}
        handleIndicationsChange={handleIndicationsChange}
        handleDosageDetailChange={handleDosageDetailChange}
        handleDosageInstructionChange={handleDosageInstructionChange}
        handleAddDosageDetail={handleAddDosageDetail}
        handleRemoveDosageDetail={handleRemoveDosageDetail}
        handleIndicationSubtitleChange={handleIndicationSubtitleChange}
      />
      <button type="submit" className="btn btn-warning my-4 w-full">
        Submit
      </button>
    </form>
  );
};

export default ProductForm;
