"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { serverUrl } from "../../../../../api";
import { FaEdit, FaTrash } from "react-icons/fa";

interface User {
  _id: string;
  name: string;
  email: string;
  role: "Admin" | "Manager" | "User";
  phone: string;
  address: string;
  prescription: string;
}

const mongoUserId = sessionStorage.getItem("mongoUserId");

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
    try {
      await axios.put(`${serverUrl}/api/users/${userId}`, { role: editedRole });
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, role: editedRole } : user
        )
      );
      setEditingUserId(null);
      setEditedRole("");
    } catch (error) {
      console.error("Error updating user role", error);
    }
  };

  const handleDeleteClick = async (userId: string) => {
    if (userId == mongoUserId) {
      sessionStorage.clear();
      localStorage.clear();
    }
    try {
      const response = await axios.delete(`${serverUrl}/api/users/${userId}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
      console.log(response.data);
    } catch (error) {
      console.error("Error deleting user", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEditedRole(e.target.value);
  };

  return (
    <>
      <div className="w-48 mx-auto">
        <h2 className="font-extrabold text-2xl text-center mx-auto my-4 border-b-4 border-b-green-400">
          Users List
        </h2>
      </div>
      <div className="overflow-x-auto m-4 border">
        <table className="table table-zebra table-xs">
          <thead>
            <tr>
              <th>Actions</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Prescription?</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr key={user._id}>
                <td>
                  {editingUserId === user._id ? (
                    <>
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => handleSaveClick(user._id)}
                      >
                        Save
                      </button>
                      <button
                        className="btn btn-secondary btn-sm ml-2"
                        onClick={() => setEditingUserId(null)}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        className="text-blue-500"
                        onClick={() => handleEditClick(user)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className=" text-red-500"
                        onClick={() => handleDeleteClick(user._id)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  )}
                </td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {editingUserId === user._id ? (
                    <select
                      name="role"
                      value={editedRole}
                      onChange={handleChange}
                      className="select select-sm select-bordered"
                    >
                      <option value="Admin">Admin</option>
                      <option value="Manager">Manager</option>
                      <option value="User">User</option>
                    </select>
                  ) : (
                    user.role
                  )}
                </td>
                <td>{user.phone}</td>
                <td>{user.address}</td>
                <td>{user.prescription ? "true" : "false"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UsersList;
