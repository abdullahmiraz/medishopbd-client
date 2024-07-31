import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
import { selectCartItems } from "../../../redux/features/cart/cartSlice";
import { FaCartPlus } from "react-icons/fa";

const FloatingCart = () => {
  const cartItems = useSelector(selectCartItems);
  console.log(cartItems.length);
  return (
    <Link
      href={"/cart"}
      className="z-50 top-1/3 right-0 fixed bg-blue-500 text-slate-100 font-extrabold h-16 w-16 rounded-full flex items-center justify-center"
    >
      <div className="relative">
        <span className="absolute -top-4 -right-2 h-5 w-5 text-center rounded-full text-white bg-red-800">
          {cartItems.length}
        </span>
        <FaCartPlus size={28} />
      </div>
    </Link>
  );
};

export default FloatingCart;
