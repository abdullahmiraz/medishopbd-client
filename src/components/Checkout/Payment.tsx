"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { serverUrl } from "../../../api";
import {
  selectInvoiceNumber,
  selectOrderDetails,
  selectOrderCheckoutAmount,
} from "../../redux/features/order/orderSlice";
import { selectUser } from "../../redux/features/user/userSlice";

const Payment = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const orderDetails = useSelector(selectOrderDetails);
  const invoiceNumber = useSelector(selectInvoiceNumber);
  const checkoutAmount = useSelector(selectOrderCheckoutAmount);
  const user = useSelector(selectUser);

  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    setUserId(storedUserId);
  }, []);

  useEffect(() => {
    if (orderDetails && invoiceNumber && checkoutAmount && userId) {
      saveOrderToDatabase(orderDetails, invoiceNumber, checkoutAmount, userId);
    } else {
      router.push("/");
    }
  }, [orderDetails, invoiceNumber, checkoutAmount, userId, router]);

  const saveOrderToDatabase = async (
    orderDetails,
    invoiceNumber,
    checkoutAmount,
    userId
  ) => {
    try {
      const orderData = {
        userId: userId,
        orderNumber: invoiceNumber,
        name: orderDetails.name,
        phone: orderDetails.phone,
        address: orderDetails.address,
        products: orderDetails.items.map(
          (item: { productId: any; stripCount: any; pricePerStrip: any }) => ({
            productId: item.productId,
            quantity: item.stripCount,
            price: item.pricePerStrip,
          })
        ),
        checkoutAmount: {
          subtotal: checkoutAmount.subtotal,
          discountedAmount: checkoutAmount.discountedAmount,
          deliveryFee: checkoutAmount.deliveryFee,
          total: checkoutAmount.total,
          totalProfit: checkoutAmount.totalProfit || 0,
        },
        status: "Pending",
      };

      // Save order data to localStorage before initiating payment
      // localStorage.setItem("orderData", JSON.stringify(orderData));

      // Initiate payment
      // Initiate payment
      const { data } = await axios.post(
        `${serverUrl}/api/payments/initiate`,
        orderData
      );

      if (data?.url) {
        window.location.replace(data.url);
      } else {
        throw new Error("Payment URL not found.");
      }
    } catch (error) {
      console.error("Error processing payment:", error);
      toast.error("Failed to process payment.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen text-5xl text-orange-600 shadow-md">
      Processing Payment...
    </div>
  );
};

export default Payment;
