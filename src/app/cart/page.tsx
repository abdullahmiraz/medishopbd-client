/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import Cart from "../../components/HomeView/Cart/Cart";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserById,
  selectStatus,
  selectUser,
} from "../../redux/features/user/userSlice";
 import Spinner from "../../components/Shared/Spinner/Spinner";
import { StatusCode } from "../../utils/StatusCode";

const page = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector(selectUser);
  const status = useSelector(selectStatus);

  useEffect(() => {
    // Fetch user data from localStorage or cookies
    const userId = localStorage.getItem("userId");

    if (userId) {
      dispatch<any>(fetchUserById(userId));
    } else {
      // Redirect to login if no userId is found
      router.push("/");
    }
  }, [dispatch, router]);

  if (status === StatusCode.LOADING) {
    return <Spinner />;
  }

  // if (status === StatusCode.ERROR) {
  //   return (
  //     <div className="text-center my-20 text-red-500">
  //       Error fetching user data.
  //     </div>
  //   );
  // }
  return (
    <>
      <Cart />
    </>
  );
};

export default page;
