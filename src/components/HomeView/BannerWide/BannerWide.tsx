import Image from "next/image";
import React from "react";

const bannerImg3 = "/image/carousel/banner-image-3.jpg";

const BannerWide = ({ bannerBg }) => {
  return (
    <div className=" ">
      <div className=" w-full">
        {/* banner image */}
        <Image
          src={bannerBg || bannerImg3}
          alt="slide"
          height={900}
          width={1200}
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
