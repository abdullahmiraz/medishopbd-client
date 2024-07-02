'use client'
import React from "react";
import OrderHistory from "../../../../components/Dashboard/UserDash/OrderHistory/OrderHistory";

const OrderHistoryPage = () => {
  const userId = sessionStorage.getItem("mongoUserId");
  return (
    <div>
      <OrderHistory userId={userId || ''} /> {/* Pass an empty string if userId is not available */}
    </div>
  );
};

export default OrderHistoryPage;
