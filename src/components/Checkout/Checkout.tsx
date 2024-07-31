// src/pages/checkout.tsx
"use client";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  setOrderDetails,
  setInvoiceNumber,
  setCheckoutAmount,
  selectInvoiceNumber,
} from "../../redux/features/order/orderSlice";
import {
  selectCartItems,
  selectCheckoutAmount,
  clearCart,
} from "../../redux/features/cart/cartSlice";
import error from "next/error";
import Link from "next/link";
import { selectUser } from "../../redux/features/user/userSlice";

const Checkout = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const cartItems = useSelector(selectCartItems);
  const checkoutAmount = useSelector(selectCheckoutAmount);
  const [currentDeliveryFee, setCurrentDeliveryFee] = useState(0);
  const [useDefaultAddress, setUseDefaultAddress] = useState(true);
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("payonline");
  const invoiceNumber = useSelector(selectInvoiceNumber);
  const user = useSelector(selectUser);
  console.log(user);
  console.log(checkoutAmount);

  useEffect(() => {
    // // Generate a unique invoice number
    // const invoiceNumber = `INV-${Date.now()}`;

    // Set order details
    const orderDetails = {
      items: cartItems,
      phone: user?.phone,
      address: useDefaultAddress ? user?.address : address,
      paymentMethod,
    };

    dispatch(setOrderDetails(orderDetails));
    dispatch(setInvoiceNumber(invoiceNumber));
    dispatch(setCheckoutAmount(checkoutAmount));
    console.log(orderDetails, invoiceNumber, checkoutAmount);
  }, [
    dispatch,
    cartItems,
    checkoutAmount,
    useDefaultAddress,
    address,
    paymentMethod,
    user?.phone,
    user?.address,
    invoiceNumber,
  ]);

  const handleOrder = () => {
    // Save order details to Redux
    const orderDetails = {
      items: cartItems,
      address: useDefaultAddress ? user?.address : address,
      paymentMethod,
      deliveryFee: currentDeliveryFee,
      totalAmount: checkoutAmount.total,
    };

    dispatch(setOrderDetails(orderDetails));

    if (paymentMethod === "payonline") {
      // Redirect to the Payment page for SSL Commerz
      router.push("/checkout/payment");
    } else {
      // Clear the cart after placing the order
      // dispatch(clearCart());

      // Navigate to the confirmation page for other payment methods
      router.push("/checkout/confirmation");
    }
  };

  return (
    <div className="container mx-auto my-12 px-6">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-8">
          <div className="border p-4 rounded-md mb-4">
            <h2 className="font-bold text-xl mb-4">Shipping Information</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div className="mb-4">
              <label className="block mb-2 font-semibold">Name:</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={user?.name}
                disabled
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-semibold">Phone:</label>
              <input
                type="number"
                className="w-full p-2 border rounded"
                value={user?.phone}
                disabled
              />
            </div>
            <div className="mb-4">
              <div className="flex items-center gap-8 mb-3">
                <label className="block font-semibold " htmlFor="address">
                  Address:
                </label>
                <select
                  id="address"
                  name="address"
                  className="w-full bg-slate-300 "
                  onChange={(e) =>
                    setCurrentDeliveryFee(Number(e.target.value))
                  }
                >
                  <option value="" disabled selected>
                    Select a division
                  </option>
                  <option value={60}>Dhaka</option>
                  <option value={70}>Chattogram</option>
                  <option value={80}>Rajshahi</option>
                  <option value={90}>Khulna</option>
                  <option value={100}>Barishal</option>
                  <option value={110}>Sylhet</option>
                  <option value={120}>Rangpur</option>
                  <option value={100}>Mymensingh</option>
                </select>
              </div>

              <div className="mb-2">
                <label>
                  <input
                    type="radio"
                    name="addressOption"
                    value="default"
                    checked={useDefaultAddress}
                    onChange={() => setUseDefaultAddress(true)}
                    className="mr-2"
                  />
                  Use Default Address
                </label>
              </div>
              <div className="mb-2">
                <label>
                  <input
                    type="radio"
                    name="addressOption"
                    value="new"
                    checked={!useDefaultAddress}
                    onChange={() => setUseDefaultAddress(false)}
                    className="mr-2"
                  />
                  Deliver to a New Address
                </label>
              </div>
            </div>
            <div className="mb-4">
              <textarea
                className="w-full p-2 border rounded"
                value={address}
                disabled={useDefaultAddress}
                onChange={(e) => setAddress(e.target.value)}
                required={!useDefaultAddress}
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
                  value="payonline"
                  checked={paymentMethod === "payonline"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mr-2"
                />
                Pay Online (SSL Commerz)
              </label>
            </div>
          </div>
        </div>
        <div className="col-span-12 md:col-span-4 mb-4">
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
                    <p>Total Price: Tk. {item?.totalPrice.toFixed(2)}</p>
                    <p>Quantity: {item?.stripCount}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="flex justify-between mb-2">
              <span>Sub Total</span>
              <span>Tk. {checkoutAmount?.subtotal}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Delivery Fee</span>
              <span>Tk. {currentDeliveryFee}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Discount</span>
              <span>- Tk. {checkoutAmount?.discountedAmount}</span>
            </div>
            <div className="border-t pt-2 mt-2 flex justify-between">
              <span>Total</span>
              <span className="font-bold">
                Tk.{" "}
                {checkoutAmount?.subtotal +
                  currentDeliveryFee -
                  checkoutAmount?.discountedAmount}
              </span>
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
                disabled={useDefaultAddress ? !user?.address : !address}
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
