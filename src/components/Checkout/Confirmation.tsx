"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { serverUrl } from "../../../api";
import { selectCheckoutAmount } from "../../redux/features/cart/cartSlice";
import { selectInvoiceNumber } from "../../redux/features/order/orderSlice";
import InvoicePrint from "../GenerateReport/InvoicePrint";
import { selectUser } from "../../redux/features/user/userSlice";

const Confirmation = () => {
  const router = useRouter();

  const invoiceNumber = useSelector(selectInvoiceNumber);
  const checkoutAmount = useSelector(selectCheckoutAmount);
  const [orderDetails, setOrderDetails] = useState(null);
  console.log(orderDetails);

  useEffect(() => {
    const savedOrderData = localStorage.getItem("orderData");
    if (savedOrderData) {
      setOrderDetails(JSON.parse(savedOrderData));
    } else {
      // Redirect if no order data is available
      router.push("/");
    }
  }, [router]);

  useEffect(() => {
    if (orderDetails) {
      console.log(orderDetails);
      finalizeOrder(orderDetails);
    }
  }, [orderDetails]);

  const finalizeOrder = async (orderData) => {
    console.log(orderData);
    try {
      await axios.post(`${serverUrl}/api/orders`, orderData);
      localStorage.removeItem("orderData");
    } catch (error) {
      console.error("Error finalizing order:", error);
    }
  };

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
          <InvoicePrint />
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
