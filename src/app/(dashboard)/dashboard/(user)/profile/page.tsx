"use client";

import { useSelector } from "react-redux";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import UserProfile from "../../../../../components/Dashboard/UserDash/UserProfile/UserProfile";
import { selectUser } from "../../../../../redux/features/user/userSlice";

const UserProfilePage = () => {
  const user = useSelector(selectUser);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login"); // Redirect to login if user is not authenticated
    }
  }, [user, router]);

  if (!user) {
    return <div>Loading...</div>; // Or a spinner component
  }

  return <UserProfile />;
};

export default UserProfilePage;
