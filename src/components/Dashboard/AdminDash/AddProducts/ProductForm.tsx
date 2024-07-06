import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Toaster } from "react-hot-toast";
import { serverUrl } from "../../../../../api";
import { Category, ProductData } from "./products.types";

interface ProductFormProps {
  initialProduct?: ProductData;
  onSubmit: (product: ProductData) => void;
}

const imageHostingKey = process.env.NEXT_PUBLIC_IMAGE_HOSTING_KEY;
const imageHostingAPI = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;

const ProductForm: React.FC<ProductFormProps> = ({
  initialProduct,
  onSubmit,
}) => {
  const [productData, setProductData] = useState<ProductData>(
    initialProduct || {
      productId: 0,
      productName: "",
      measure: "",
      activeIngredient: "",
      dosageForm: "",
      applicationArea: "",
      primaryCategory: {
        name: "",
        description: "",
        categoryImage: "",
        categoryCode: "",
      },
      subCategory: {
        name: "",
        description: "",
        categoryImage: "",
        subCategoryCode: "",
      },
      productType: "",
      packaging: {
        // Default to optional fields if they are not provided
        unitsPerStrip: 0,
        stripsPerBox: 0,
      },
      pricePerUnit: 0, // Changed from string to number
      availableStock: 0, // Changed from string to number
      manufacturer: "",
      expirationDate: "",
      batchNumber: "",
      aisleLocation: "",
      requiresPrescription: false,
      pageCategory: "",
      productImage: "",
      leafletImage: "",
      usageDetails: {
        indications: {
          mainTitle: "",
          subtitles: [],
        },
        dosageDetails: [],
      },
      pharmacology: "",
    }
  );

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<Category[]>([]);
  const productImageInputRef = useRef<HTMLInputElement>(null);
  const leafletImageInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initialProduct) {
      setProductData(initialProduct);
    }
  }, [initialProduct]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${serverUrl}/api/categories`);
        setCategories(response.data);
        // Initialize subCategories based on the initial product's primaryCategory
        const initialCategory = response.data.find(
          (cat) => cat._id === productData.primaryCategory
        );
        setSubCategories(initialCategory ? initialCategory.subCategories : []);
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const selectedCategory = categories.find(
      (category) => category._id === productData.primaryCategory
    );
    setSubCategories(selectedCategory ? selectedCategory.subCategories : []);
  }, [productData.primaryCategory, categories]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setProductData({ ...productData, [name]: checked });
    } else {
      setProductData({ ...productData, [name]: value });
    }
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const categoryId = e.target.value;
    const selectedCategory = categories.find((cat) => cat._id === categoryId);

    setProductData({
      ...productData,
      primaryCategory: selectedCategory || {
        _id: "",
        name: "",
        description: "",
        categoryImage: "",
        categoryCode: "",
        subCategories: [],
      },
      subCategory: {
        _id: "",
        name: "",
        description: "",
        categoryImage: "",
        subCategoryCode: "",
      },
    });

    // Initialize subCategories based on the selected category
    setSubCategories(selectedCategory ? selectedCategory.subCategories : []);
  };

  const handleSubCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const subCategoryId = e.target.value;
    const selectedSubCategory = subCategories.find(
      (subCat) => subCat._id === subCategoryId
    );

    setProductData({
      ...productData,
      subCategory: selectedSubCategory || {
        _id: "",
        name: "",
        description: "",
        categoryImage: "",
        subCategoryCode: "",
      },
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Create promises for image uploads
    const uploadImagePromises: Promise<void>[] = [];
    let productImageURL = productData.productImage;
    let leafletImageURL = productData.leafletImage;

    if (productImageInputRef.current?.files?.[0]) {
      const formData = new FormData();
      formData.append("image", productImageInputRef.current.files[0]);
      uploadImagePromises.push(
        axios
          .post(imageHostingAPI, formData, {
            headers: { "Content-Type": "multipart/form-data" },
          })
          .then((response) => {
            if (response.data.success) {
              productImageURL = response.data.data.url;
            }
          })
      );
    }

    if (leafletImageInputRef.current?.files?.[0]) {
      const formData = new FormData();
      formData.append("image", leafletImageInputRef.current.files[0]);
      uploadImagePromises.push(
        axios
          .post(imageHostingAPI, formData, {
            headers: { "Content-Type": "multipart/form-data" },
          })
          .then((response) => {
            if (response.data.success) {
              leafletImageURL = response.data.data.url;
            }
          })
      );
    }

    // Wait for all image uploads to complete
    await Promise.all(uploadImagePromises);

    // Update product data with image URLs
    const updatedProductData = {
      ...productData,
      productImage: productImageURL,
      leafletImage: leafletImageURL,
    };

    // Submit the form data
    onSubmit(updatedProductData);
    console.log(updatedProductData);

    // Clear the form fields after submission
    setProductData({
      productId: 0,
      productName: "",
      measure: "",
      activeIngredient: "",
      dosageForm: "",
      applicationArea: "",
      primaryCategory: {
        name: "",
        description: "",
        categoryImage: "",
        categoryCode: "",
      },
      subCategory: {
        name: "",
        description: "",
        categoryImage: "",
        subCategoryCode: "",
      },
      productType: "",
      packaging: {
        // Default to optional fields if they are not provided
        unitsPerStrip: 0,
        stripsPerBox: 0,
      },
      pricePerUnit: 0, // Changed from string to number
      availableStock: 0, // Changed from string to number
      manufacturer: "",
      expirationDate: "",
      batchNumber: "",
      aisleLocation: "",
      requiresPrescription: false,
      pageCategory: "",
      productImage: "",
      leafletImage: "",
      usageDetails: {
        indications: {
          mainTitle: "",
          subtitles: [],
        },
        dosageDetails: [],
      },
      pharmacology: "",
    });

    // Clear the file inputs
    if (productImageInputRef.current) productImageInputRef.current.value = "";
    if (leafletImageInputRef.current) leafletImageInputRef.current.value = "";

    setIsSubmitting(false);
  };

  return (
    <div>
      <Toaster />
      <form
        onSubmit={handleSubmit}
        className="w-full mx-auto p-8 shadow-md rounded-lg"
      >
        <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
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
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Dosage Form</label>
            <input
              type="text"
              name="dosageForm"
              value={productData.dosageForm}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Application Area</label>
            <input
              type="text"
              name="applicationArea"
              value={productData.applicationArea}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1">Primary Category</label>
            <select
              name="primaryCategory"
              value={productData.primaryCategory}
              onChange={handleCategoryChange}
              className="select select-bordered w-full"
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-1">Sub-Category</label>
            <select
              name="subCategory"
              value={productData.subCategory}
              onChange={handleSubCategoryChange}
              className="select select-bordered w-full"
              disabled={!productData.primaryCategory} // Disable if no category is selected
            >
              <option value="">Select Sub Category</option>
              {subCategories.map((subCategory) => (
                <option key={subCategory._id} value={subCategory._id}>
                  {subCategory.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-1">Product Type</label>
            <input
              type="text"
              name="productType"
              value={productData.productType}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Units Per Strip</label>
            <input
              type="number"
              name="unitsPerStrip"
              value={productData.packaging.unitsPerStrip}
              onChange={(e) =>
                setProductData({
                  ...productData,
                  packaging: {
                    ...productData.packaging,
                    unitsPerStrip: +e.target.value,
                  },
                })
              }
              className="input input-bordered w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Strips Per Box</label>
            <input
              type="number"
              name="stripsPerBox"
              value={productData.packaging.stripsPerBox}
              onChange={(e) =>
                setProductData({
                  ...productData,
                  packaging: {
                    ...productData.packaging,
                    stripsPerBox: +e.target.value,
                  },
                })
              }
              className="input input-bordered w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Price Per Unit</label>
            <input
              type="text"
              name="pricePerUnit"
              value={productData.pricePerUnit}
              onChange={handleChange}
              className="input input-bordered w-full"
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
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Requires Prescription</label>
            <input
              type="checkbox"
              name="requiresPrescription"
              checked={productData.requiresPrescription}
              onChange={handleChange}
              className="checkbox checkbox-primary"
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
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1">Product Image</label>
            <input
              type="file"
              ref={productImageInputRef}
              className="file-input file-input-bordered w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Leaflet Image</label>
            <input
              type="file"
              ref={leafletImageInputRef}
              className="file-input file-input-bordered w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1">Indications</label>
            <input
              type="text"
              name="indications"
              value={productData.usageDetails.indications.mainTitle}
              onChange={(e) =>
                setProductData({
                  ...productData,
                  usageDetails: {
                    ...productData.usageDetails,
                    indications: {
                      ...productData.usageDetails.indications,
                      mainTitle: e.target.value,
                    },
                  },
                })
              }
              className="input input-bordered w-full"
            />
            {productData.usageDetails.indications.subtitles.map(
              (subtitle, index) => (
                <input
                  key={index}
                  type="text"
                  value={subtitle}
                  onChange={(e) => {
                    const newSubtitles = [
                      ...productData.usageDetails.indications.subtitles,
                    ];
                    newSubtitles[index] = e.target.value;
                    setProductData({
                      ...productData,
                      usageDetails: {
                        ...productData.usageDetails,
                        indications: {
                          ...productData.usageDetails.indications,
                          subtitles: newSubtitles,
                        },
                      },
                    });
                  }}
                  className="input input-bordered w-full mt-2"
                />
              )
            )}
          </div>

          <div className="mb-4">
            <label className="block mb-1">Dosage Details</label>
            {productData.usageDetails.dosageDetails.map((detail, index) => (
              <div key={index} className="mb-4 border p-4 rounded">
                <input
                  type="text"
                  value={detail.ageRange}
                  onChange={(e) => {
                    const newDosageDetails = [
                      ...productData.usageDetails.dosageDetails,
                    ];
                    newDosageDetails[index].ageRange = e.target.value;
                    setProductData({
                      ...productData,
                      usageDetails: {
                        ...productData.usageDetails,
                        dosageDetails: newDosageDetails,
                      },
                    });
                  }}
                  placeholder="Age Range"
                  className="input input-bordered w-full mb-2"
                />
                <input
                  type="text"
                  value={detail.userGroup}
                  onChange={(e) => {
                    const newDosageDetails = [
                      ...productData.usageDetails.dosageDetails,
                    ];
                    newDosageDetails[index].userGroup = e.target.value;
                    setProductData({
                      ...productData,
                      usageDetails: {
                        ...productData.usageDetails,
                        dosageDetails: newDosageDetails,
                      },
                    });
                  }}
                  placeholder="User Group"
                  className="input input-bordered w-full mb-2"
                />
                <input
                  type="text"
                  value={detail.dosageInstructions}
                  onChange={(e) => {
                    const newDosageDetails = [
                      ...productData.usageDetails.dosageDetails,
                    ];
                    newDosageDetails[index].dosageInstructions = e.target.value;
                    setProductData({
                      ...productData,
                      usageDetails: {
                        ...productData.usageDetails,
                        dosageDetails: newDosageDetails,
                      },
                    });
                  }}
                  placeholder="Dosage Instructions"
                  className="input input-bordered w-full mb-2"
                />
                <button
                  type="button"
                  onClick={() => {
                    const newDosageDetails = [
                      ...productData.usageDetails.dosageDetails,
                    ];
                    newDosageDetails.splice(index, 1);
                    setProductData({
                      ...productData,
                      usageDetails: {
                        ...productData.usageDetails,
                        dosageDetails: newDosageDetails,
                      },
                    });
                  }}
                  className="btn btn-danger w-full"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                setProductData({
                  ...productData,
                  usageDetails: {
                    ...productData.usageDetails,
                    dosageDetails: [
                      ...productData.usageDetails.dosageDetails,
                      { ageRange: "", userGroup: "", dosageInstructions: "" },
                    ],
                  },
                })
              }
              className="btn btn-primary w-full"
            >
              Add Dosage Detail
            </button>
          </div>

          <div className="mb-4">
            <label className="block mb-1">Side Effects</label>
            <textarea
              name="sideEffects"
              value={productData.usageDetails.sideEffects}
              onChange={(e) =>
                setProductData({
                  ...productData,
                  usageDetails: {
                    ...productData.usageDetails,
                    sideEffects: e.target.value,
                  },
                })
              }
              className="textarea textarea-bordered w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1">Precautions</label>
            <textarea
              name="precautions"
              value={productData.usageDetails.precautions}
              onChange={(e) =>
                setProductData({
                  ...productData,
                  usageDetails: {
                    ...productData.usageDetails,
                    precautions: e.target.value,
                  },
                })
              }
              className="textarea textarea-bordered w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1">Interactions</label>
            <textarea
              name="interactions"
              value={productData.usageDetails.interactions}
              onChange={(e) =>
                setProductData({
                  ...productData,
                  usageDetails: {
                    ...productData.usageDetails,
                    interactions: e.target.value,
                  },
                })
              }
              className="textarea textarea-bordered w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1">Storage Instructions</label>
            <textarea
              name="storageInstructions"
              value={productData.storageInstructions}
              onChange={(e) =>
                setProductData({
                  ...productData,
                  storageInstructions: e.target.value,
                })
              }
              className="textarea textarea-bordered w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1">Additional Information</label>
            <textarea
              name="additionalInformation"
              value={productData.additionalInformation}
              onChange={(e) =>
                setProductData({
                  ...productData,
                  additionalInformation: e.target.value,
                })
              }
              className="textarea textarea-bordered w-full"
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary w-full">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
