"use client";
import Image from "next/image";
import Link from "next/link";
import { FaCartPlus, FaSearch, FaTruck, FaUserCircle } from "react-icons/fa";

const SearchBarTop = () => {
  const cartItemsJson = localStorage.getItem("medicine_cart");
  const cartItems = cartItemsJson ? JSON.parse(cartItemsJson) : [];
  console.log(cartItems);
  return (
    <div className="flex items-center justify-between bg-green-100 px-6 py-4">
      <div className="brand-icon flex items-center gap-2">
        <Image
          src={`https://cdn-icons-png.flaticon.com/512/4599/4599153.png`}
          width={40}
          height={20}
          alt="Brand"
        />
        <Link href={"/"} className="text-2xl font-extrabold">
          MediShopBD
        </Link>
      </div>
      <div className="search-bar">
        <label className="input input-bordered flex items-center gap-2">
          <input type="text" className="grow" placeholder="Search" />
          <FaSearch />
        </label>
      </div>
      <div className="user-need-section flex items-center gap-6">
        <div className="track-order  flex  items-center gap-2">
          <div className="track-icon">
            <FaTruck size={40} />
          </div>
          <p>
            Track <br /> Order
          </p>
        </div>
        <Link href={"../cart"}>
          <div className="card-top-nav  w-25 flex  items-center gap-2 relative">
            <div className="card-icon-top">
              <FaCartPlus size={40} />
            </div>
            <p>
              Cart
              <div className="badge badge-warning badge-md absolute top-0 left-0">
                {cartItems.length}
              </div>
            </p>
          </div>
        </Link>{" "}
        <div className="user-section-top flex items-center gap-2">
          <p className="user-name border-l-4 pl-4 border-cyan-800  ">
            User <br />
            Name
          </p>
          <FaUserCircle size={40} />
        </div>
      </div>
    </div>
  );
};

export default SearchBarTop;
