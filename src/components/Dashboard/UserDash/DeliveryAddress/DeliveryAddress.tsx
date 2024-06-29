"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { serverUrl } from "../../../../../api";

interface User {
  id: number;
  address: string;
}

const DeliveryAddress: React.FC = () => {
  const mongoUserId = sessionStorage.getItem("mongoUserId");
  const [userAddress, setUserAddress] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserAddress = async () => {
      try {
        const response = await axios.get(
          `${serverUrl}/api/users/${mongoUserId}`
        );
        setUserAddress(response?.data); // Assuming user ID is 1
        console.log(response?.data);
      } catch (error) {
        console.error("Error fetching user address:", error);
      }
    };

    fetchUserAddress();
  }, []);
  console.log(userAddress?.address);

  return (
    <div className="p-6 m-4 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Delivery Address</h1>
      {userAddress ? (
        <div>
          <form>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Address</span>
              </label>
              <input
                type="text"
                defaultValue={userAddress.address}
                className="input input-bordered"
                readOnly
              />
            </div>
          </form>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default DeliveryAddress;
