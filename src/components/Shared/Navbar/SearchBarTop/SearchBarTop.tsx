"use client";

import Image from "next/image";
import Link from "next/link";
import { FaCartPlus, FaSearch, FaTruck } from "react-icons/fa";
import SignUpComp from "../../../SignUp/SignUpComp";
import ProductSearch from "../../../ProductSearch/ProductSearch";
import { useSelector } from "react-redux";
import { selectCartItems } from "../../../../redux/features/cart/cartSlice";

const SearchBarTop = () => {
  const cartItems = useSelector(selectCartItems);
  console.log(cartItems.length);

  return (
    <div className="flex items-center justify-between bg-green-100 px-6 py-0 sm:py-2 md:py-4 w-full">
      <div className="brand-icon flex items-center gap-2">
        <Image
          src={`https://cdn-icons-png.flaticon.com/512/4599/4599153.png`}
          width={40}
          height={20}
          alt="Brand"
        />
        <Link href={"/"} className="text-sm md:text-2xl font-extrabold">
          MediShopBD
        </Link>
      </div>
      {/* Integrate ProductSearch component */}
      <ProductSearch />
      <div className="user-need-section flex items-center gap-6">
        <div className="gap-4 items-center hidden lg:flex border-r-4 pr-4 sm:border-cyan-800">
          <div className="track-order flex items-center gap-2">
            <div className="track-icon">
              <FaTruck size={40} />
              <span className="absolute -top-4 -right-2 h-5 w-5 text-center rounded-full text-white bg-red-800">
                {cartItems.length}
              </span>
            </div>
            <p>
              Track <br /> Order
            </p>
          </div>
          <Link href={"/cart"}>
            <div className="card-top-nav w-25 flex items-center gap-2 ">
              <div className="card-icon-top relative">
                <FaCartPlus size={40} />
                <span className="absolute -top-2 -right-2 h-5 w-5 text-center rounded-full text-white bg-red-800">
                  {cartItems.length}
                </span>
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
