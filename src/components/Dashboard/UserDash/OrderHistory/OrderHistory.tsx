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
    <div className="p-6  rounded-lg shadow-md m-4">
      <h1 className="text-2xl font-bold mb-4">Order History</h1>
      {orderHistory.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table table-xs table-zebra">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Total</th>
                <th>Status</th>
                <th>Items</th>
              </tr>
            </thead>
            <tbody>
              {orderHistory.map((order) => (
                <tr key={order.orderId}>
                  <td>{order.orderId}</td>
                  <td>{order.date}</td>
                  <td>${order.total}</td>
                  <td>{order.status}</td>
                  <td>
                    <ul>
                      {order.items.map((item) => (
                        <li key={item.id}>
                          {item.name} - {item.quantity} x ${item.price}
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};

export default OrderHistory;
