"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { serverUrl } from "../../../../api";
import { toast } from "react-hot-toast";

interface PromoCode {
  _id: string;
  code: string;
  discount: number;
  discountType: string;
  expiryDate: string;
  usageLimit: number;
  usageCount: number;
  disabled: boolean;
}

const AdminPromoCodes: React.FC = () => {
  const [promoCodes, setPromoCodes] = useState<PromoCode[]>([]);
  const [message, setMessage] = useState<string>("");
  const [newPromoCode, setNewPromoCode] = useState({
    code: "",
    discount: 0,
    discountType: "percentage",
    expiryDate: "",
    usageLimit: 1,
  });

  useEffect(() => {
    fetchAllPromoCodes();
  }, []);

  const fetchAllPromoCodes = async () => {
    try {
      const response = await axios.get<PromoCode[]>(
        `${serverUrl}/api/promocodes/all`
      );
      setPromoCodes(response.data);
    } catch (error) {
      toast.error("Error fetching promo codes");
    }
  };

  const handleDeletePromoCode = async (code: string) => {
    try {
      const response = await axios.delete<{ message: string }>(
        `${serverUrl}/api/promocodes/delete`,
        {
          data: { code },
        }
      );

      toast.success(response.data.message);
      fetchAllPromoCodes(); // Refresh promo codes list after deletion
    } catch (error) {
      toast.error("Error deleting promo code");
    }
  };

  const handleTogglePromoCodeStatus = async (code: string) => {
    try {
      const response = await axios.post(`${serverUrl}/api/promocodes/toggle`, {
        code,
      });

      toast.success(response.data.message);
      console.log(response.data.message);
      fetchAllPromoCodes(); // Refresh promo codes list after toggling status
    } catch (error) {
      toast.error("Error toggling promo code status");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setNewPromoCode({
      ...newPromoCode,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post<{ message: string }>(
        `${serverUrl}/api/promocodes/create`,
        newPromoCode
      );

      toast.success(response.data.message);
      fetchAllPromoCodes(); // Refresh promo codes list after creation
      setNewPromoCode({
        code: "",
        discount: 0,
        discountType: "percentage",
        expiryDate: "",
        usageLimit: 1,
      });
    } catch (error) {
      toast.error("Error creating promo code");
    }
  };

  return (
    <div className="container  my-12 px-6">
      <h1 className="text-2xl font-bold mb-4">Admin Promo Code Management</h1>

      {/* Form to create new promo code */}
      <div className="mt-8">
        <h2 className="font-bold text-xl mb-4">Create New Promo Code</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label
                htmlFor="code"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Promo Code
              </label>
              <input
                type="text"
                id="code"
                name="code"
                value={newPromoCode.code}
                onChange={handleChange}
                placeholder="Enter Promo Code"
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                required
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="discount"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Discount
              </label>
              <input
                type="number"
                id="discount"
                name="discount"
                value={newPromoCode.discount}
                onChange={handleChange}
                placeholder="Enter Discount Amount"
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                min="0"
                step="0.01"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label
                htmlFor="discountType"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Discount Type
              </label>
              <select
                id="discountType"
                name="discountType"
                value={newPromoCode.discountType}
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                required
              >
                <option value="percentage">Percentage</option>
                <option value="fixed">Fixed</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="expiryDate"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Expiry Date
              </label>
              <input
                type="date"
                id="expiryDate"
                name="expiryDate"
                value={newPromoCode.expiryDate}
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label
                htmlFor="usageLimit"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Usage Limit
              </label>
              <input
                type="number"
                id="usageLimit"
                name="usageLimit"
                value={newPromoCode.usageLimit}
                onChange={handleChange}
                placeholder="Enter Usage Limit"
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                min="1"
                required
              />
            </div>
            <div className="flex items-end">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md text-sm"
              >
                Create Promo Code
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Display all promo codes in a table */}
      <div className="mt-8">
        <h2 className="font-bold text-xl mb-4">All Promo Codes</h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Code
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Discount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Discount Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Expiry Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Usage Limit
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Used
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Disabled
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {promoCodes.map((code) => (
              <tr key={code._id}>
                <td className="px-6 py-4 whitespace-nowrap">{code.code}</td>
                <td className="px-6 py-4 whitespace-nowrap">{code.discount}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {code.discountType}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(code.expiryDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {code.usageLimit}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {code.usageCount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {code.disabled ? "Yes" : "No"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {/* button to delete a promo code  */}
                  {/* <button
                    onClick={() => handleDeletePromoCode(code.code)}
                    className="text-sm font-medium text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button> */}
                  <button
                    onClick={() => handleTogglePromoCodeStatus(code.code)}
                    className={`text-sm font-medium ml-4 ${
                      code.disabled
                        ? "text-green-600 hover:text-green-900"
                        : "text-red-600 hover:text-red-900"
                    }`}
                  >
                    {code.disabled ? "Enable" : "Disable"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {message && <p className="mt-4">{message}</p>}
    </div>
  );
};

export default AdminPromoCodes;
