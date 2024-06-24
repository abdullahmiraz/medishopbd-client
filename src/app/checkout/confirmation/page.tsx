"use client";

import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import Spinner from "../../../components/Shared/Spinner/Spinner";
import { serverUrl } from "../../../../api";
import { UserAuth } from "../../../context/AuthContext";

const companyLogoUrl =
  "https://cdn-icons-png.flaticon.com/512/4599/4599153.png";

const generateInvoiceNumber = () => {
  const date = new Date();
  const formattedDate = `${date.getFullYear()}${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}${date.getDate().toString().padStart(2, "0")}`;
  const randomDigits = String(uuidv4().slice(0, 6)).toUpperCase();
  return `INV-${formattedDate}-${randomDigits}`;
};

const Confirmation = () => {
  const userId = sessionStorage.getItem("mongoUserId");
  console.log(userId);

  const [orderDetails, setOrderDetails] = useState(null);
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const router = useRouter();

  useEffect(() => {
    const savedOrderDetails = JSON.parse(localStorage.getItem("order_details"));
    const savedInvoiceNumber = localStorage.getItem("invoice_number");

    if (savedOrderDetails) {
      setOrderDetails(savedOrderDetails);
      if (savedInvoiceNumber) {
        setInvoiceNumber(savedInvoiceNumber);
      } else {
        const invoiceNo = generateInvoiceNumber();
        setInvoiceNumber(invoiceNo);
        localStorage.setItem("invoice_number", invoiceNo);
      }
    } else {
      router.push("/");
    }
  }, []);

  useEffect(() => {
    if (orderDetails && invoiceNumber && userId) {
      saveOrderToDatabase(orderDetails, userId); // Pass user._id to save order
      generatePDF(orderDetails, invoiceNumber); // Call generatePDF once after setting orderDetails and invoiceNumber
      clearLocalStorage();
    }
  }, [orderDetails, invoiceNumber, userId]);

  const saveOrderToDatabase = async (orderDetails, userId) => {
    try {
      const orderData = {
        userId: userId,
        products: orderDetails?.cartItems?.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
        })),
        total: orderDetails.total,
      };

      const response = await axios.post(`${serverUrl}/api/orders`, orderData);
      console.log("Order saved:", response.data);
    } catch (error) {
      console.error("Error saving order:", error);
      toast.error("Failed to save order details.");
    }
  };

  const generatePDF = (orderDetails, invoiceNumber) => {
    const doc = new jsPDF("p", "mm", "a4");
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;

    doc.addImage(companyLogoUrl, "PNG", 10, 10, 40, 40);

    doc.setFontSize(12);
    doc.text("Company Name", 60, 25);
    doc.text("Address: Company Address", 60, 35);
    doc.text("Phone: +880123456789", 60, 45);
    doc.text("Email: info@company.com", 60, 55);

    doc.setFontSize(18);
    doc.text("Order Receipt", pageWidth / 2, 80, { align: "center" });
    doc.setFontSize(12);
    doc.text(`Invoice Number: ${invoiceNumber}`, pageWidth / 2, 90, {
      align: "center",
    });

    const headers = [["Item", "Price per strip", "Quantity", "Total Price"]];
    const data = orderDetails?.cartItems?.map((item) => [
      `${item.name} (${item.measure})`,
      `Tk. ${item.pricePerStrip}`,
      `${item.stripCount}`,
      `Tk. ${item.totalPrice}`,
    ]);

    doc.autoTable({
      startY: 120,
      head: headers,
      body: data,
      didDrawPage: function (data) {
        doc.setFontSize(10);
        doc.text("Company Name", pageWidth - 60, pageHeight - 10, {
          align: "right",
        });
        doc.text("Company Address", pageWidth - 60, pageHeight - 5, {
          align: "right",
        });
        doc.text("Phone: +880123456789", pageWidth - 60, pageHeight, {
          align: "right",
        });
        doc.text("Email: info@company.com", pageWidth - 60, pageHeight + 5, {
          align: "right",
        });
      },
    });

    const startY = doc.autoTable.previous.finalY + 10;
    doc.setFontSize(12);
    doc.text(
      `Sub Total: Tk. ${calculateSubtotal(orderDetails?.cartItems)?.toFixed(
        2
      )}`,
      20,
      startY
    );
    doc.text("Delivery Fee: Tk. 60.00", 20, startY + 10);
    doc.text("Discount: - Tk. 0.00", 20, startY + 20);
    doc.text(`Total: Tk. ${orderDetails.total.toFixed(2)}`, 20, startY + 30);

    doc.save(`${invoiceNumber}.pdf`);
  };

  const calculateSubtotal = (cartItems) => {
    return cartItems.reduce((acc, item) => acc + item.totalPrice, 0);
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
          <div>
            Our customer care agents will call you shortly to confirm your order
          </div>
          <div className="flex gap-4 my-4">
            <Link href="/" className="px-4 py-2 bg-blue-500 text-white rounded">
              Return to Homepage
            </Link>
            <button
              onClick={
                () => generatePDF(orderDetails, invoiceNumber) // Call generatePDF once after setting orderDetails and invoiceNumber
              }
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Download Reciept
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
