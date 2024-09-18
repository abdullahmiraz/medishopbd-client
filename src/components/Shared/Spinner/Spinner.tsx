import React from "react";
import loader from "../../../../public/loader.gif";
import Image from "next/image";
const Spinner = () => {
  return (
    <div className="absolute top-0 bg-white right-0 z-50 w-full h-screen flex items-center justify-center overflow-hidden">
      <Image src={loader} alt="loading..." />
    </div>
  );
};

export default Spinner;
