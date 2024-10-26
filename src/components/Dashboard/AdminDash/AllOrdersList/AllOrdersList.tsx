"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { serverUrl } from "../../../../../api";
import toast from "react-hot-toast";

// admin, manager route only
const AllOrdersList = () => {
  const [orders, setOrders] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${serverUrl}/api/orders`);
        setOrders(response?.data);
      } catch (error) {
        toast.error("Error fetching orders");
        console.log(error);
      }
    };

    fetchOrders();
  }, []);

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  const filteredAndSortedOrders = () => {
    let filteredOrders = orders as { created_at: string }[];

    if (startDate && endDate) {
      filteredOrders = orders.filter((order) => {
        const orderDate = new Date(order.created_at.split("T")[0]);
        return orderDate >= new Date(startDate) && orderDate <= new Date(endDate);
      });
    }

    if (sortOrder === "oldest") {
      filteredOrders.sort(
        (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      );
    } else if (sortOrder === "newest") {
      filteredOrders.sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    }

    return filteredOrders;
  };

  return (
    <div>
      <div className="m-4">
        <h2 className="text-2xl font-bold mb-4">Orders</h2>
        <div className="mb-4 flex flex-col gap-4">
          <div className="flex gap-4">
            <div className="flex flex-col">
              <label className="text-sm font-semibold mb-2">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 text-sm"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-semibold mb-2">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 text-sm"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => {
                setStartDate("");
                setEndDate("");
              }}
              className="self-end px-4 py-2 bg-gray-500 text-white rounded text-sm"
            >
              Reset Dates
            </button>
            <div className="flex flex-col">
              <label className="text-sm font-semibold mb-2">Sort By</label>
              <select
                value={sortOrder}
                onChange={handleSortChange}
                className="border border-gray-300 rounded px-3 py-2 text-sm"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </select>
            </div>
          </div>
        </div>
        {filteredAndSortedOrders().length > 0 ? (
          filteredAndSortedOrders().map((order: any) => (
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
                <strong>Discounted Amount: </strong> Tk. {order.checkoutAmount.discountedAmount}
              </p>
              <p>
                <strong>Delivery Fee: </strong> Tk. {order.checkoutAmount.deliveryFee}
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
    </div>
  );
};

export default AllOrdersList;
