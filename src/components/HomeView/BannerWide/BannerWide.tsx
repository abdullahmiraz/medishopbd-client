import Image from "next/image";
import React from "react";

const bannerImg3 = "/image/carousel/banner-image-3.jpg";

const BannerWide = ({ category }) => {
  return (
    <div className="relative">
      <div className="w-full">
        {/* Category Banner Image */}
        <Image
          src={category?.image || bannerImg3}
          alt={category?.name || "Category Image"}
          height={700}
          width={1200}
          className="h-56 w-full object-cover"
        />
        {/* Category Name and Description */}
        <div className="absolute top-0 left-0 p-4 text-white">
          <h2 className="text-3xl font-bold">{category?.name}</h2>
          <p>{category?.description}</p>
        </div>

        {/* Subcategories overlayed on banner */}
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-10 p-4 flex justify-evenly items-center space-x-4">
          {category?.subCategories?.map((subCategory) => (
            <div key={subCategory._id} className="text-center text-white">
              {/* Subcategory Image */}
              <Image
                src={subCategory?.image}
                alt={subCategory?.name}
                width={100}
                height={100}
                className="object-cover h-24 w-24 rounded-full border-2 border-white"
              />
              {/* Subcategory Name */}
              <p className="mt-2 text-sm font-semibold">{subCategory?.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BannerWide;
