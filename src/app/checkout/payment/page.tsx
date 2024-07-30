/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Payment from "../../../components/Checkout/Payment";
import {
  fetchUserById,
  selectStatus,
  selectUser,
} from "../../../redux/features/user/userSlice";
import { StatusCode } from "../../../utils/statusCode";
import Spinner from "../../../components/Shared/Spinner/Spinner";

const PaymentPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector(selectUser);
  const status = useSelector(selectStatus);

  useEffect(() => {
    // Fetch user data from localStorage or cookies
    const userId = localStorage.getItem("userId");

    if (userId) {
      dispatch(fetchUserById(userId));
    } else {
      // Redirect to login if no userId is found
      router.push("/");
    }
  }, [dispatch, router]);

  if (status === StatusCode.LOADING) {
    return <Spinner />;
  }
  return (
    <div>
      <Payment />
    </div>
  );
};

export default PaymentPage;
