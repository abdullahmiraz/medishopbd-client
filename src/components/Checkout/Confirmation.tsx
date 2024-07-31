"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import {
  selectInvoiceNumber,
  selectOrderDetails,
} from "../../redux/features/order/orderSlice";
import { selectCheckoutAmount } from "../../redux/features/cart/cartSlice";
import InvoicePrint from "../GenerateReport/InvoicePrint";
import { clearPaymentData } from "../../redux/features/payment/paymentSlice";

const Confirmation = () => {
  const dispatch = useDispatch();

  const router = useRouter();
  const invoiceNumber = useSelector(selectInvoiceNumber);
  const checkoutAmount = useSelector(selectCheckoutAmount);
  const orderDetails = JSON.parse(
    localStorage.getItem("orderDetails") || "null"
  );

  useEffect(() => {
    // Function to clear localStorage and redirect
    const handleBeforeUnload = () => {
      dispatch(clearPaymentData());
      localStorage.removeItem("orderDetails");
      localStorage.removeItem("confirmationDetails");
    };

    // Add event listener
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

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
