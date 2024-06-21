"use client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCartPlus, FaSearch, FaTruck } from "react-icons/fa";
import { serverUrl } from "../../../../../api";
import { UserAuth } from "../../../../context/AuthContext";
import Spinner from "../../Spinner/Spinner";

const SearchBarTop = () => {
  const [cartItems, setCartItems] = useState([]);
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
    const sendFirebaseUserToMongoose = async () => {
      if (user) {
        const userPayload = {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          phone: "", 
          address: "",
          prescription: "", // Can be updated later if needed
          orders: [], // Initial empty order history
        };

        try {
          const response = await axios.post(
            `${serverUrl}/api/users`,
            userPayload
          );
          console.log(response.data);
          toast.success("User Added successfully!");
        } catch (error) {
          if (error.response && error.response.status === 409) {
            console.error("User already exists.");
            toast.error("User already exists.");
          } else {
            console.error("Error Adding User.");
            toast.error("Error Adding User.");
          }
          console.error("Failed to add User:", error);
        }
      }
    };
    sendFirebaseUserToMongoose();
  }, [user]);

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

        <div className="user-section-top flex items-center gap-2 border-l-4 pl-4 border-cyan-800">
          {loading ? (
            <Spinner />
          ) : !user ? (
            <ul className="flex gap-2">
              <li
                onClick={handleSignIn}
                className="bg-blue-500 rounded text-white px-4 py-2 cursor-pointer"
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
            <div className="flex items-center gap-2">
              <Link
                href={`/dashboard/profile/${user.uid}`}
                className="flex gap-2"
              >
                <Image
                  className="rounded-full"
                  src={user.photoURL}
                  height={50}
                  width={50}
                  alt={user.displayName}
                />
                <div>
                  User: <br />
                  <p className="text-blue-800 font-bold">
                    {user.displayName ? user.displayName.split(" ")[0] : ""}
                  </p>
                </div>
              </Link>
              <p
                onClick={handleSignOut}
                className="bg-orange-500 rounded text-white px-4 py-2 cursor-pointer"
              >
                Sign Out
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBarTop;
