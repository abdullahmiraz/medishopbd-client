"use client";
import React from "react";
import OrderHistory from "../../../../../components/Dashboard/UserDash/OrderHistory/OrderHistory";

const OrderHistoryPage = () => {
  const userId = localStorage.getItem("userId");
  console.log(userId);
  return (
    <div>
      <OrderHistory userId={userId || ""} />{" "}
      {/* Pass an empty string if userId is not available */}
    </div>
  );
};

export default OrderHistoryPage;
