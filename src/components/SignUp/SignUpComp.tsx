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
  const [mongoUserId, setMongoUserId] = useState<string | null>(null);

  const router = useRouter();
  useEffect(() => {
    if (typeof window !== "undefined") {
      const userId = sessionStorage.getItem("mongoUserId");
      setMongoUserId(userId);
    }
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${serverUrl}/api/users/${mongoUserId}`
        );
        const userData = response.data;
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
  }, []);

  const handleSignOut = () => {
    setIsLoggedIn(false);

    router.push("/");
    window.location.reload();
    sessionStorage.clear();
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
        <div className="flex items-center gap-2 p-4 sm:p-0">
          <Link
            href={`/dashboard/profile/${mongoUserId}`}
            className="gap-2 hidden sm:flex"
          >
            <Image
              className="rounded-full"
              src={
                user?.photoURL ||
                "https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2247726673.jpg"
              }
              height={50}
              width={50}
              alt={user?.displayName || "User"}
            />
            <div className="flex items-center">
              Hi, User {user?.displayName ? user.displayName.split(" ")[0] : ""}
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
            onClick={() => router.push("../login")}
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
