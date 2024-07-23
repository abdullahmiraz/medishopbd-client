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
            onClick={() => {
              setStartDate("");
              setEndDate("");
              setFilteredOrders([]);
            }}
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
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 font-bold">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs  text-gray-500 uppercase tracking-wider"
                >
                  Order Number
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs  text-gray-500 uppercase tracking-wider"
                >
                  Date
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs  text-gray-500 uppercase tracking-wider"
                >
                  Profit
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs  text-gray-500 uppercase tracking-wider"
                >
                  Subtotal
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs  text-gray-500 uppercase tracking-wider"
                >
                  Discounted Amount
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs  text-gray-500 uppercase tracking-wider"
                >
                  Delivery Fee
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs  text-gray-500 uppercase tracking-wider"
                >
                  Total
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs  text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs  text-gray-500 uppercase tracking-wider"
                >
                  Items
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {order.orderNumber || order._id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.created_at.split("T")[0]}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Tk. {order.checkoutAmount?.totalProfit}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Tk. {order.checkoutAmount.subtotal}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Tk. {order.checkoutAmount.discountedAmount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Tk. {order.checkoutAmount.deliveryFee}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Tk. {order.checkoutAmount.total}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.status}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <ul>
                      {order.products.map((item, index) => (
                        <li key={index}>
                          {item?.productId?.productName} - {item.quantity} x Tk.{" "}
                          {item.price}
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
