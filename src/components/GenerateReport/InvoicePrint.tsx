import jsPDF from "jspdf";
import "jspdf-autotable";

const InvoicePrint = ({ confirmationDetails }) => {
  const { orderDetails, invoiceNumber, checkoutAmount } = confirmationDetails;
  console.log(confirmationDetails);

  const generatePDF = () => {
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
    const data = orderDetails?.cartItems.map((item) => [
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
    doc.text(`Sub Total: Tk. ${checkoutAmount?.subtotal}`, 10, startY);
    doc.text(
      `Delivery Fee: Tk. ${checkoutAmount?.deliveryFee}`,
      10,
      startY + 10
    );
    doc.text(
      `Discount: - Tk. ${checkoutAmount?.discountedAmount}`,
      10,
      startY + 20
    );
    doc.text(`Total: Tk. ${checkoutAmount?.total}`, 10, startY + 30);

    doc.save(`${invoiceNumber}.pdf`);
  };

  return (
    <div>
      <button
        onClick={generatePDF}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Download Receipt
      </button>
    </div>
  );
};

export default InvoicePrint;
