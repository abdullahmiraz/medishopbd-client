"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { baseUrl, serverUrl } from "../../../../../api";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editedUser, setEditedUser] = useState({});

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${serverUrl}/api/users`);
        setUsers(res.data);
        console.log(res.data);
      } catch (error) {
        console.error("Error fetching users", error);
      }
    };

    fetchUsers();
  }, []);

  const handleEditClick = (user) => {
    setEditingUserId(user._id);
    setEditedUser({ ...user });
  };

  const handleSaveClick = async (userId) => {
    try {
      await axios.put(`${serverUrl}/api/users/${userId}`, editedUser);
      setUsers(users.map((user) => (user._id === userId ? editedUser : user)));
      setEditingUserId(null);
      setEditedUser({});
    } catch (error) {
      console.error("Error updating user", error);
    }
  };

  const handleDeleteClick = async (userId) => {
    try {
      await axios.delete(`${serverUrl}/api/users/${userId}`);
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      console.error("Error deleting user", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
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
              <tr key={user?._id}>
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
                    <>
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => handleEditClick(user)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm ml-2"
                        onClick={() => handleDeleteClick(user._id)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
                <td>
                  {editingUserId === user._id ? (
                    <input
                      type="text"
                      name="name"
                      value={editedUser.name || ""}
                      onChange={handleChange}
                      className="input input-sm input-bordered"
                    />
                  ) : (
                    user?.name
                  )}
                </td>
                <td>
                  {editingUserId === user._id ? (
                    <input
                      type="email"
                      name="email"
                      value={editedUser.email || ""}
                      onChange={handleChange}
                      className="input input-sm input-bordered"
                    />
                  ) : (
                    user?.email
                  )}
                </td>
                <td>
                  {editingUserId === user._id ? (
                    <select
                      name="role"
                      value={editedUser.role || ""}
                      onChange={handleChange}
                      className="select select-sm select-bordered"
                    >
                      <option value="admin">Admin</option>
                      <option value="user">User</option>
                    </select>
                  ) : (
                    user?.role
                  )}
                </td>
                <td>
                  {editingUserId === user._id ? (
                    <input
                      type="text"
                      name="phone"
                      value={editedUser.phone || ""}
                      onChange={handleChange}
                      className="input input-sm input-bordered"
                    />
                  ) : (
                    user?.phone
                  )}
                </td>
                <td>
                  {editingUserId === user._id ? (
                    <input
                      type="text"
                      name="address"
                      value={editedUser.address || ""}
                      onChange={handleChange}
                      className="input input-sm input-bordered"
                    />
                  ) : (
                    user?.address
                  )}
                </td>
                <td>
                  {editingUserId === user._id ? (
                    <select
                      name="prescription"
                      value={editedUser.prescription || false}
                      onChange={handleChange}
                      className="select select-sm select-bordered"
                    >
                      <option value={true}>True</option>
                      <option value={false}>False</option>
                    </select>
                  ) : (
                    user?.prescription ? "true" : "false"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UsersList;
