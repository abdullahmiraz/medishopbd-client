"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { serverUrl } from "../../../api";
import {
  clearPaymentData,
  selectCheckoutAmount,
  selectInvoiceNumber,
  selectOrderDetails,
} from "../../redux/features/payment/paymentSlice";

const Payment = () => {
  const dispatch = useDispatch();
  const orderDetails = useSelector(selectOrderDetails);
  console.log(orderDetails);
  const invoiceNumber = useSelector(selectInvoiceNumber);
  const checkoutAmount = useSelector(selectCheckoutAmount);
  const router = useRouter();

  useEffect(() => {
    if (orderDetails && invoiceNumber && checkoutAmount) {
      saveOrderToDatabase(orderDetails, invoiceNumber, checkoutAmount);
    } else {
      router.push("/");
    }
  }, [orderDetails, invoiceNumber, checkoutAmount, router]);

  const saveOrderToDatabase = async (
    orderDetails,
    invoiceNumber,
    checkoutAmount
  ) => {
    try {
      const total =
        Number(checkoutAmount?.total) + Number(checkoutAmount?.deliveryFee);

      const orderData = {
        userId: sessionStorage.getItem("mongoUserId"),
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
      dispatch(clearPaymentData());
    } catch (error) {
      console.error("Error saving order:", error);
      toast.error("Failed to save order details.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen text-5xl text-orange-600 shadow-md">
      Payment
    </div>
  );
};

export default Payment;
