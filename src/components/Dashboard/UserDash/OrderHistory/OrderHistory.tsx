"use client";

import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa"; // Import icons
import ReactToPrint from "react-to-print";
import { serverUrl } from "../../../../../api";

type OrderItem = {
  productId: { productName: string }; // Assuming the product has a name property
  quantity: number;
  price: number;
};

type Order = {
  _id: string;
  orderNumber?: string;
  products: OrderItem[];
  checkoutAmount: {
    subtotal: number;
    discountedAmount: number;
    deliveryFee: number;
    total: number;
    totalProfit?: number;
  };
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
          // Fetching specific user's order history
          response = await axios.get(`${serverUrl}/api/users/orders/${userId}`);
        } else {
          // Fetching all orders history
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
  }, [userId]);

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

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure to delete ? ")) {
      try {
        await axios.delete(`${serverUrl}/api/orders/${id}`);
        toast.success("Order deleted");
        setOrders(orders.filter((o) => o._id !== id)); // Update state
      } catch (error) {
        toast.error("Error deleting order");
      }
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      await axios.put(`${serverUrl}/api/orders/${id}`, { status: newStatus });
      toast.success("Order status updated");
      setOrders(
        orders.map((o) => (o._id === id ? { ...o, status: newStatus } : o))
      ); // Update state
    } catch (error) {
      toast.error("Error updating order status");
    }
  };

  const orderRef = useRef();

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

        <ReactToPrint
          trigger={() => (
            <button className="px-4 py-2 bg-blue-500 text-white rounded">
              Print Invoice
            </button>
          )}
          content={() => orderRef.current}
        />
      </div>

      {filteredOrders.length > 0 ? (
        <div ref={orderRef} className="overflow-auto ">
          <h2 className="print-only">Invoice</h2> {/* Title to be printed */}
          <table className=" divide-y divide-gray-200 order-history-table min-w-full table-xs table-zebra border">
            <thead className="bg-gray-200 font-bold text-left">
              <tr>
                <th className=" text-xs border ">Order Number</th>
                <th className=" text-xs  border">Date</th>
                <th className=" text-xs border ">Profit</th>
                <th className=" text-xs border ">Subtotal</th>
                <th className=" text-xs border ">Discnt</th>
                <th className=" text-xs border ">Del.Fee</th>
                <th className=" text-xs border ">Total</th>
                <th className=" text-xs border  hide-column">Status</th>
                <th className=" text-xs  hide-column">Items</th>
                <th className=" text-xs   hide-column">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order._id}>
                  <td className="py-2 border whitespace-nowrap text-sm font-medium text-gray-900">
                    {order.orderNumber || order._id}
                  </td>
                  <td className="py-2 border whitespace-nowrap text-sm ">
                    {order.created_at.split("T")[0]}
                  </td>
                  <td className="py-2 border whitespace-nowrap text-sm ">
                    Tk. {order.checkoutAmount?.totalProfit}
                  </td>
                  <td className="py-2 border whitespace-nowrap text-sm ">
                    Tk. {order.checkoutAmount.subtotal}
                  </td>
                  <td className="py-2 border whitespace-nowrap text-sm ">
                    Tk. {order.checkoutAmount.discountedAmount}
                  </td>
                  <td className="py-2 border whitespace-nowrap text-sm ">
                    Tk. {order.checkoutAmount.deliveryFee}
                  </td>
                  <td className="py-2 border whitespace-nowrap text-sm ">
                    Tk. {order.checkoutAmount.total}
                  </td>
                  <td className="py-2 border whitespace-nowrap text-sm  hide-column">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                      className="border border-gray-300 rounded-md px-2 py-1 text-sm"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </td>
                  <td className="py-2 border whitespace-nowrap text-sm  hide-column">
                    <ul>
                      {order.products.map((item, index) => (
                        <li key={index}>
                          {item?.productId?.productName} - {item.quantity} x Tk.{" "}
                          {item.price}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="py-2 border whitespace-nowrap text-sm  hide-column">
                    <button
                      onClick={() => handleDelete(order._id)}
                      className="text-red-600 hover:text-red-800 mr-2"
                    >
                      <FaTrash />
                    </button>
                    {/* You can add an edit icon or button here if needed */}
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
