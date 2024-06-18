"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import jsPDF from "jspdf";

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cashOnDelivery");

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("medicine_cart")) || [];
    setCartItems(savedCart);
  }, []);

  const calculateSubtotal = () => {
    return cartItems.reduce((acc, item) => acc + item.totalPrice, 0);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const deliveryFee = 60; // Example delivery fee
    const discount = 0; // Example discount
    return subtotal + deliveryFee - discount;
  };

  const handleOrder = () => {
    // Placeholder for handling order logic, e.g., sending to backend, etc.
    // Simulate redirect to confirmation page after order is placed
    window.location.href = "../checkout/confirmation";
  };

  if (cartItems.length === 0) {
    return <p className="text-center">Your cart is empty.</p>;
  }

  return (
    <div className="container mx-auto my-12 px-6">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-8">
          <div className="border p-4 rounded-md mb-4">
            <h2 className="font-bold text-xl mb-4">Shipping Information</h2>
            <div className="mb-4">
              <label className="block mb-2">Name</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Phone</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Address</label>
              <textarea
                className="w-full p-2 border rounded"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              ></textarea>
            </div>
          </div>
          <div className="border p-4 rounded-md">
            <h2 className="font-bold text-xl mb-4">Payment Options</h2>
            <div className="mb-2">
              <label>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cashOnDelivery"
                  checked={paymentMethod === "cashOnDelivery"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mr-2"
                />
                Cash on Delivery
              </label>
            </div>
            <div className="mb-2">
              <label>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="bkash"
                  checked={paymentMethod === "bkash"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mr-2"
                />
                bKash
              </label>
            </div>
            <div className="mb-2">
              <label>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="nagad"
                  checked={paymentMethod === "nagad"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mr-2"
                />
                Nagad
              </label>
            </div>
            <div className="mb-2">
              <label>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={paymentMethod === "card"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mr-2"
                />
                Credit/Debit Card
              </label>
            </div>
          </div>
        </div>
        <div className="col-span-12 md:col-span-4">
          <div className="border p-4 rounded-md">
            <h2 className="font-bold text-xl mb-4">Order Summary</h2>
            <ul className="space-y-4 mb-4">
              {cartItems.map((item, index) => (
                <li key={index} className="flex justify-between">
                  <div>
                    <h3 className="font-semibold">
                      {item?.name} {item?.measure}
                    </h3>
                    <p>Price per strip: Tk. {item?.pricePerStrip}</p>
                    <p>Total Price: Tk. {item?.totalPrice}</p>
                    <p>Quantity: {item.stripCount}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="flex justify-between mb-2">
              <span>Sub Total</span>
              <span>৳{calculateSubtotal().toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Delivery Fee</span>
              <span>৳60.00</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Discount</span>
              <span>- ৳0.00</span>
            </div>
            <div className="border-t pt-2 mt-2 flex justify-between">
              <span>Total</span>
              <span className="font-bold">৳{calculateTotal().toFixed(2)}</span>
            </div>
            <div className="flex justify-between mt-4">
              <Link href={"/cart"}>
                <button className="px-4 py-2 bg-blue-500 text-white rounded">
                  Back to Cart
                </button>
              </Link>
              <button
                className="px-4 py-2 bg-green-500 text-white rounded"
                onClick={handleOrder}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
