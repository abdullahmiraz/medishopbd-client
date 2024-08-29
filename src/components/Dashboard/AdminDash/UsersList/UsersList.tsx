"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { serverUrl } from "../../../../../api";
import { FaEdit, FaTrash } from "react-icons/fa";

interface User {
  _id: string;
  name: string;
  email: string;
  role: "Admin" | "Manager" | "Customer";
  phone: string;
  address: string;
  prescription: string;
}

const userId = localStorage.getItem("userId");

const UsersList = (): JSX.Element => {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [editedRole, setEditedRole] = useState<string>("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get<User[]>(`${serverUrl}/api/users`);
        setUsers(res.data);
        console.log(res.data);
      } catch (error) {
        console.error("Error fetching users", error);
      }
    };

    fetchUsers();
  }, []);

  const handleEditClick = (user: User) => {
    setEditingUserId(user._id);
    setEditedRole(user.role || "User");
  };

  const handleSaveClick = async (userId: string) => {
    console.log("Saving role:", editedRole, "for user id:", userId);
    try {
      await axios.patch(`${serverUrl}/api/users/${userId}`, {
        role: editedRole,
      });
      setUsers((prevUsers): any =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, role: editedRole } : user
        )
      );
      setEditingUserId(null);
      setEditedRole("");
      window.location.reload();
    } catch (error) {
      console.error("Error updating user role", error);
    }
  };

  const handleDeleteClick = async (userId: string) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (isConfirmed) {
      try {
        const response = await axios.delete(`${serverUrl}/api/users/${userId}`);
        setUsers((prevUsers) =>
          prevUsers.filter((user) => user._id !== userId)
        );
        console.log(response.data);
      } catch (error) {
        console.error("Error deleting user", error);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEditedRole(e.target.value);
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Users List</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full text-left border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">Actions</th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Role</th>
              <th className="border border-gray-300 px-4 py-2">Phone</th>
              <th className="border border-gray-300 px-4 py-2">Address</th>
              <th className="border border-gray-300 px-4 py-2">
                Prescription?
              </th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr
                key={user._id}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="border border-gray-300 px-4 py-2">
                  {editingUserId === user._id ? (
                    <>
                      <button
                        className="bg-blue-500 text-white px-3 py-1 rounded-md mr-2"
                        onClick={() => handleSaveClick(user._id)}
                      >
                        Save
                      </button>
                      <button
                        className="bg-gray-300 text-gray-700 px-3 py-1 rounded-md"
                        onClick={() => setEditingUserId(null)}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <div className="flex item-center gap-4">
                      <button
                        className="text-blue-500"
                        onClick={() => handleEditClick(user)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="text-red-500"
                        onClick={() => handleDeleteClick(user._id)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  )}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.email}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {editingUserId === user._id ? (
                    <select
                      name="role"
                      value={editedRole}
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                    >
                      <option value="Admin">Admin</option>
                      <option value="Manager">Manager</option>
                      <option value="Customer">Customer</option>
                    </select>
                  ) : (
                    user.role
                  )}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.phone}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.address}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.prescription ? "true" : "false"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersList;
