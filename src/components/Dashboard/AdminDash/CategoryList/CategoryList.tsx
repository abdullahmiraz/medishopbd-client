"use client";

import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { placeholderImage, serverUrl } from "../../../../../api";
import ImageUploader from "../../../ImageUploader/ImageUploader";
import toast from "react-hot-toast";

interface SubCategory {
  _id: string;
  name: string;
  description?: string;
  image?: string;
  code: string;
}

interface Category {
  _id: string;
  name: string;
  description?: string;
  image?: string;
  code: string;
  subCategories: SubCategory[];
}

const CategoryList: React.FC = () => {
  const [photoURL, setPhotoURL] = useState("");
  const [isImageUploading, setIsImageUploading] = useState(false);

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [newCategory, setNewCategory] = useState<Partial<Category>>({});
  const [editingCategory, setEditingCategory] =
    useState<Partial<Category> | null>(null);
  const [editingSubCategory, setEditingSubCategory] =
    useState<Partial<SubCategory> | null>(null);
  const [newSubCategory, setNewSubCategory] = useState<Partial<SubCategory>>(
    {}
  );
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null
  );

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${serverUrl}/api/categories`);
        if (Array.isArray(response.data)) {
          setCategories(response.data);
        } else {
          setError("Invalid data format received from the server.");
        }
      } catch (err) {
        setError("Failed to fetch categories");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const generateCodeFromName = (name: string) => {
    return name.toLowerCase().replace(/\s+/g, "-");
  };

  const handleCategoryInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    let updatedCategory: Partial<Category>;

    if (editingCategory) {
      updatedCategory = { ...editingCategory, [name]: value };
      setEditingCategory(updatedCategory);
    } else {
      updatedCategory = { ...newCategory, [name]: value };
      setNewCategory(updatedCategory);
    }

    // Automatically generate the category code when the name changes
    if (name === "name") {
      const code = generateCodeFromName(value);
      if (editingCategory) {
        setEditingCategory({ ...updatedCategory, code });
      } else {
        setNewCategory({ ...updatedCategory, code });
      }
    }
  };

  console.log(editingCategory);

  const handleSubCategoryInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    let updatedSubCategory: Partial<SubCategory>;

    if (editingSubCategory) {
      updatedSubCategory = { ...editingSubCategory, [name]: value };
      setEditingSubCategory(updatedSubCategory);
    } else {
      updatedSubCategory = { ...newSubCategory, [name]: value };
      setNewSubCategory(updatedSubCategory);
    }

    // Automatically generate the subcategory code when the name changes
    if (name === "name") {
      const code = generateCodeFromName(value);
      if (editingSubCategory) {
        setEditingSubCategory({ ...updatedSubCategory, code });
      } else {
        setNewSubCategory({ ...updatedSubCategory, code });
      }
    }
  };

  console.log(editingSubCategory);

  const handleCategorySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isImageUploading) {
      toast.error("Please wait for the image upload to complete.");
      return;
    }
    try {
      if (editingCategory) {
        console.log(editingCategory);
        const response = await axios.put(
          `${serverUrl}/api/categories/${editingCategory._id}`,
          editingCategory
        );
        setCategories(
          categories.map((cat) =>
            cat._id === response.data._id ? response.data : cat
          )
        );
        setEditingCategory(null);
      } else {
        console.log(newCategory);
        const response = await axios.post(
          `${serverUrl}/api/categories`,
          newCategory
        );
        console.log(response);
        setCategories([...categories, response.data]);
      }
      setNewCategory({});
    } catch (err) {
      setError("Failed to save category");
    }
  };

  const handleSubCategorySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isImageUploading) {
      toast.error("Please wait for the image upload to complete.");
      return;
    }
    try {
      if (editingSubCategory) {
        const response = await axios.put(
          `${serverUrl}/api/categories/${selectedCategoryId}/subcategories/${editingSubCategory?._id}`,
          editingSubCategory
        );
        setCategories(
          categories.map((cat) => ({
            ...cat,
            subCategories: cat.subCategories.map((subCat) =>
              subCat._id === response.data._id ? response.data : subCat
            ),
          }))
        );
        setEditingSubCategory(null);
      } else if (selectedCategoryId) {
        const response = await axios.post(
          `${serverUrl}/api/categories/${selectedCategoryId}/subcategories`,
          newSubCategory
        );
        setCategories(
          categories.map((cat) =>
            cat._id === selectedCategoryId
              ? { ...cat, subCategories: [...cat.subCategories, response.data] }
              : cat
          )
        );
      }
      setNewSubCategory({});
      setSelectedCategoryId(null); // Close the subcategory form after submit
    } catch (err) {
      setError("Failed to save subcategory");
    }
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
    setSelectedCategoryId(null);
  };

  const handleEditSubCategory = (
    subCategory: SubCategory,
    categoryId: string
  ) => {
    setEditingSubCategory(subCategory);
    setSelectedCategoryId(categoryId);
  };

  const handleDeleteCategory = async (id: string) => {
    try {
      await axios.delete(`${serverUrl}/api/categories/${id}`);
      setCategories(categories.filter((category) => category?._id !== id));
    } catch (err) {
      setError("Failed to delete category");
    }
  };

  const handleDeleteSubCategory = async (
    categoryId: string,
    subCategoryId: string
  ) => {
    try {
      await axios.delete(
        `${serverUrl}/api/categories/${categoryId}/subcategories/${subCategoryId}`
      );
      setCategories(
        categories.map((cat) =>
          cat?._id === categoryId
            ? {
                ...cat,
                subCategories: cat.subCategories.filter(
                  (subCat) => subCat._id !== subCategoryId
                ),
              }
            : cat
        )
      );
    } catch (err) {
      setError("Failed to delete subcategory");
    }
  };

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  const handleImageUploadSuccess = (
    imageUrl: string,
    isSubCategory: boolean = false
  ) => {
    // Set the photoURL state
    setPhotoURL(imageUrl);
    console.log(imageUrl);

    // Directly use imageUrl for updating category or subcategory
    if (isSubCategory) {
      if (editingSubCategory) {
        setEditingSubCategory({ ...editingSubCategory, image: imageUrl });
        console.log(imageUrl);
      } else {
        setNewSubCategory({ ...newSubCategory, image: imageUrl });
        console.log(imageUrl);
      }
    } else {
      if (editingCategory) {
        setEditingCategory({ ...editingCategory, image: imageUrl });
        console.log(imageUrl);
      } else {
        setNewCategory({ ...newCategory, image: imageUrl });
        console.log(imageUrl);
      }
    }

    toast.success("Image uploaded successfully!");
  };

  categories.map((category) => console.log(category.name));

  return (
    <div className=" px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Manage Categories</h1>

      {/* Category Form */}
      <form onSubmit={handleCategorySubmit} className="mb-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <input
            type="text"
            name="name"
            placeholder="Category Name"
            value={editingCategory?.name || newCategory?.name || ""}
            onChange={handleCategoryInputChange}
            className="border p-2 rounded"
            required
          />
          <input
            name="description"
            placeholder="Category Description"
            value={
              editingCategory?.description || newCategory?.description || ""
            }
            onChange={handleCategoryInputChange}
            className="border p-2 rounded"
          />

          <ImageUploader
            onUploadSuccess={(url: string) =>
              handleImageUploadSuccess(url, false)
            }
            showSubmitButton={true}
          />

          <input
            disabled
            type="text"
            name="categoryCode"
            placeholder="Category Code"
            value={editingCategory?.code || newCategory?.code || ""}
            onChange={handleCategoryInputChange}
            className="border p-2 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          {editingCategory ? "Update Category" : "Add Category"}
        </button>
      </form>

      {/* Subcategory Form */}
      {selectedCategoryId && (
        <form onSubmit={handleSubCategorySubmit} className="mb-8">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <input
              type="text"
              name="name"
              placeholder="Subcategory Name"
              value={editingSubCategory?.name || newSubCategory?.name || ""}
              onChange={handleSubCategoryInputChange}
              className="border p-2 rounded"
              required
            />
            <input
              name="description"
              placeholder="Subcategory Description"
              value={
                editingSubCategory?.description ||
                newSubCategory?.description ||
                ""
              }
              onChange={handleSubCategoryInputChange}
              className="border p-2 rounded"
            />
            <ImageUploader
              onUploadSuccess={(url: string) =>
                handleImageUploadSuccess(url, true)
              }
              showSubmitButton={true}
            />
            <input
              disabled
              type="text"
              name="subCategoryCode"
              placeholder="Subcategory Code"
              value={editingSubCategory?.code || newSubCategory?.code || ""}
              onChange={handleSubCategoryInputChange}
              className="border p-2 rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          >
            {editingSubCategory ? "Update Subcategory" : "Add Subcategory"}
          </button>
        </form>
      )}

      {/* Categories List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category, index) => (
          <div
            key={category._id}
            className="border p-4 rounded-lg shadow-lg relative"
          >
            <Image
              src={category?.image || placeholderImage}
              alt={category?.name}
              width={200}
              height={200}
              className="w-full h-40 object-cover rounded-md mb-4"
            />
            <h2 className="text-xl font-semibold">
              {index + 1}. {category.name}
            </h2>
            <p className="text-gray-700">{category?.description}</p>
            <p className="text-gray-700">Code: {category?.code}</p>
            <h3 className="text-lg font-semibold mt-4  ">Subcategories:</h3>
            <ul className="list-disc list-inside">
              {category.subCategories.map((subCategory) => (
                <li
                  key={subCategory._id}
                  className="flex justify-between items-center border p-1 my-2"
                >
                  <div>
                    <span className="font-semibold">{subCategory?.name}</span>
                    {subCategory.description && (
                      <p className="text-gray-600 text-sm">
                        {subCategory.description}
                      </p>
                    )}
                    <p className="text-gray-600 text-sm">
                      Code: {subCategory.code}
                    </p>
                  </div>
                  <div className="flex">
                    <button
                      onClick={() =>
                        handleEditSubCategory(subCategory, category?._id)
                      }
                      className="ml-2 px-2 py-1 bg-yellow-500 text-white rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() =>
                        handleDeleteSubCategory(category?._id, subCategory?._id)
                      }
                      className="ml-2 px-2 py-1 bg-red-500 text-white rounded"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="absolute top-2 right-2 flex space-x-2">
              <button
                onClick={() => handleEditCategory(category)}
                className="px-2 py-1 bg-yellow-500 text-white rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteCategory(category?._id)}
                className="px-2 py-1 bg-red-500 text-white rounded"
              >
                Delete
              </button>
              <button
                onClick={() => setSelectedCategoryId(category?._id)}
                className="px-2 py-1 bg-green-500 text-white rounded"
              >
                Add Subcategory
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
