"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { UserAuth } from "../../../context/AuthContext";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

const mongoUserId = sessionStorage.getItem("mongoUserId");

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  const router = useRouter();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("medicine_cart")) || [];
    setCartItems(savedCart);
  }, []);

  const handleRemoveItem = (index) => {
    const updatedCart = cartItems.filter((item, i) => i !== index);
    setCartItems(updatedCart);
    console.log(item);
    localStorage.setItem("medicine_cart", JSON.stringify(updatedCart));
  };

  const handleQuantityChange = (index, newQuantity) => {
    if (newQuantity < 1 || newQuantity > 20) return; // Limiting quantity between 1 and 20
    const updatedCart = cartItems.map((item, i) =>
      i === index
        ? {
            ...item,
            stripCount: newQuantity,
            totalPrice: item.pricePerStrip * newQuantity,
          }
        : item
    );
    setCartItems(updatedCart);
    localStorage.setItem("medicine_cart", JSON.stringify(updatedCart));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((acc, item) => acc + item.totalPrice, 0);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const deliveryFee = 60; // Example delivery fee
    const discount = 0; // Example discount
    return subtotal + deliveryFee - discount;
  };

  if (cartItems.length === 0) {
    return <p className="text-center my-12">Your cart is empty.</p>;
  }

  const handleCheckout = () => {
    if (mongoUserId) {
      router?.push("/checkout");
    } else {
      toast.error("Login/Signup First", {
        duration: 5000,
        position: "bottom-center",
      });
    }
  };

  return (
    <div className="container mx-auto my-12 px-6">
      <Toaster />
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-8">
          <ul className="space-y-4">
            {cartItems.map((item, index) => (
              <li
                key={index}
                className="border p-4 rounded-md flex justify-between items-center"
              >
                <div>
                  <Link
                    href={`../products/${item?.productId}`}
                    className="font-semibold"
                  >
                    {item?.name} {item?.measure}
                  </Link>
                  <p>You've Selected: {item?.stripCount} items</p>
                  <p>Price per strip: Tk. {item?.pricePerStrip}</p>
                  <p>Total Price: Tk. {item?.totalPrice}</p>
                </div>
                {/* <div className="flex items-center">
                  <button
                    className="px-2 py-1 border"
                    onClick={() =>
                      handleQuantityChange(
                        index,
                        item.stripCount > 1 ? item.stripCount - 1 : 1
                      )
                    }
                  >
                    -
                  </button>
                  <input
                    type="number"
                    className="border rounded px-2 py-1 text-center mx-2"
                    value={item.stripCount}
                    min="1"
                    max="20"
                    onChange={(e) =>
                      handleQuantityChange(index, parseInt(e.target.value))
                    }
                  />
                  <button
                    className="px-2 py-1 border"
                    onClick={() =>
                      handleQuantityChange(index, item.stripCount + 1)
                    }
                  >
                    +
                  </button>
                </div> */}
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  onClick={() => handleRemoveItem(index)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-4">
          <div className="border p-4 rounded-md">
            <h2 className="font-bold text-xl mb-4">Cart Summary</h2>
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
              <button className="px-4 py-2 bg-blue-500 text-white rounded">
                Buy More
              </button>
              <button
                onClick={handleCheckout}
                className="px-4 py-2 bg-green-500 text-white rounded"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
