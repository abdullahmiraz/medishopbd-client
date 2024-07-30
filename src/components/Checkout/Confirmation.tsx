"use client";
import { useSelector } from "react-redux";
import {
  selectInvoiceNumber,
  selectCheckoutAmount,
  selectOrderDetails,
} from "../../redux/features/payment/paymentSlice";
import InvoicePrint from "../GenerateReport/InvoicePrint";

const Confirmation = () => {
  const orderDetails = useSelector(selectOrderDetails);
  const invoiceNumber = useSelector(selectInvoiceNumber);
  const checkoutAmount = useSelector(selectCheckoutAmount);

  console.log(orderDetails);

  if (!orderDetails || !invoiceNumber || !checkoutAmount) {
    return (
      <div className="container mx-auto my-12 px-6">
        <h1 className="text-2xl font-bold mb-4">Order Confirmation</h1>
        <p>Loading confirmation details...</p>
      </div>
    );
  }

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
          <InvoicePrint
            confirmationDetails={{
              orderDetails,
              invoiceNumber,
              checkoutAmount,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
