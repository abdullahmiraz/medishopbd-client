import Image from "next/image";
import React from "react";

const bannerImg3 = "/image/carousel/banner-image-3.jpg";

const BannerWide = () => {
  return (
    <div className=" ">
      <div className=" w-full">
        {/* banner image */}
        <Image
          src={bannerImg3}
          alt="slide"
          height={300}
          width={600}
          className="h-52 w-full object-cover"
        />
        {/* name */}
        {/* description */}
        {/* button to view all  */}
      </div>
    </div>
  );
};

export default BannerWide;
