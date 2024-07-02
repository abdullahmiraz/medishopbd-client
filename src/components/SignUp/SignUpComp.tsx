"use  client";

// SignUpComp.tsx

import axios from "axios";
import { User } from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { serverUrl } from "../../../api";
import { UserAuth } from "../../context/AuthContext";
import Spinner from "../Shared/Spinner/Spinner";

const SignUpComp = () => {
  const { mongoUser, setMongoUser } = UserAuth();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const mongoUserId = sessionStorage.getItem("mongoUserId");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${serverUrl}/api/users/${mongoUserId}`
        );
        const userData = response.data;
        console.log(userData);
        setMongoUser(true);
        setUser(userData);
        setIsLoggedIn(true);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user:", error);
        setLoading(false);
      }
    };

    fetchUser();
  }, [mongoUserId]);

  const handleSignOut = () => {
    setIsLoggedIn(false);

    router.push("/");
    window.location.reload();
    sessionStorage.clear();
    localStorage.clear();
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const cartItemsJson = localStorage?.getItem("medicine_cart");
      const cartItems = cartItemsJson ? JSON.parse(cartItemsJson) : [];
      setCartItems(cartItems);
    }
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="flex items-center gap-6">
      {mongoUser ? (
        <div className="flex items-center gap-2 p-4 sm:p-0 h-full">
          <Link
            href={`/dashboard/profile/${mongoUserId}`}
            className="gap-2 hidden sm:flex"
          >
            <div className="relative  h-10 w-10">
              <Image
                className="rounded-full"
                src={
                  user?.photoURL ||
                  "https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2247726673.jpg"
                }
                objectFit="cover"
                layout="fill"
                alt={user?.displayName || "User"}
              />
            </div>
            <div className="flex items-center">
              Hi, {user?.name ? user?.name.split(" ")[0] : ""}
            </div>
          </Link>
          <p
            onClick={handleSignOut}
            className="bg-orange-500 rounded text-white sm:px-4 sm:py-2 px-1 py-1 cursor-pointer"
          >
            Sign Out
          </p>
        </div>
      ) : (
        <ul className="flex gap-2">
          <li
            onClick={() => router.push("../../login")}
            className="bg-blue-500 rounded text-white px-4 py-2 cursor-pointer"
          >
            Login
          </li>
          <li
            onClick={() => router.push("../signup")}
            className="bg-orange-500 rounded text-white px-4 py-2 cursor-pointer"
          >
            Sign Up
          </li>
        </ul>
      )}
    </div>
  );
};

export default SignUpComp;
