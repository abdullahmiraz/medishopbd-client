"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  prescription: string;
}

const UserProfile: React.FC = () => {
  const [userProfile, setUserProfile] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get("http://localhost:3002/users/1"); // Assuming user with ID 1
        setUserProfile(response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <div className="container  px-6  m-4 p-4">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>
      {userProfile ? (
        <div className="flex">
          <div className="w-1/3  rounded shadow border">
            <div className="flex items-center justify-center mb-4">
              <img
                src={
                  //   `${userProfile?.image}` ||
                  `https://placehold.co/600x600?text=User`
                }
                alt="User"
                className="w-24 h-24 rounded-full border-2 border-gray-300"
              />
            </div>
            <div className="bg-white p-4 rounded shadow">
              <h2 className="text-xl font-bold mb-2">Personal Information</h2>
              <p className="mb-2">
                <span className="font-semibold">Name:</span> {userProfile.name}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Email:</span>{" "}
                {userProfile.email}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Phone:</span>{" "}
                {userProfile.phone}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Address:</span>{" "}
                {userProfile.address}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Prescription:</span>{" "}
                {userProfile.prescription ? null : "Prescription Not Uploaded"}
              </p>
            </div>
          </div>
          <div className="w-2/3 ml-6">
            <DeliveryAddress address={userProfile?.address} />
            <OrderHistory orders={userProfile?.orders} />
          </div>
        </div>
      ) : (
        <p className="text-center">Loading...</p>
      )}
    </div>
  );
};

const DeliveryAddress: React.FC<{ address: string }> = ({ address }) => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Delivery Address</h2>
      <form className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-right font-semibold">Current Address:</label>
          <div className="w-2/3">
            <p>{address}</p>
          </div>
        </div>
      </form>
    </div>
  );
};

const OrderHistory: React.FC<{ orders: any[] }> = ({ orders }) => {
  return (
    <div className="bg-white p-4 rounded shadow  mt-6 ">
      <h2 className="text-xl font-bold mb-4">Order History</h2>
      <div className="table bordered table-sm table-zebra">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Date</th>
            <th>Total</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.orderId}>
              <td>{order.orderId}</td>
              <td>{order.date}</td>
              <td>{order.total}</td>
              <td>{order.status}</td>
            </tr>
          ))}
        </tbody>
      </div>
    </div>
  );
};

export default UserProfile;
