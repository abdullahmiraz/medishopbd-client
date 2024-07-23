"use client";

import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation"; // Correct import
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import Spinner from "../../../components/Shared/Spinner/Spinner";
import { serverUrl } from "../../../../api";

const generateInvoiceNumber = () => {
  const date = new Date();
  const formattedDate = `${date.getFullYear()}${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}${date.getDate().toString().padStart(2, "0")}`;
  const randomDigits = uuidv4().slice(0, 6).toUpperCase();
  return `INV-${formattedDate}-${randomDigits}`;
};

const Confirmation = () => {
  const userId = sessionStorage.getItem("mongoUserId");
  const [orderDetails, setOrderDetails] = useState(null);
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [checkoutAmount, setCheckoutAmount] = useState(null);
  const router = useRouter();

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
  }, []);

  useEffect(() => {
    if (orderDetails && invoiceNumber && userId && checkoutAmount) {
      saveOrderToDatabase(orderDetails, userId, checkoutAmount);
      generatePDF(orderDetails, invoiceNumber, checkoutAmount);
      // reduce the amount of stock of medicine here
      clearLocalStorage();
    }
  }, [orderDetails, invoiceNumber, userId, checkoutAmount]);

  const saveOrderToDatabase = async (orderDetails, userId, checkoutAmount) => {
    console.log(invoiceNumber);
    try {
      const total =
        Number(checkoutAmount?.total) + Number(checkoutAmount?.deliveryFee);

      const orderData = {
        userId: userId,
        orderNumber: invoiceNumber,
        products: orderDetails.cartItems.map((item) => ({
          productId: item.productId,
          quantity: item.stripCount,
          price: item.pricePerStrip,
        })),
        checkoutAmount: {
          subtotal: checkoutAmount.subtotal,
          discountedAmount: checkoutAmount.discountedAmount,
          deliveryFee: checkoutAmount.deliveryFee,
          total: total,
          totalProfit: checkoutAmount.totalProfit,
        },
        status: "Pending",
      };

      console.log(orderData);
      const response = await axios.post(`${serverUrl}/api/orders`, orderData);
      console.log("Order saved:", response.data);
    } catch (error) {
      console.error("Error saving order:", error);
      toast.error("Failed to save order details.");
    }
  };

  const generatePDF = (orderDetails, invoiceNumber, checkoutAmount) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;

    doc.setFontSize(10);
    doc.text("MediShopBD", 10, 10);
    doc.text("Address: Company Address", 10, 15);
    doc.text("Phone: +880123456789", 10, 20);
    doc.text("Email: info@company.com", 10, 25);

    doc.setFontSize(14);
    doc.text("Order Receipt", pageWidth / 2, 35, { align: "center" });
    doc.setFontSize(10);
    doc.text(`Invoice Number: ${invoiceNumber}`, pageWidth / 2, 40, {
      align: "center",
    });

    const headers = [["Item", "Price per strip", "Quantity", "Total Price"]];
    const data = orderDetails.cartItems.map((item) => [
      `${item.name} (${item.measure})`,
      `Tk. ${item.pricePerStrip}`,
      `${item.stripCount}`,
      `Tk. ${item.totalPrice}`,
    ]);

    doc.autoTable({
      startY: 50,
      head: headers,
      body: data,
    });

    const startY = doc.autoTable.previous.finalY + 10;
    doc.setFontSize(10);
    doc.text(`Sub Total: Tk. ${checkoutAmount.subtotal}`, 10, startY);
    doc.text("Delivery Fee: Tk. 60.00", 10, startY + 10);
    doc.text(
      `Discount: - Tk. ${checkoutAmount.discountedAmount}`,
      10,
      startY + 20
    );
    doc.text(`Total: Tk. ${checkoutAmount.total}`, 10, startY + 30);

    doc.save(`${invoiceNumber}.pdf`);
  };

  const clearLocalStorage = () => {
    localStorage.removeItem("order_details");
    localStorage.removeItem("invoice_number");
    localStorage.removeItem("medicine_cart");
  };

  return (
    <div className="container mx-auto my-12 px-6">
      <h1 className="text-2xl font-bold mb-4">Order Confirmation</h1>
      {orderDetails ? (
        <div>
          <p>Thank you for your order!</p>
          <p>
            Your order number is <strong>{invoiceNumber}</strong>.
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
            <button
              onClick={() =>
                generatePDF(orderDetails, invoiceNumber, checkoutAmount)
              }
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Download Receipt
            </button>
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default Confirmation;
