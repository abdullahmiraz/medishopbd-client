"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { serverUrl } from "../../../api";
import { User } from "../../components/Dashboard/UserDash/UserProfile/UserProfile";

const Checkout = () => {
  const [user, setUser] = useState<User | null>(null);
  const [cartItems, setCartItems] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cashOnDelivery");
  const [error, setError] = useState("");
  // const [isFormValid, setIsFormValid] = useState(false);
  const [useDefaultAddress, setUseDefaultAddress] = useState(true);
  const router = useRouter();

  const mongoUserId = sessionStorage.getItem("mongoUserId");
  const checkoutAmount = JSON.parse(localStorage.getItem("checkoutAmount"));
  console.log(checkoutAmount);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("medicine_cart")) || [];
    setCartItems(savedCart);

    console.log(address);
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${serverUrl}/api/users/${mongoUserId}`
        );
        const userData = response.data;
        console.log(userData);
        setUser(userData);
        setName(userData.name);
        setPhone(userData.phone);
        setAddress(userData.address);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);



  const handleOrder = async () => {
    const orderDetails = {
      cartItems,
      name,
      phone,
      address,
      paymentMethod,
      checkoutAmount,
    };

    // Fetch each product by its ID and update its available stock
    try {
      for (const item of cartItems) {
        const productResponse = await axios.get(`${serverUrl}/api/products/${item.productId}`);
        const product = productResponse.data;

        // Calculate the new available stock
        const newStock = product.availableStock - item.stripCount;
        if (newStock < 0) {
          throw new Error(`Insufficient stock for ${product.productName}`);
        }

        // Update the product's available stock
        await axios.put(`${serverUrl}/api/products/${item.productId}`, {
          availableStock: newStock,
        });
      }

      // If all stock updates are successful, save the order details
      localStorage.setItem("order_details", JSON.stringify(orderDetails));
      router.push("/checkout/confirmation");
    } catch (error) {
      console.error("Error updating stock:", error);
      setError(`Error updating stock: ${error.message}`);
    }
  };


  if (cartItems.length === 0) {
    return <p className="text-center my-12">Your cart is empty.</p>;
  }

  return (
    <div className="container mx-auto my-12 px-6">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-8">
          <div className="border p-4 rounded-md mb-4">
            <h2 className="font-bold text-xl mb-4">Shipping Information</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div className="mb-4">
              <label className="block mb-2">Name</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={name}
                defaultValue={name}
                disabled
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Phone</label>
              <input
                type="number"
                className="w-full p-2 border rounded"
                value={phone}
                defaultValue={phone}
                disabled
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Address</label>
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
                defaultValue={address}
                disabled={useDefaultAddress}
                onChange={(e) => setAddress(e.target.value)}
                required
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
              <span>Tk. 60.00</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Discount</span>
              <span>- {checkoutAmount?.discountedAmount}</span>
            </div>
            <div className="border-t pt-2 mt-2 flex justify-between">
              <span>Total</span>
              <span className="font-bold">{checkoutAmount?.total}</span>
            </div>
            <div className="flex justify-between mt-4">
              <Link href={"/cart"}>
                <button className="px-4 py-2 bg-blue-500 text-white rounded">
                  Back to Cart
                </button>
              </Link>
              <Link href={`../checkout/confirmation`}>
                <button
                  className="px-4 py-2 bg-green-500 text-white rounded"
                  onClick={handleOrder}
                  disabled={address?.length < 0}
                >
                  Place Order
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;