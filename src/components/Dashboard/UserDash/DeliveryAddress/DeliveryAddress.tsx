"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

interface User {
  id: number;
  address: string;
}

const DeliveryAddress: React.FC = () => {
  const [userAddress, setUserAddress] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserAddress = async () => {
      try {
        const response = await axios.get("http://localhost:3002/users/1");
        setUserAddress(response.data); // Assuming user ID is 1
      } catch (error) {
        console.error("Error fetching user address:", error);
      }
    };

    fetchUserAddress();
  }, []);

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
                value={userAddress.address}
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
