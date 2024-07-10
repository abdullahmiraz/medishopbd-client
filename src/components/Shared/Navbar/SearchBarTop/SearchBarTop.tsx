"use client";
import Image from "next/image";
import Link from "next/link";
import { FaCartPlus, FaSearch, FaTruck } from "react-icons/fa";
import SignUpComp from "../../../SignUp/SignUpComp";

const SearchBarTop = () => {
  // const mongoUserId = sessionStorage.getItem("mongoUserId");
  return (
    <div className="flex items-center justify-between bg-green-100 px-6 py-0 sm:py-2 md:py-4">
      <div className="brand-icon flex items-center gap-2">
        <Image
          src={`https://cdn-icons-png.flaticon.com/512/4599/4599153.png`}
          width={40}
          height={20}
          alt="Brand"
        />
        <Link href={"/"} className=" text-sm md:text-2xl font-extrabold">
          MediShopBD
        </Link>
      </div>
      <div className="search-bar  hidden lg:flex">
        <label className="input input-bordered   items-center gap-2 hidden lg:flex">
          <input type="text" className="grow" placeholder="Search" />
          <FaSearch />
        </label>
      </div>
      <div className="user-need-section flex items-center gap-6">
        <div className=" gap-4 items-center  hidden lg:flex border-r-4 pr-4 sm:border-cyan-800 ">
          <div className="track-order flex items-center gap-2">
            <div className="track-icon">
              <FaTruck size={40} />
            </div>
            <p>
              Track <br /> Order
            </p>
          </div>
          <Link href={"/cart"}>
            <div className="card-top-nav w-25 flex items-center gap-2 relative">
              <div className="card-icon-top">
                <FaCartPlus size={40} />
              </div>
              <div>Cart</div>
            </div>
          </Link>
        </div>
        <SignUpComp />
      </div>
    </div>
  );
};

export default SearchBarTop;
