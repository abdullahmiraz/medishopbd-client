"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

interface OrderItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  orderId: string;
  date: string;
  total: number;
  status: string;
  items: OrderItem[];
}

const OrderHistory: React.FC = () => {
  const [orderHistory, setOrderHistory] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const response = await axios.get("http://localhost:3002/users/1");
        setOrderHistory(response.data.orders); // Assuming user ID is 1
      } catch (error) {
        console.error("Error fetching order history:", error);
      }
    };

    fetchOrderHistory();
  }, []);

  return (
    <div>
      <h1>Order History</h1>
      {orderHistory.length > 0 ? (
        orderHistory.map((order) => (
          <div key={order.orderId}>
            <p>Order ID: {order.orderId}</p>
            <p>Date: {order.date}</p>
            <p>Total: ${order.total}</p>
            <p>Status: {order.status}</p>
            <h3>Items:</h3>
            <ul>
              {order.items.map((item) => (
                <li key={item.id}>
                  {item.name} - Quantity: {item.quantity} - Price: ${item.price}
                </li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};

export default OrderHistory;
