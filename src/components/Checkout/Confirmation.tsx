"use client";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
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
  selectOrderDetails,
} from "../../redux/features/order/orderSlice";
import InvoicePrint from "../GenerateReport/InvoicePrint";
import { selectUser } from "../../redux/features/user/userSlice";
import Link from "next/link";
import Head from "next/head";
import axios from "axios";

const Confirmation = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const checkoutAmount = useSelector(selectCheckoutAmount);
  const [hasUpdatedStock, setHasUpdatedStock] = useState(false);

  // Retrieve from localStorage
  const orderDetails = JSON.parse(
    localStorage.getItem("orderDetails") || "null"
  );
  const invoiceNumber = localStorage.getItem("invoiceNumber");
  const userId = localStorage.getItem("userId");

  // Log to check values
  console.log(orderDetails, invoiceNumber, checkoutAmount);

  const printData = {
    orderDetails,
    invoiceNumber,
    checkoutAmount,
  };

  const updateProductStock = useMemo(
    () => async (productId, quantityToDeduct) => {
      try {
        // Make the PUT request and capture the response
        const response = await axios.put(
          `${serverUrl}/api/products/stockupdate/${productId}`,
          { productId, quantityToDeduct }
        );
        console.log(`Stock updated for product ${productId}:`, response.data);

        return response.data;
      } catch (error) {
        console.error(`Error updating stock for product ${productId}:`, error);
      }
    },
    [serverUrl]
  );

  const updateStock = useCallback(
    async (items) => {
      for (const item of items) {
        const { productId, stripCount } = item;
        try {
          await updateProductStock(productId, stripCount); // Deduct stock for each item
        } catch (error) {
          console.error(
            `Failed to update stock for product ${productId}:`,
            error
          );
        }
      }
    },
    [updateProductStock]
  );

  useEffect(() => {
    const handleOrderCreation = async () => {
      if (
        orderDetails &&
        invoiceNumber &&
        checkoutAmount &&
        userId &&
        !hasUpdatedStock
      ) {
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
            totalProfit: checkoutAmount?.totalProfit,
          },
          status: "Pending",
        };

        try {
          // Update stock first
          await updateStock(orderDetails.items);

          // Set flag to true after stock is updated
          setHasUpdatedStock(true);

          // Create the order
          const response = await axios.post(
            `${serverUrl}/api/orders`,
            orderData
          );
          console.log(response?.data);
          return response?.data;
        } catch (error) {
          console.error(
            "Order creation failed:",
            error.response ? error.response.data : error.message
          );
        }
      }
    };

    handleOrderCreation();
  }, [
    orderDetails,
    dispatch,
    invoiceNumber,
    userId,
    checkoutAmount,
    hasUpdatedStock,
    updateStock,
  ]);

  useEffect(() => {
    const handleUnload = () => {
      if (invoiceNumber) {
        dispatch(clearCart());
      }
    };

    window.addEventListener("beforeunload", handleUnload);
    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, [dispatch, invoiceNumber]);

  if (!invoiceNumber) {
    return (
      <div className="my-24 text-center space-y-8">
        <div className="text-2xl font-bold">
          There&#39;s no order details here
        </div>
        <Link href={"/"} className="btn bg-warning">
          Return Home
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto my-12 px-6">
      <Head>
        <title>Confirmation</title>
      </Head>
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
