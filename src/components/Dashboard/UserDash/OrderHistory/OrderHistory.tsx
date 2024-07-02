"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
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

interface OrderHistoryProps {
  userId?: string; // Make userId optional
}

const OrderHistory: React.FC<OrderHistoryProps> = ({ userId }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        let response;
        if (userId) {
          // fetching specific users order history
          response = await axios.get(`${serverUrl}/api/users/orders/${userId}`);
        } else {
          // fetching all orders history
          response = await axios.get(`${serverUrl}/api/orders`);
        }
        setOrders(response?.data);
        setFilteredOrders(response?.data);
      } catch (error) {
        toast.error("Error fetching orders");
        console.log(error);
      }
    };

    fetchOrders();
  }, [userId]); // Added userId as a dependency

  useEffect(() => {
    const applyFilters = () => {
      let filtered = orders;

      if (startDate && endDate) {
        filtered = orders.filter((order) => {
          const orderDate = new Date(order.created_at);
          return (
            orderDate >= new Date(startDate) && orderDate <= new Date(endDate)
          );
        });
      }

      if (sortOrder === "asc") {
        filtered = filtered.sort(
          (a, b) =>
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );
      } else {
        filtered = filtered.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      }

      setFilteredOrders(filtered);
    };

    applyFilters();
  }, [startDate, endDate, sortOrder, orders]);

  return (
    <div className="m-4">
      <h2 className="text-2xl font-bold mb-4">Order History</h2>
      <div className="mb-4 flex flex-col md:flex-row gap-4">
        {/* Date Range Filter */}
        <div className="flex gap-4">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm"
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm"
          />
          <button
            onClick={() =>
              setStartDate("") && setEndDate("") && setFilteredOrders(orders)
            }
            className="px-4 py-2 bg-gray-500 text-white rounded text-sm"
          >
            Clear Filter
          </button>
        </div>

        {/* Sort Orders */}
        <div className="flex gap-4">
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm"
          >
            <option value="desc">Sort by Date (Descending)</option>
            <option value="asc">Sort by Date (Ascending)</option>
          </select>
        </div>
      </div>
      {filteredOrders.length > 0 ? (
        filteredOrders.map((order) => (
          <div key={order._id} className="mb-4 p-4 border rounded">
            <p>
              <strong>Order ID: </strong> {order._id}
            </p>
            <p>
              <strong>Date: </strong>
              {order?.created_at.split("T")[0]}
            </p>
            <p>
              <strong>Subtotal: </strong> Tk. {order.checkoutAmount.subtotal}
            </p>
            <p>
              <strong>Discounted Amount: </strong> Tk.{" "}
              {order.checkoutAmount.discountedAmount}
            </p>
            <p>
              <strong>Delivery Fee: </strong> Tk.{" "}
              {order.checkoutAmount.deliveryFee}
            </p>
            <p>
              <strong>Total: </strong> Tk. {order.checkoutAmount.total}
            </p>
            <p>
              <strong>Status: </strong> {order.status}
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
