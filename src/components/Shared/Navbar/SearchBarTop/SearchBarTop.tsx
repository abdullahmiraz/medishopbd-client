"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaCartPlus, FaSearch, FaTruck } from "react-icons/fa";
import { UserAuth } from "../../../../context/AuthContext";

const SearchBarTop = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const { user, googleSignIn, logOut } = UserAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
      setLoading(false);
    };
    checkAuthentication();
  }, [user]);

  console.log(user);

  const handleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const cartItemsJson = localStorage?.getItem("medicine_cart");
      const cartItems = cartItemsJson ? JSON.parse(cartItemsJson) : [];
      setCartItems(cartItems);
    }
  }, []);

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
        <div className="track-order flex items-center gap-2">
          <div className="track-icon">
            <FaTruck size={40} />
          </div>
          <p>
            Track <br /> Order
          </p>
        </div>
        <Link href={"../cart"}>
          <div className="card-top-nav w-25 flex items-center gap-2 relative">
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
        </Link>

        <div className="user-section-top flex items-center gap-2  border-l-4 pl-4 border-cyan-800">
          {loading ? (
            <p>Loading</p>
          ) : !user ? (
            <ul className="flex gap-2">
              <li
                onClick={handleSignIn}
                className=" bg-blue-500 rounded text-white  px-4 py-2 cursor-pointer"
              >
                Login
              </li>
              <li
                onClick={handleSignIn}
                className="bg-orange-500 rounded text-white px-4 py-2 cursor-pointer"
              >
                Sign Up
              </li>
            </ul>
          ) : (
            <div className="flex items-center">
              <p>
                Welcome,{" "}
                {user.displayName ? user.displayName.split(" ")[0] : ""}
              </p>
              <p
                onClick={handleSignOut}
                className="bg-orange-500 rounded text-white px-4 py-2 cursor-pointer"
              >
                Sign Out
              </p>
            </div>
          )}
        </div>
        {/* <div className="user-section-top flex items-center gap-2  border-l-4 pl-4 border-cyan-800">
          Name
          <FaUserCircle size={40} />
        </div> */}
      </div>
    </div>
  );
};

export default SearchBarTop;
