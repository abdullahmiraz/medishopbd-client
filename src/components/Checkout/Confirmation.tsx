"use client";

import Link from "next/link";
import InvoicePrint from "../GenerateReport/InvoicePrint";
import { useEffect, useState } from "react";

const Confirmation = () => {
  const [confirmationDetails, setConfirmationDetails] = useState(null);

  useEffect(() => {
    const details = sessionStorage.getItem("confirmationDetails");
    if (details) {
      setConfirmationDetails(JSON.parse(details));
    }
  }, []);

  if (!confirmationDetails) {
    return (
      <div className="container mx-auto my-12 px-6">
        <h1 className="text-2xl font-bold mb-4">Order Confirmation</h1>
        <p>Loading confirmation details...</p>
      </div>
    );
  }

  const { orderDetails, invoiceNumber, checkoutAmount } = confirmationDetails;

  return (
    <div className="container mx-auto my-12 px-6">
      <h1 className="text-2xl font-bold mb-4">Order Confirmation</h1>

      <div>
        <p>Thank you for your order!</p>
        <p>
          Your order number is <strong>{invoiceNumber}</strong>.
        </p>
        <p>A PDF receipt has been generated for your records.</p>
        <p>
          Our customer care agents will call you shortly to confirm your order.
        </p>
        <div className="flex gap-4 my-4">

          <InvoicePrint confirmationDetails={confirmationDetails} />
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
