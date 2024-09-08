// CategoryList.tsx
"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { serverUrl } from "../../../../api";
import Image from "next/image";
import Link from "next/link";

interface SubCategory {
  name: string;
  description?: string;
  image: string;
  code: string;
}

interface Category {
  name: string;
  description?: string;
  image: string;
  code: string;
  subCategories: SubCategory[];
}

const CategoryList: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${serverUrl}/api/categories`); // Adjust the endpoint as needed
        setCategories(response.data);
        // console.log(response.data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center underline">
        Shop by Category
      </h1>
      <div className="grid gap-8">
        {categories.map((category) => (
          <div
            key={category.code}
            className="bg-white rounded-lg shadow-md p-4"
          >
            <div className="flex flex-col   mb-4">
              <div className="flex gap-4 items-center justify-between bg-blue-100 p-3 mb-3 rounded-md">
                <div className="flex items-center">
                  <Image
                    src={category.image}
                    alt={category.name}
                    height={100}
                    width={100}
                    className="rounded-lg h-24 w-24 object-cover mr-8"
                  />
                  <h2 className="text-3xl font-semibold  ">{category?.name}</h2>
                </div>
                <Link
                  href={`/categories/${category?.code}`}
                  className="btn bg-blue-500 text-white    "
                >
                  Show Products
                </Link>
              </div>
              <p className="text-gray-600">{category.description}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {category.subCategories.map((subCategory) => (
                <Link
                  href={`/categories/${category?.code}/${subCategory?.code}`}
                  key={subCategory.code}
                  className="bg-gray-100 rounded-lg shadow p-4 flex flex-col items-center text-center"
                >
                  <div className="relative w-32 h-32 mb-2">
                    <Image
                      src={subCategory.image}
                      alt={subCategory.name}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-lg"
                    />
                  </div>
                  <h3 className="text-lg font-medium">{subCategory.name}</h3>
                  <p className="text-gray-500 text-sm">
                    {subCategory.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
