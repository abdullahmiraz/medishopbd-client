"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { serverUrl } from "../../../../../api";

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

const userId = sessionStorage.getItem("mongoUserId");
const OrderHistory = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `${serverUrl}/api/users/orders/${userId}`
        );
        setOrders(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [userId]);

  return (
    <div className="m-4">
      <h2 className="text-2xl font-bold mb-4">Orders</h2>
      {orders.length > 0 ? (
        orders?.map((order) => (
          <div key={order._id} className="mb-4 p-4 border rounded">
            <p>
              <strong>Order ID:</strong> {order._id}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(order.created_at).toLocaleDateString()}
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
  );
};

export default OrderHistory;
