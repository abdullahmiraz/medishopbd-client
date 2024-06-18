"use client";
import { useEffect } from "react";
import Link from "next/link";
import jsPDF from "jspdf";

const Confirmation = () => {
  useEffect(() => {
    generatePDF();
  }, []);

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Order Confirmation", 14, 10);
    doc.text("Date: " + new Date().toLocaleDateString(), 14, 20);
    doc.text("Company Name: Medi Shop BD", 14, 30);
    // Add more details as needed from the order
    doc.save("order_confirmation.pdf");
  };

  return (
    <div className="container mx-auto my-12 px-6">
      <h1 className="text-2xl font-bold mb-4">Order Confirmation</h1>
      <p>Your order has been placed successfully!</p>
      <p>Download your order confirmation:</p>
      <div className="flex justify-between mt-4">
        <Link href={"/cart"}>
          <button className="px-4 py-2 bg-blue-500 text-white rounded">
            Back to Cart
          </button>
        </Link>
        <a
          href="/order_confirmation.pdf"
          download="order_confirmation.pdf"
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Download Order Confirmation PDF
        </a>
      </div>
    </div>
  );
};

export default Confirmation;
