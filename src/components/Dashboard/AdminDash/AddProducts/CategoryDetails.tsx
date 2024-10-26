import React, { useEffect, useState } from "react";
import axios from "axios";
import { serverUrl } from "../../../../../api";

// Define the interfaces for category and sub-category
interface SubCategory {
  _id: string;
  name: string;
  code: string;
}

interface Category {
  _id: string;
  name: string;
  code: string;
  subCategories: SubCategory[];
}

interface CategoryDetailsProps {
  primaryCategory: string;
  subCategory: string;
  // code: string;
  onCategoryChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onSubCategoryChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  // productData: {
  //   primaryCategory: {
  //     id: any;
  //     code: string;
  //   };
  //   subCategory: { code: string };
  // };
}

const CategoryDetails: React.FC<CategoryDetailsProps> = ({
  primaryCategory,
  subCategory,
  onCategoryChange,
  onSubCategoryChange,
  // productData,
}) => {

  console.log(primaryCategory);
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  console.log(categories);

  // Fetch all categories and initialize subCategories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get<Category[]>(
          `${serverUrl}/api/categories`
        );
        setCategories(response.data);
        console.log(response.data);

        // Set initial subCategories based on the primaryCategory from productData
        // const initialCategory = response.data.find(
        //   (cat) => cat._id === productData?.primaryCategory?.id
        // );
        // setSubCategories(initialCategory?.subCategories ?? []);
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    };

    fetchCategories();
  }, []);
  // }, [productData?.primaryCategory?.id]);

  // Update subCategories when primaryCategory or categories change
  useEffect(() => {
    const selectedCategory = categories.find(
      (category) => category?.code === primaryCategory
    );
    setSubCategories(selectedCategory?.subCategories ?? []);
  }, [primaryCategory, categories]);

  console.log(subCategories);
  return (
    <div className="p-6 bg-base-100 rounded-lg shadow-lg my-4">
      <h2 className="text-xl font-bold mb-4 border-b-2">Category Details</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="mb-4">
          <label className="block mb-1 font-medium">Primary Category</label>
          <select
            name="primaryCategory"
            value={primaryCategory} // Use the ID for the value
            onChange={onCategoryChange}
            className="select select-bordered w-full"
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category._id} value={category.code}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Sub-Category</label>
          <select
            name="subCategory"
            value={subCategory} // Use the ID for the value
            onChange={onSubCategoryChange}
            className="select select-bordered w-full"
            disabled={!primaryCategory} // Disable if no primary category is selected
          >
            <option value="">Select Sub Category</option>
            {subCategories.map((sub) => (
              <option key={sub._id} value={sub.code}>
                {sub.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default CategoryDetails;
