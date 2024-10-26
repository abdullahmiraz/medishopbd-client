"use client";

import { v4 as uuidv4 } from "uuid"; // For generating random alphanumeric string
import error from "next/error";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  selectCartItems,
  selectCheckoutAmount,
  updateCheckoutAmount,
} from "../../redux/features/cart/cartSlice";

import {
  setCheckoutAmount,
  setInvoiceNumber,
  setOrderDetails,
} from "../../redux/features/order/orderSlice";
import { selectUser } from "../../redux/features/user/userSlice";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { serverUrl } from "../../../api";

const generateInvoiceNumber = () => {
  const now = new Date();

  // Format date as YYYYMMDD in local BD format
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const day = String(now.getDate()).padStart(2, "0");

  // Generate a random alphanumeric string
  const randomString = uuidv4().slice(0, 6).toUpperCase();

  // Construct the invoice number
  return `INV-${year}${month}${day}-${randomString}`;
};

const Checkout = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const cartItems = useSelector(selectCartItems);
  const checkoutAmount = useSelector(selectCheckoutAmount);
  const [useDefaultAddress, setUseDefaultAddress] = useState(true);
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cashOnDelivery");
  const [currentDeliveryFee, setCurrentDeliveryFee] = useState(0);
  const [deliveryFees, setDeliveryFees] = useState([]); // New state for delivery fees
  const [isProcessing, setIsProcessing] = useState(false);
  const prescriptionRequired = localStorage.getItem("prescription");

  const user = useSelector(selectUser);

  useEffect(() => {
    const fetchDeliveryFees = async () => {
      try {
        const { data } = await axios.get(`${serverUrl}/api/deliveryFees/all`);
        setDeliveryFees(data);
      } catch (error) {
        toast.error("Error fetching delivery fees");
        console.error(error);
      }
    };
    fetchDeliveryFees();
  }, []);

  useEffect(() => {
    const orderDetails = {
      items: cartItems,
      name: user?.name,
      phone: user?.phone,
      address: useDefaultAddress ? user?.address : address,
      paymentMethod,
    };
    console.log("Dispatching orderDetails: ", orderDetails); // Log here

    dispatch(setOrderDetails(orderDetails));
    dispatch(setInvoiceNumber(generateInvoiceNumber()));
    dispatch(setCheckoutAmount(checkoutAmount));
  }, [
    dispatch,
    cartItems,
    checkoutAmount,
    useDefaultAddress,
    address,
    paymentMethod,
    user,
  ]);

  // setinvoice number here
  const handleOrder = () => {
    if (prescriptionRequired) {
      toast.error(
        "This order will process after checking your latest prescription !"
      );
      setTimeout(() => {}, 3000);
    }
    setIsProcessing(true); // Disable the button when the order process starts

    if (paymentMethod === "payonline") {
      router.push("/checkout/payment");
    } else {
      router.push("/checkout/confirmation");
    }
  };

  return (
    <div className="container mx-auto my-12 px-6">
      <Toaster />
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-8">
          <div className="border p-4 rounded-md mb-4">
            <h2 className="font-bold text-xl mb-4">Shipping Information</h2>
            {error && <p className="text-red-500 mb-4">{error as any}</p>}
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
                  className="w-full bg-slate-300"
                  onChange={(e) => {
                    const selectedFee = deliveryFees.find(
                      (fee) => fee.division === e.target.value
                    );
                    const newDeliveryFee = selectedFee ? selectedFee.fee : 0;
                    setCurrentDeliveryFee(newDeliveryFee);

                    // Dispatch to update the checkout amount in Redux
                    dispatch(
                      updateCheckoutAmount({ deliveryFee: newDeliveryFee })
                    );
                  }}
                >
                  <option value="" disabled selected>
                    Select a division
                  </option>
                  {deliveryFees.map((fee) => (
                    <option key={fee.division} value={fee.division}>
                      {fee.division} (Tk. {fee.fee})
                    </option>
                  ))}
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
                disabled={
                  isProcessing ||
                  (useDefaultAddress ? !user?.address : !address)
                } // Disable when processing or missing address
              >
                {isProcessing ? "Processing..." : "Place Order"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
