"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import { UserAuth } from "../../../../context/AuthContext";
import SignUpComp from "../../../SignUp/SignUpComp";
import { serverUrl } from "../../../../../api";

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

const OptionBar = () => {
  const { user } = UserAuth();
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

  const navOptions = (
    <>
      <li>
        <Link href={"/"}>Home</Link>
      </li>
      {categories.map((category) => (
        <li key={category.code} className="relative group">
          <Link
            href={`/categories/${category.code}`}
            className="flex items-center justify-between hover:text-orange-500 hover:bg-white "
          >
            <div>{category.name}</div>
            <div>
              {category.subCategories.length > 0 && (
                <svg
                  className="w-4 h-4 ml-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              )}
            </div>
          </Link>
          {category.subCategories.length > 0 && (
            <ul className="absolute z-[9999] hidden group-hover:block bg-white shadow-lg rounded-md min-w-48 max-h-60 overflow-y-auto mt-0 lg:mt-8 ml-36 lg:ml-0 py-1 productSubcat ">
              {category.subCategories.map((subCategory) => (
                <li key={subCategory.code} className=" ">
                  <Link
                    href={`/categories/${category.code}/${subCategory.code}`}
                  >
                    {subCategory.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}

      <li>
        <Link href={"/categories"}>More</Link>
      </li>
    </>
  );

  return (
    <div className="sticky top-0 z-10 ">
      <div className="navbar bg-base-100 shadow-md ">
        <div className="navbar-start">
          <div className="dropdown lg:hidden">
            <label tabIndex={0} className="btn btn-ghost">
              <FaBars size={30} />
            </label>
            <ul
              tabIndex={0}
              className="menu dropdown-content mt-1 p-2 shadow bg-base-100 rounded-box w-[320px] max-h-dvh overflow-y-auto  grid grid-cols-1  gap-2 z-10"
            >
              {navOptions}
            </ul>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex ">
          <ul className="menu menu-horizontal px-1 space-x-1">{navOptions}</ul>
        </div>
        <div className="navbar-end">
          <div className="flex gap-4 items-center"></div>
        </div>
      </div>
    </div>
  );
};

export default OptionBar;
