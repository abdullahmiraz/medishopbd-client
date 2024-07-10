// CategoryCard.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { placeholderImage, serverUrl } from "../../../../api";
import Image from "next/image";
import Link from "next/link";
import TitleStyle from "../../Shared/TitleStyle/TitleStyle";

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

const CategoryCard: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${serverUrl}/api/categories`); // Adjust the endpoint as needed
        setCategories(response.data);
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

  const SeeAllCategoriesImage = `https://placehold.co/600x400?text=See All Categories`;
  return (
    <>
      <div>
        <TitleStyle title={"Shop by Category"} />
      </div>
      <div className="w-full">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6   mt-8 px-6  ">
          {categories.slice(0, 11).map((category) => (
            <Link href={`/#`} key={category.code}>
              <div className="bg-base-100 min-h-56 shadow-xl flex flex-col cursor-pointer border">
                <figure>
                  <div
                    className="relative w-full"
                    style={{ paddingBottom: "75.25%" }}
                  >
                    <Image
                      src={category.image}
                      alt={category.name}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                </figure>
                <div className="card-body text-center p-4 font-semibold ">
                  <h2 className="p-0">{category.name}</h2>
                </div>
              </div>
            </Link>
          ))}
          <Link href={`/#`}>
            <div className="bg-base-100 min-h-56 shadow-xl flex flex-col cursor-pointer border">
              <figure>
                <div
                  className="relative w-full"
                  style={{ paddingBottom: "75.25%" }}
                >
                  <Image
                    src={SeeAllCategoriesImage}
                    alt={"Deafult Category"}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </figure>
              <div className="card-body text-center p-4 font-semibold ">
                <h2 className="p-0">{"See All Categories"}</h2>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default CategoryCard;
