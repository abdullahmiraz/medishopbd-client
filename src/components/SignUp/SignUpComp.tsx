"use client";

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { serverUrl } from "../../../api";
import { UserAuth } from "../../context/AuthContext";
import Spinner from "../Shared/Spinner/Spinner";

const SignUpComp = () => {
  const [cartItems, setCartItems] = useState([]);
  const { user, googleSignIn, logOut } = UserAuth();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

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
      router.push("../login");
      // await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignOut = async () => {
    try {
      router.push("../signup");
      // await logOut();
      sessionStorage.clear();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const sendFirebaseUserToMongoDB = async () => {
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
        } catch (error: any) {
          if (error.response && error.response.status === 409) {
            console.error("User already exists.");
            // toast.error("User already exists.");
          } else {
            console.error("Error Adding User.");
            toast.error("Error Adding User.");
          }
          console.error("Failed to add User:", error);
        }
      }
    };
    sendFirebaseUserToMongoDB();
    sessionStorage.setItem("firebaseUid", user?.uid || "");
  }, [user]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const cartItemsJson = localStorage?.getItem("medicine_cart");
      const cartItems = cartItemsJson ? JSON.parse(cartItemsJson) : [];
      setCartItems(cartItems);
    }
  }, []);

  return (
    <div>
      <div className="user-section-top   items-center gap-2  flex  overflow-hidden">
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
          <div className="flex items-center gap-2 p-4 sm:p-0">
            <Link
              href={`/dashboard/profile/${user.uid}`}
              className="  gap-2 hidden sm:flex"
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
              className="bg-orange-500 rounded text-white sm:px-4 sm:py-2 px-1 py-1 cursor-pointer"
            >
              Sign Out
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignUpComp;
