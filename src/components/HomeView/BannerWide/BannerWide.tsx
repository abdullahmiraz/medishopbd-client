import Image from "next/image";
import Link from "next/link";
import React from "react";

const bannerImg3 = "/image/carousel/banner-image-3.jpg";

const BannerWide = ({ category }) => {
  return (
    <div className="flex items-center justify-center h-96  ">
      {/* Left Section - Category Image and Info */}
      <Link
        href={`../categories/${category?.code}`}
        className="basis-6/12 relative  h-96 overflow-hidden group"
      >
        <div className="p-4 text-white bg-black bg-opacity-70  h-24">
          <h2 className="text-3xl font-bold">{category?.name}</h2>
          <p>{category?.description}</p>
        </div>

        <Image
          src={category?.image || bannerImg3}
          alt={category?.name || "Category Image"}
          height={700}
          width={1200}
          className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500 "
        />
      </Link>

      {/* Right Section - Subcategories */}
      <div className="basis-6/12 h-full">
        <div className="grid grid-cols-3 gap-2 h-full">
          {category?.subCategories?.slice(0, 3).map((subCategory, index) => (
            <Link
              href={`../categories/${category?.code}/${subCategory?.code}`}
              key={subCategory._id}
              className="relative h-full overflow-hidden group" // Ensures grid item takes full height
            >
              <Image
                src={subCategory?.image}
                alt={subCategory?.name}
                height={500}
                width={400}
                className="border-2 w-full h-full object-cover group-hover:scale-125 transition-all duration-500 "
              />
              <p className="absolute bottom-2 left-2  text-white bg-black bg-opacity-70 mt-2 text-md p-4 w-10/12 font-semibold ">
                {subCategory?.name}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BannerWide;
