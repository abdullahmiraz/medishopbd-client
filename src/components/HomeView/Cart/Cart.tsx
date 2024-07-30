"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";
import { serverUrl } from "../../../../api";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../../redux/features/user/userSlice";
import {
  removeFromCart,
  setCart,
} from "../../../redux/features/cart/cartSlice";
import { setOrderDetails } from "../../../redux/features/payment/paymentSlice";

const Cart = () => {
  const [promoCode, setPromoCode] = useState("");
  const [discountedAmount, setDiscountedAmount] = useState(0);
  const [message, setMessage] = useState("");
  const [validateCheckout, setValidateCheckout] = useState(false);
  const [requiresPrescription, setRequiresPrescription] = useState(false);
  const router = useRouter();

  const userId = localStorage.getItem("userId");
  const cartItems = useSelector((state) => state.cart.items);
  const currentUser = useSelector(selectUser);
  const dispatch = useDispatch();

  console.log(cartItems);

  useEffect(() => {
    const prescriptionRequired = cartItems.some(
      (item) => item.prescription == "true"
    );
    setRequiresPrescription(prescriptionRequired);
  }, [cartItems]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(`${serverUrl}/api/cart/${userId}`);
        const cartData = response.data;
        dispatch(setCart(cartData));
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    if (userId) {
      fetchCartItems();
    }
  }, [userId, dispatch]);

  const handleRemoveItem = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((acc, item) => acc + item.totalPrice, 0);
  };

  const calculateProfit = () => {
    return cartItems.reduce((acc, item) => acc + item.totalProfit, 0);
  };

  const applyPromoCode = async () => {
    try {
      const response = await axios.post(
        `${serverUrl}/api/promocodes/validate`,
        { code: promoCode }
      );

      const { discount, discountType } = response.data;
      let calculatedDiscount = 0;

      if (discountType === "percentage") {
        calculatedDiscount = (discount / 100) * calculateSubtotal();
      } else if (discountType === "fixed") {
        calculatedDiscount = discount;
      }

      if (calculatedDiscount >= totalAmount) {
        toast.error("Promo code cannot be less than total price!");
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
        const response = await axios.get(`${serverUrl}/api/users/${userId}`);
        const userData = response.data;

        const { phone, address, name } = userData;
        if (phone !== "" && address !== "" && name !== "") {
          setValidateCheckout(true);
        } else {
          setValidateCheckout(false);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    if (userId) {
      fetchUser();
    }
  }, [userId]);

  const handlePromoCodeChange = (event) => {
    setPromoCode(event.target.value);
  };

  const handleApplyPromoCode = () => {
    applyPromoCode();
  };

  const handleCheckout = () => {
    if (!userId) {
      toast.error("Login/Signup First", {
        duration: 5000,
        position: "bottom-center",
      });
    } else {
      if (validateCheckout) {
        const checkoutAmount = {
          subtotal: calculateSubtotal(),
          discountedAmount: discountedAmount.toFixed(2),
          totalProfit: calculateProfit() || 0,
          total: totalAmount,
        };

        const orderDetails = {
          cartItems,
          checkoutAmount,
        };

        dispatch(setOrderDetails(orderDetails));

        router?.push("/checkout");
      } else {
        toast.error("Enter your name and address properly in profile page ");
      }
    }
  };

  const totalAmount =
    calculateSubtotal() >= discountedAmount
      ? calculateSubtotal() - discountedAmount
      : 0;

  return (
    <div className="my-12 px-6">
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
                  <p>Total Price: Tk. {item?.totalPrice.toFixed(2)}</p>
                </div>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  onClick={() => handleRemoveItem(item.productId)}
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
              <span>Promo Discount</span>
              <span>- ৳{discountedAmount.toFixed(2)}</span>
            </div>
            <div className="border-t pt-2 mt-2 flex justify-between">
              <span>Total</span>
              <span className="font-bold">৳{totalAmount.toFixed(2)}</span>
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
