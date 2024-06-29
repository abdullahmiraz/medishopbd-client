// UserProfile.tsx

"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { serverUrl } from "../../../../../api";
import OrderHistory from "../OrderHistory/OrderHistory";
import Link from "next/link";
import { FaArrowRight, FaImage } from "react-icons/fa";

export type User = {
  _id: string;
  uid: string;
  name: string;
  email: string;
  photoURL: string;
  phone: string;
  address: string;
  prescription?: string;
};

const mongoUserId = sessionStorage.getItem("mongoUserId");

const UserProfile = ({ userId }: { userId: string }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${serverUrl}/api/users/${mongoUserId}`
        );
        const userData = response.data;
        setUser(userData);
        setName(userData.name);
        setEmail(userData.email);
        setPhone(userData.phone);
        setAddress(userData.address);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [userId]);

  const handleUpdateUserDetails = async () => {
    try {
      const response = await axios.patch(
        `${serverUrl}/api/users/${user?._id}`,
        { name, email, phone, address }
      );
      setUser(response.data);
      setIsEditing(false);
      toast.success("User updated successfully!");
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Error updating user.");
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold ml-4 mb-4">User Profile</h2>
      <div className="flex items-start gap-8 m-4">
        <div className="mb-4">
          <h3 className="text-xl font-semibold">Personal Information</h3>
          <div>
            <label>
              <strong>Name:</strong>
              {isEditing ? (
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="ml-2 border rounded px-2"
                />
              ) : (
                <span> {user.name}</span>
              )}
            </label>
          </div>
          <div>
            <label>
              <strong>Email:</strong>
              {isEditing ? (
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="ml-2 border rounded px-2"
                />
              ) : (
                <span> {user.email}</span>
              )}
            </label>
          </div>
          <div>
            <label>
              <strong>Phone:</strong>
              {isEditing ? (
                <input
                  type="text"
                  value={phone}
                  disabled
                  onChange={(e) => setPhone(e.target.value)}
                  className="ml-2 border rounded px-2"
                />
              ) : (
                <span> {user.phone}</span>
              )}
            </label>
          </div>
          <div>
            <label>
              <strong>Address:</strong>
              {isEditing ? (
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="ml-2 border rounded px-2"
                />
              ) : (
                <span> {user.address}</span>
              )}
            </label>
          </div>
          {user.prescription && (
            <div className="flex items-center gap-2">
              <strong>Prescription:</strong>
              <Link
                className="flex items-center gap-2 bg-blue-500 px-4 py-2 text-white rounded-md"
                href={user.prescription}
                target="_blank"
              >
                View <FaArrowRight />
              </Link>
            </div>
          )}
        </div>
        {isEditing ? (
          <button
            onClick={handleUpdateUserDetails}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Edit
          </button>
        )}
      </div>
      <OrderHistory userId={mongoUserId} />
    </div>
  );
};

export default UserProfile;
