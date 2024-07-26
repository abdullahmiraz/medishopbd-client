"use client";
import React from "react";
import Confirmation from "../../../components/Checkout/Confirmation";

const confirmationDetails = sessionStorage.getItem("confirmationDetails");
const ConfirmationPage = () => {
  return (
    <div>
      <Confirmation confirmationDetails={confirmationDetails} />
    </div>
  );
};

export default ConfirmationPage;
