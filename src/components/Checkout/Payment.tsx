"use client";
import axios from "axios";
import { useEffect } from "react";
import { serverUrl } from "../../../api";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";

const Payment = () => {
  const userId = sessionStorage.getItem("mongoUserId");
  const [orderDetails, setOrderDetails] = useState(null);
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [checkoutAmount, setCheckoutAmount] = useState(null);
  const router = useRouter();

  const generateInvoiceNumber = () => {
    const date = new Date();
    const formattedDate = `${date.getFullYear()}${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}${date.getDate().toString().padStart(2, "0")}`;
    const randomDigits = uuidv4().slice(0, 6).toUpperCase();
    return `INV-${formattedDate}-${randomDigits}`;
  };

  useEffect(() => {
    const savedOrderDetails = JSON.parse(localStorage.getItem("order_details"));
    const savedInvoiceNumber = localStorage.getItem("invoice_number");
    const savedCheckoutAmount = JSON.parse(
      localStorage.getItem("checkoutAmount")
    );

    if (savedOrderDetails) {
      setOrderDetails(savedOrderDetails);
      if (savedInvoiceNumber) {
        setInvoiceNumber(savedInvoiceNumber);
      } else {
        const newInvoiceNumber = generateInvoiceNumber();
        setInvoiceNumber(newInvoiceNumber);
        localStorage.setItem("invoice_number", newInvoiceNumber);
      }
      if (savedCheckoutAmount) {
        setCheckoutAmount(savedCheckoutAmount);
      } else {
        setCheckoutAmount(savedOrderDetails.checkoutAmount);
      }
    } else {
      router.push("/");
    }
  }, [router]);

  useEffect(() => {
    if (orderDetails && invoiceNumber && userId && checkoutAmount) {
      saveOrderToDatabase(orderDetails, userId, checkoutAmount);
      clearLocalStorage();
    }
  }, [orderDetails, invoiceNumber, userId, checkoutAmount]);

  console.log(orderDetails);

  const saveOrderToDatabase = async (orderDetails, userId, checkoutAmount) => {
    try {
      const total =
        Number(checkoutAmount?.total) + Number(checkoutAmount?.deliveryFee);

      const orderData = {
        userId: userId,
        orderNumber: invoiceNumber,
        name: orderDetails?.name,
        phone: orderDetails?.phone,
        address: orderDetails?.address,
        products: orderDetails?.cartItems.map((item) => ({
          productId: item.productId,
          quantity: item.stripCount,
          price: item.pricePerStrip,
        })),
        checkoutAmount: {
          subtotal: checkoutAmount.subtotal,
          discountedAmount: checkoutAmount.discountedAmount,
          deliveryFee: checkoutAmount.deliveryFee,
          total: total,
          totalProfit: checkoutAmount?.totalProfit || 0,
        },
        status: "Pending",
      };

      const paymentProcess = await axios.post(
        `${serverUrl}/api/payments/initiate`,
        {
          ...orderData,
          name: orderDetails.name,
          phone: orderDetails.phone,
          address: orderDetails.address,
        }
      );

      if (paymentProcess?.data?.url) {
        window.location.replace(paymentProcess?.data?.url);
      } else {
        throw new Error("Payment URL not found.");
      }

      const response = await axios.post(`${serverUrl}/api/orders`, orderData);
      console.log("Order saved:", response.data);

      const confirmationDetails = {
        orderDetails,
        invoiceNumber,
        checkoutAmount,
      };

      sessionStorage.setItem(
        "confirmationDetails",
        JSON.stringify(confirmationDetails)
      );
    } catch (error) {
      console.error("Error saving order:", error);
      toast.error("Failed to save order details.");
    }
  };

  const clearLocalStorage = () => {
    localStorage.removeItem("order_details");
    localStorage.removeItem("invoice_number");
    localStorage.removeItem("medicine_cart");
  };

  return (
    <div className="flex justify-center items-center min-h-screen text-5xl text-orange-600 shadow-md">
      Payment
    </div>
  );
};

export default Payment;
