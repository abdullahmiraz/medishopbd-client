/* eslint-disable react-hooks/rules-of-hooks */
"use client";




import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Confirmation from "../../../components/Checkout/Confirmation";
import Spinner from "../../../components/Shared/Spinner/Spinner";
import { selectOrderDetails } from "../../../redux/features/order/orderSlice";
import {
  fetchUserById,
  selectStatus,
  selectUser,
} from "../../../redux/features/user/userSlice";
import { StatusCode } from "../../../utils/statusCode";

const ConfirmationPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector(selectUser);
  const status = useSelector(selectStatus);
  const orderDetails = useSelector(selectOrderDetails);

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

  if (status === StatusCode.LOADING && !orderDetails) {
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
    <div>
      <Confirmation />
    </div>
  );
};

export default ConfirmationPage;
