"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { serverUrl } from "../../../api";
import {
  selectInvoiceNumber,
  selectOrderDetails,
  selectOrderCheckoutAmount,
} from "../../redux/features/order/orderSlice";
import { selectUser } from "../../redux/features/user/userSlice";
import { clearPaymentData } from "../../redux/features/payment/paymentSlice";

const Payment = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const orderDetails = useSelector(selectOrderDetails);
  const invoiceNumber = useSelector(selectInvoiceNumber);
  const checkoutAmount = useSelector(selectOrderCheckoutAmount);
  const user = useSelector(selectUser);
  // const { userId } = user;
  const userId = localStorage.getItem("userId");
  console.log(userId, orderDetails, invoiceNumber, checkoutAmount);

  useEffect(() => {
    if (orderDetails && invoiceNumber && checkoutAmount && userId) {
      saveOrderToDatabase(orderDetails, invoiceNumber, checkoutAmount, userId);
    } else {
      router.push("/");
    }
  }, [orderDetails, invoiceNumber, checkoutAmount, userId, router]);

  const saveOrderToDatabase = async (
    orderDetails: { name: any; phone: any; address: any; cartItems: any[] },
    invoiceNumber: any,
    checkoutAmount: {
      subtotal: any;
      discountedAmount: any;
      deliveryFee: any;
      total: any;
      totalProfit: any;
    },
    userId: string
  ) => {
    try {
      const orderData = {
        userId: userId,
        orderNumber: invoiceNumber,
        name: orderDetails.name,
        phone: orderDetails.phone,
        address: orderDetails.address,
        products: orderDetails.cartItems.map(
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

      console.log(orderData);

      // Initiate payment
      const paymentProcess = await axios.post(
        `${serverUrl}/api/payments/initiate`,
        orderData
      );
      console.log(paymentProcess);
      if (paymentProcess?.data?.url) {
        // Redirect to SSL Commerz payment page
        window.location.replace(paymentProcess?.data?.url);

        // Save order data to the backend
        await axios.post(`${serverUrl}/api/orders`, orderData);

        // Clear payment data in Redux
        // dispatch(clearPaymentData());
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
