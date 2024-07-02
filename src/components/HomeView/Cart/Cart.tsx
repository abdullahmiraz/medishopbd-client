"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";
import { serverUrl } from "../../../../api";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [promoCode, setPromoCode] = useState("");
  const [discountedAmount, setDiscountedAmount] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState(60);
  const [message, setMessage] = useState("");
  const [validateCheckout, setValidateCheckout] = useState(false);

  const mongoUserId = sessionStorage.getItem("mongoUserId");
  const router = useRouter();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("medicine_cart")) || [];
    setCartItems(savedCart);
  }, []);

  const handleRemoveItem = (index) => {
    const updatedCart = cartItems.filter((item, i) => i !== index);
    setCartItems(updatedCart);
    localStorage.setItem("medicine_cart", JSON.stringify(updatedCart));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((acc, item) => acc + item.totalPrice, 0);
  };

  const applyPromoCode = async () => {
    try {
      const response = await axios.post(
        `${serverUrl}/api/promocodes/validate`,
        {
          code: promoCode,
        }
      );

      const { discount, discountType } = response.data;

      let calculatedDiscount = 0;
      if (discountType === "percentage") {
        calculatedDiscount = (discount / 100) * calculateSubtotal();
      } else if (discountType === "fixed") {
        calculatedDiscount = discount;
      }

      if (calculatedDiscount >= totalAmount) {
        toast.error("Promo code cannnot be less than total price!");
      } else {
        setDiscountedAmount(calculatedDiscount);
        setMessage("Promo code applied successfully!");
        toast.success("Promo code applied successfully!");
      }
    } catch (error) {
      console.error("Error applying promo code:", error);
      setMessage(error.response.data.message || "Invalid promo code.");
      toast.error(error.response.data.message || "Invalid promo code.");
      setDiscountedAmount(0);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${serverUrl}/api/users/${mongoUserId}`
        );
        const userData = response.data;
        console.log("Fetched User Data:", userData);

        const { phone, address, name } = userData;
        if (phone !== "" && address !== "" && name !== "") {
          setValidateCheckout(true);
        } else {
          setValidateCheckout(false); // Ensure it's explicitly set to false if any field is empty
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    if (mongoUserId) {
      fetchUser();
    }
  }, [validateCheckout]);

  // Use this useEffect to log validateCheckout after it has been updated
  useEffect(() => {
    console.log("validateCheckout:", validateCheckout);
  }, [validateCheckout]);

  const handlePromoCodeChange = (event) => {
    setPromoCode(event.target.value);
  };

  const handleApplyPromoCode = () => {
    if (mongoUserId) {
      toast.error("Login In First");
    } else {
      applyPromoCode();
    }
  };

  const handleCheckout = () => {
    if (!mongoUserId) {
      toast.error("Login/Signup First", {
        duration: 5000,
        position: "bottom-center",
      });
    } else {
      if (validateCheckout) {
        router?.push("/checkout");
      } else {
        toast.error("Enter your name and address properly in profile page ");
      }
    }
  };

  const totalAmount =
    calculateSubtotal() >= discountedAmount
      ? calculateSubtotal() - discountedAmount + deliveryFee
      : 0;
  const checkoutAmount = {
    subtotal: calculateSubtotal(),
    discountedAmount: discountedAmount.toFixed(2),
    deliveryFee: deliveryFee,
    total: totalAmount,
  };

  localStorage.setItem("checkoutAmount", JSON.stringify(checkoutAmount));

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
              <span>৳{checkoutAmount?.subtotal}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Delivery Fee</span>
              <span>৳{checkoutAmount?.deliveryFee}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Promo Discount</span>
              <span>- ৳{checkoutAmount?.discountedAmount}</span>
            </div>
            <div className="border-t pt-2 mt-2 flex justify-between">
              <span>Total</span>
              <span className="font-bold">৳{checkoutAmount?.total}</span>
            </div>
            <div className="mt-4 flex gap-4">
              <input
                type="text"
                placeholder="Enter Promo Code"
                value={promoCode}
                onChange={handlePromoCodeChange}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm w-full"
              />
              <button
                type="button"
                onClick={handleApplyPromoCode}
                className="px-4 py-2 bg-blue-500 text-white rounded text-sm"
              >
                Apply Promo Code
              </button>
            </div>
            {message && <p className="mt-2">{message}</p>}
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
