"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { serverUrl } from "../../../../../api";
import Image from "next/image";

type OrderItem = {
  id: number;
  name: string;
  quantity: number;
  price: number;
};

type Order = {
  orderId: string;
  date: string;
  total: number;
  status: string;
  items: OrderItem[];
};

type User = {
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

  useEffect(() => {
    const fetchUserIdByUid = async () => {
      try {
        const response = await axios.get(
          `${serverUrl}/api/users/uid/${userId}`
        );
        return response.data.id;
      } catch (error) {
        console.error("Error fetching user id:", error);
        return null;
      }
    };

    const fetchUser = async (id: string) => {
      try {
        const response = await axios.get(`${serverUrl}/api/users/${id}`);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    const getUserData = async () => {
      const id = await fetchUserIdByUid();
      console.log(id);
      if (id) {
        fetchUser(id);
      }
    };

    getUserData();
  }, [userId]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">User Profile</h2>
      <div className="mb-4">
        <h3 className="text-xl font-semibold">Personal Information</h3>
        <Image
          src={`${user.photoURL}`}
          alt={`${user.name}`}
          height={100}
          width={100}
          objectFit="cover"
          className="rounded-full"
        />
        <p>
          <strong>Name:</strong> {user.name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Phone:</strong> {user.phone}
        </p>
        <p>
          <strong>Address:</strong> {user.address}
        </p>
        {user.prescription && (
          <p>
            <strong>Prescription:</strong> {user.prescription}
          </p>
        )}
      </div>
      <div>
        <h3 className="text-xl font-semibold">Orders</h3>
        {user.orders.length > 0 ? (
          user.orders.map((order) => (
            <div key={order.orderId} className="mb-4 p-4 border rounded">
              <p>
                <strong>Order ID:</strong> {order.orderId}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(order.date).toLocaleDateString()}
              </p>
              <p>
                <strong>Total:</strong> Tk. {order.total}
              </p>
              <p>
                <strong>Status:</strong> {order.status}
              </p>
              <div>
                <h4 className="font-semibold">Items:</h4>
                <ul>
                  {order.items.map((item) => (
                    <li key={item.id}>
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
    </div>
  );
};

export default UserProfile;
