"use client";

import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FaCartPlus, FaTruck } from "react-icons/fa";
import Spinner from "../Shared/Spinner/Spinner";
import {
  logout,
  selectUser,
  selectStatus,
} from "../../redux/features/user/userSlice";

const SignUpComp = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector(selectUser);
  const status = useSelector(selectStatus);

  // Handle logout
  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
  };

  // Show spinner when loading
  if (status === "loading") {
    return <Spinner />;
  }

  return (
    <div className="flex items-center gap-6">
      {user ? (
        <div className="flex items-center gap-2 p-4 sm:p-0 h-full">
          <Link href={`/dashboard/profile`} className="gap-2 hidden sm:flex">
            <div className="relative h-10 w-10">
              <Image
                className="rounded-full"
                src={
                  user.photoURL ||
                  "https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2247726673.jpg"
                }
                objectFit="cover"
                layout="fill"
                alt={user.displayName || "User"}
              />
            </div>
            <div className="flex items-center">
              Hi, {user.name ? user.name.split(" ")[0] : ""}
            </div>
          </Link>
          <p
            onClick={handleLogout}
            className="bg-orange-500 rounded text-white sm:px-4 sm:py-2 px-1 py-1 cursor-pointer"
          >
            Sign Out
          </p>
        </div>
      ) : (
        <ul className="flex gap-2">
          <li
            onClick={() => router.push("/login")}
            className="bg-blue-500 rounded text-white px-4 py-2 cursor-pointer"
          >
            Login
          </li>
          <li
            onClick={() => router.push("/signup")}
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
