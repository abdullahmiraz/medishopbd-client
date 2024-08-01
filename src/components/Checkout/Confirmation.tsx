"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { serverUrl } from "../../../api";
import {
  selectCheckoutAmount,
  clearCart,
} from "../../redux/features/cart/cartSlice";
import {
  selectInvoiceNumber,
  clearOrderData,
  createOrder,
} from "../../redux/features/order/orderSlice";
import InvoicePrint from "../GenerateReport/InvoicePrint";
import { selectUser } from "../../redux/features/user/userSlice";
import Link from "next/link";

const Confirmation = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const checkoutAmount = useSelector(selectCheckoutAmount);
  const orderDetails = JSON.parse(localStorage.getItem("orderDetails"));
  const invoiceNumber = localStorage.getItem("invoiceNumber");
  const userId = localStorage.getItem("userId");

  console.log(orderDetails, invoiceNumber, checkoutAmount);
  const printData = {
    orderDetails,
    invoiceNumber,
    checkoutAmount,
  };

  useEffect(() => {
    if (orderDetails) {
      const orderData = {
        userId: userId,
        orderNumber: invoiceNumber,
        name: orderDetails.name,
        phone: orderDetails.phone,
        address: orderDetails.address,
        products: orderDetails.items.map((item) => ({
          productId: item.productId,
          quantity: item.stripCount,
          price: item.pricePerStrip,
        })),
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
      dispatch(createOrder(orderData));
      dispatch(clearOrderData());
    }
  }, [orderDetails, dispatch, invoiceNumber, userId, checkoutAmount]);

  useEffect(() => {
    const handleUnload = () => {
      dispatch(clearCart());
    };

    window.addEventListener("beforeunload", handleUnload);
    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, [dispatch]);

  if (!invoiceNumber) {
    return (
      <div className="my-24 text-center space-y-8">
        <div className="text-2xl font-bold">There's no order details here</div>
        <Link href={"/"} className="btn bg-warning">
          Return Home
        </Link>
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
          <InvoicePrint printData={printData} />
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
