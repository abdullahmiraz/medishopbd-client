"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { serverUrl } from "../../../../api";

const DeliveryFeeHandle = () => {
  const [deliveryFees, setDeliveryFees] = useState([]);
  const [newDivision, setNewDivision] = useState("");
  const [newFee, setNewFee] = useState("");
  const [editMode, setEditMode] = useState(false); // New state for edit mode
  const [editDivision, setEditDivision] = useState(""); // New state for current division being edited

  const fetchDeliveryFees = async () => {
    try {
      const { data } = await axios.get(`${serverUrl}/api/deliveryFees/all`);
      setDeliveryFees(data);
    } catch (error) {
      toast.error("Error fetching delivery fees");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDeliveryFees();
  }, []);

  const handleAddOrUpdateFee = async () => {
    try {
      if (!newDivision || !newFee) {
        toast.error("Please fill out both fields");
        return;
      }

      if (editMode) {
        // Update existing fee
        const { data } = await axios.post(
          `${serverUrl}/api/deliveryFees/createOrUpdate`,
          {
            division: newDivision,
            fee: Number(newFee),
          }
        );

        setDeliveryFees((prevFees) =>
          prevFees.map((fee) => (fee.division === editDivision ? data : fee))
        );
        setEditMode(false); // Exit edit mode
      } else {
        // Add new fee
        const { data } = await axios.post(
          `${serverUrl}/api/deliveryFees/createOrUpdate`,
          {
            division: newDivision,
            fee: Number(newFee),
          }
        );

        setDeliveryFees((prevFees) => [...prevFees, data]);
      }

      setNewDivision(""); // Clear the input field
      setNewFee(""); // Clear the input field
      toast.success(
        editMode
          ? "Delivery fee updated successfully"
          : "Delivery fee added successfully"
      );
    } catch (error) {
      toast.error("Error processing delivery fee");
      console.error(error);
    }
  };

  const handleEditClick = (fee) => {
    setNewDivision(fee.division);
    setNewFee(fee.fee);
    setEditMode(true); // Set edit mode to true
    setEditDivision(fee.division); // Set the division of the fee being edited
  };

  const handleDeleteFee = async (division) => {
    try {
      await axios.delete(`${serverUrl}/api/deliveryFees/delete`, {
        data: { division },
      });
      setDeliveryFees((prevFees) =>
        prevFees.filter((fee) => fee.division !== division)
      );
      toast.success("Delivery fee deleted successfully");
    } catch (error) {
      toast.error("Error deleting delivery fee");
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <Toaster />
      <h2 className="text-2xl font-bold mb-4">Manage Delivery Fees</h2>

      <div className="mb-6">
        <label className="block mb-2">Division</label>
        <input
          type="text"
          value={newDivision}
          onChange={(e) => setNewDivision(e.target.value)}
          className="border p-2 w-full"
          placeholder="Enter division"
        />

        <label className="block mt-4 mb-2">Fee</label>
        <input
          type="number"
          value={newFee}
          onChange={(e) => setNewFee(e.target.value)}
          className="border p-2 w-full"
          placeholder="Enter fee amount"
        />

        <button
          onClick={handleAddOrUpdateFee}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          {editMode ? "Update Fee" : "Add Fee"}
        </button>
      </div>

      <h3 className="text-xl font-semibold mb-2">Current Delivery Fees</h3>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">Division</th>
            <th className="border border-gray-300 px-4 py-2">Fee (Tk.)</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {deliveryFees.map((fee, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2">
                {fee.division}
              </td>
              <td className="border border-gray-300 px-4 py-2">{fee.fee}</td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  onClick={() => handleEditClick(fee)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteFee(fee.division)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DeliveryFeeHandle;
