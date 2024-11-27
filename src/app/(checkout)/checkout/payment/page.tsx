"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Payment from "../../../../components/Checkout/Payment";
import {
  fetchUserById,
  selectStatus,
  selectUser,
} from "../../../../redux/features/user/userSlice";
import Spinner from "../../../../components/Shared/Spinner/Spinner";
import { StatusCode } from "../../../../utils/StatusCode";

const PaymentPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector(selectUser);
  const status = useSelector(selectStatus);

  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    setUserId(storedUserId);
  }, []);

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserById(userId) as any);
    } else {
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
