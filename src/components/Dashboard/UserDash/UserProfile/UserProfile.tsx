"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { serverUrl } from "../../../../../api";
import toast from "react-hot-toast";

type OrderItem = {
  productId: string;
  name: string;
  quantity: number;
  price: number;
};

type Order = {
  _id: string;
  products: OrderItem[];
  total: number;
  status: string;
  created_at: string;
};

type User = {
  _id: string;
  uid: string;
  name: string;
  email: string;
  photoURL: string;
  phone: string;
  address: string;
  prescription?: string;
  orders: Order[];
};

const UserProfile = ({ userId }: { userId: string }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    const fetchUserIdByUid = async () => {
      try {
        const response = await axios.get(`${serverUrl}/api/users/uid/${userId}`);
        const userMongoId = response?.data?.id; // Ensure to use "id" here
        if (userMongoId) {
          fetchUser(userMongoId);
          sessionStorage.setItem("mongoUserId", userMongoId);
        }
      } catch (error) {
        console.error("Error fetching user id:", error);
      }
    };

    const fetchUser = async (id: string) => {
      try {
        const response = await axios.get(`${serverUrl}/api/users/${id}`);
        const userData = response.data;
        setUser(userData);
        setPhone(userData.phone);
        setAddress(userData.address);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUserIdByUid();
  }, [userId]);

  const handleUpdateUserDetails = async () => {
    if (user) {
      try {
        const response = await axios.patch(`${serverUrl}/api/users/${user._id}`, {
          phone,
          address,
        });
        setUser(response.data);
        setIsEditing(false);
        toast.success("User updated successfully!");
      } catch (error) {
        console.error("Error updating user:", error);
        toast.error("Error updating user.");
      }
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">User Profile</h2>
      <div className="mb-4">
        <h3 className="text-xl font-semibold">Personal Information</h3>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <div>
          <label>
            <strong>Phone:</strong>
            {isEditing ? (
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="ml-2 border rounded px-2"
              />
            ) : (
              <span> {user.phone}</span>
            )}
          </label>
        </div>
        <div>
          <label>
            <strong>Address:</strong>
            {isEditing ? (
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="ml-2 border rounded px-2"
              />
            ) : (
              <span> {user.address}</span>
            )}
          </label>
        </div>
        {user.prescription && (
          <p><strong>Prescription:</strong> {user.prescription}</p>
        )}
      </div>
      <div>
        <h3 className="text-xl font-semibold">Orders</h3>
        {user.orders.length > 0 ? (
          user.orders.map((order) => (
            <div key={order._id} className="mb-4 p-4 border rounded">
              <p><strong>Order ID:</strong> {order._id}</p>
              <p><strong>Date:</strong> {new Date(order.created_at).toLocaleDateString()}</p>
              <p><strong>Total:</strong> Tk. {order.total}</p>
              <p><strong>Status:</strong> {order.status}</p>
              <div>
                <h4 className="font-semibold">Items:</h4>
                <ul>
                  {order.products.map((item, index) => (
                    <li key={index}>
                      {item.name} - {item.quantity} x Tk. {item.price}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))
        ) : (
          <p>No orders found.</p>
        )}
      </div>
      {isEditing ? (
        <button
          onClick={handleUpdateUserDetails}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Save
        </button>
      ) : (
        <button
          onClick={() => setIsEditing(true)}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Edit
        </button>
      )}
    </div>
  );
};

export default UserProfile;
