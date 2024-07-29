"use client";

import axios from "axios";
import { serverUrl } from "../../../../api";
import { useState, useEffect } from "react";

const PaymentList = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await axios.get(`${serverUrl}/api/payments`);
        setPayments(res.data);
        console.log(res.data);
      } catch (error) {
        console.error("Error fetching payments", error);
      }
    };

    fetchPayments();
  }, []);

  return (
    <div className="container">
      <h2 className="font-extrabold text-2xl m-4">Payment History</h2>
      <div className="overflow-x-auto m-4   shadow-md  bg-white">
        <table className="table-auto w-full text-left border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">Session Key</th>
              <th className="border border-gray-300 px-4 py-2">Order Number</th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Phone</th>
              <th className="border border-gray-300 px-4 py-2">Address</th>
              <th className="border border-gray-300 px-4 py-2">
                Payment Status
              </th>
              <th className="border border-gray-300 px-4 py-2">
                Transaction ID
              </th>
              <th className="border border-gray-300 px-4 py-2">Created At</th>
            </tr>
          </thead>
          <tbody>
            {payments?.map((payment) => (
              <tr
                key={payment._id}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="border border-gray-300 px-4 py-2">
                  {payment.sessionkey}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {payment.orderNumber}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {payment.name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {payment.phone}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {payment.address}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {payment.paymentStatus ? "Paid" : "Pending"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {payment.tranId}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {new Date(payment.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentList;
