import Image from "next/image";
import React from "react";

const BannerWide = () => {
  return (
    <div className="mx-4  ">
      <div className="relative w-full" style={{ paddingBottom: "26.25%" }}>
        {/* banner image */}
        <Image
          src="https://osudpotro.com/_next/image?url=https%3A%2F%2Fcdn.osudpotro.com%2Fcarousal%2Fapp-banner-02-499-1708432950231.webp&w=1920&q=75"
          alt="slide"
          layout="fill"
          objectFit="cover"
        />
        {/* name */}
        {/* description */}
        {/* button to view all  */}
      </div>
    </div>
  );
};

export default BannerWide;
