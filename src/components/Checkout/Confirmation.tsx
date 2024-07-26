"use client";

import Link from "next/link";
import InvoicePrint from "../GenerateReport/InvoicePrint";
import Spinner from "../Shared/Spinner/Spinner";

const Confirmation = ({ confirmationDetails }) => {
    console.log(confirmationDetails);
  const { invoiceNumber, invoicePrintDetails } = confirmationDetails;

  return (
    <div className="container mx-auto my-12 px-6">
      <h1 className="text-2xl font-bold mb-4">Order Confirmation</h1>
      {confirmationDetails ? (
        <div>
          <p>Thank you for your order!</p>
          <p>
            {/* Your order number is <strong>{invoiceNumber}</strong>. */}
          </p>
          <p>A PDF receipt has been generated for your records.</p>
          <p>
            Our customer care agents will call you shortly to confirm your
            order.
          </p>
          <div className="flex gap-4 my-4">
            <Link href="/" className="px-4 py-2 bg-blue-500 text-white rounded">
              Return to Homepage
            </Link>
            {/* <InvoicePrint invoicePrintDetails={invoicePrintDetails} /> */}
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default Confirmation;
