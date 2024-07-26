"use client";

import Link from "next/link";
import InvoicePrint from "../GenerateReport/InvoicePrint";
import { useEffect } from "react";

const Confirmation = () => {
  let i = 1;
  if (i > 2) {
    ++i;
    window.location.reload();
  }
  const confirmationDetails = JSON.parse(
    sessionStorage.getItem("confirmationDetails")
  );
  console.log(confirmationDetails);

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
          <Link href="/" className="px-4 py-2 bg-blue-500 text-white rounded">
            Return to Homepage
          </Link>
          <InvoicePrint confirmationDetails={confirmationDetails} />
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
