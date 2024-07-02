"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { serverUrl } from "../../../../../api";
import toast from "react-hot-toast";

// admin, manager route only
const AllOrdersList = () => {
  const [orders, setOrders] = useState();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${serverUrl}/api/orders`);
        setOrders(response?.data);
      } catch (error) {
        toast.error("error");
        console.log(error);
      }
    };

    fetchOrders();
  }, []);

  console.log(orders);
  return (
    <div>
      <div className="m-4">
        <h2 className="text-2xl font-bold mb-4">Orders</h2>
        {orders?.length > 0 ? (
          orders?.map((order) => (
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
