"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { serverUrl } from "../../../../../api";

interface User {
  name: string;
  email: string;
  phone: string;
  address: string;
  prescription?: string;
  orders: {
    orderId: string;
    date: string;
    total: number;
    status: string;
    items: {
      id: number;
      name: string;
      quantity: number;
      price: number;
    }[];
  }[];
}

const UserProfile = ({ userId }: { userId: string }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${serverUrl}/api/users/${userId}`);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [userId]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">User Profile</h2>
      <div className="mb-4">
        <h3 className="text-xl font-semibold">Personal Information</h3>
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
