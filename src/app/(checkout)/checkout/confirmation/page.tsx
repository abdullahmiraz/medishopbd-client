/* eslint-disable react-hooks/rules-of-hooks */
"use client";

// import { useRouter } from "next/navigation";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
import Confirmation from "../../../../components/Checkout/Confirmation";
// import Spinner from "../../../../components/Shared/Spinner/Spinner";
// import { selectOrderDetails } from "../../../../redux/features/order/orderSlice";
// import {
//   fetchUserById,
//   selectStatus,
//   selectUser,
// } from "../../../../redux/features/user/userSlice";
// import { StatusCode } from "../../../../utils/StatusCode";

const ConfirmationPage = () => {
  // const dispatch = useDispatch();
  // const router = useRouter();
  // const user = useSelector(selectUser);
  // const status = useSelector(selectStatus);
  // const orderDetails = useSelector(selectOrderDetails);

  // useEffect(() => {
  //   const userId = localStorage.getItem("userId");

  //   if (userId) {
  //     dispatch(fetchUserById(userId) as any);
  //   } else {
  //     router.push("/");
  //   }
  // }, [dispatch, router]);

  // if (status === StatusCode.LOADING && !orderDetails) {
  //   return <Spinner />;
  // }

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
