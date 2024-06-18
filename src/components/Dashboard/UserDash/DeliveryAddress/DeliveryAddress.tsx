"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

interface User {
  id: number;
  address: string;
}

const DeliveryAddress: React.FC = () => {
  const [userAddresses, setUserAddresses] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserAddresses = async () => {
      try {
        const response = await axios.get("http://localhost:3002/users/1");
        setUserAddresses(response.data); // Assuming user ID is 1
      } catch (error) {
        console.error("Error fetching user addresses:", error);
      }
    };

    fetchUserAddresses();
  }, []);

  return (
    <div>
      <h1>Delivery Address</h1>
      {userAddresses ? (
        <div>
          <p>Address: {userAddresses.address}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default DeliveryAddress;
