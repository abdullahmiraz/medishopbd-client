"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  selectCartItems,
  updateCheckoutAmount,
  selectCheckoutAmount,
} from "../../../redux/features/cart/cartSlice";
import {
  setPromoCode,
  clearPromoCode,
  validatePromoCode,
  selectPromoCode,
} from "../../../redux/features/promoCode/promoCodeSlice";
import { setOrderDetails } from "../../../redux/features/order/orderSlice";
import { selectUser } from "../../../redux/features/user/userSlice";

const Cart = () => {
  const [message, setMessage] = useState("");
  const [validateCheckout, setValidateCheckout] = useState(false);
  const [requiresPrescription, setRequiresPrescription] = useState(false);
  const router = useRouter();

  const userId = localStorage.getItem("userId");
  const cartItems = useSelector(selectCartItems);
  const checkoutAmount = useSelector(selectCheckoutAmount);
  const promoCodeState = useSelector(selectPromoCode);
  const currentUser = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const prescriptionRequired = cartItems.some(
      (item) => item.prescription === "true"
    );
    setRequiresPrescription(prescriptionRequired);
  }, [cartItems]);

  useEffect(() => {
    if (currentUser) {
      const { phone, address, name } = currentUser;
      setValidateCheckout(!!(phone && address && name)); // Ensure this sets a boolean value
    }
  }, [currentUser]);

  const handleRemoveItem = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handlePromoCodeChange = (event) => {
    dispatch(setPromoCode(event.target.value));
  };

  const handleApplyPromoCode = () => {
    dispatch(
      validatePromoCode({
        promoCode: promoCodeState.code,
        subtotal: checkoutAmount.subtotal,
      })
    )
      .unwrap()
      .then(({ discount }) => {
        dispatch(updateCheckoutAmount({ discountedAmount: discount }));
        toast.success("Promo code applied successfully!");
      })
      .catch((error) => {
        setMessage(error.message || "Invalid promo code.");
        toast.error(error.message || "Invalid promo code.");
      });
  };
  const handleCheckout = () => {
    if (!userId) {
      toast.error("Login/Signup First", {
        duration: 5000,
        position: "bottom-center",
      });
    } else {
      if (validateCheckout) {
        const calculatedCheckoutAmount = {
          subtotal: checkoutAmount.subtotal,
          discountedAmount: checkoutAmount.discountedAmount.toFixed(2),
          totalProfit: calculateProfit() || 0,
          total: calculateTotalAmount(),
        };

        const orderDetails = {
          cartItems,
          checkoutAmount: calculatedCheckoutAmount,
        };

        dispatch(setOrderDetails(orderDetails));
        router.push("/checkout");
      } else {
        toast.error("Enter your name and address properly in profile page");
      }
    }
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((acc, item) => acc + item.totalPrice, 0);
  };

  const calculateProfit = () => {
    return cartItems.reduce((acc, item) => acc + item.totalProfit, 0);
  };

  const calculateTotalAmount = () => {
    return Math.max(
      checkoutAmount.subtotal - checkoutAmount.discountedAmount,
      0
    );
  };

  const totalAmount = calculateTotalAmount();

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
                    href={`/products/${item?.productCode}/?pid=${item?.productId}`}
                    className="font-semibold"
                  >
                    {item?.name} {item?.measure}
                  </Link>
                  <p>You&#39;ve Selected: {item?.stripCount} items</p>
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
              <span>৳{checkoutAmount?.subtotal?.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Promo Discount</span>
              <span>- ৳{checkoutAmount?.discountedAmount?.toFixed(2)}</span>
            </div>
            <div className="border-t pt-2 mt-2 flex justify-between">
              <span>Total</span>
              <span className="font-bold">৳{totalAmount.toFixed(2)}</span>
            </div>
            <div className="mt-4 flex gap-4">
              <input
                type="text"
                placeholder="Enter Promo Code"
                value={promoCodeState.code}
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
              <Link
                href={"/products"}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Buy More
              </Link>
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
