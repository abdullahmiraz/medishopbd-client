"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { serverUrl } from "../../../../../api";
import OrderHistory from "../OrderHistory/OrderHistory";
import Link from "next/link";
import { FaArrowRight, FaImage } from "react-icons/fa";

type User = {
  _id: string;
  uid: string;
  name: string;
  email: string;
  photoURL: string;
  phone: string;
  address: string;
  prescription?: string;
};

const UserProfile = ({ userId }: { userId: string }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [phoneError, setPhoneError] = useState<string | null>(null); // State for phone validation error

  useEffect(() => {
    const fetchUserIdByUid = async () => {
      try {
        const response = await axios.get(
          `${serverUrl}/api/users/uid/${userId}`
        );
        const userMongoId = response?.data?.id;
        if (userMongoId) {
          fetchUser(userMongoId);
          sessionStorage.setItem("mongoUserId", userMongoId);
        }
      } catch (error) {
        console.error("Error fetching user id:", error);
      }
    };

    const fetchUser = async (id: string) => {
      try {
        const response = await axios.get(`${serverUrl}/api/users/${id}`);
        const userData = response.data;
        // sessionStorage.setItem("mongoUserRole", userData.role || "");
        // sessionStorage.setItem("mongoUserRole", JSON.stringify(userData));
        setUser(userData);
        setPhone(userData.phone);
        setAddress(userData.address);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUserIdByUid();
  }, [userId]);

  // Function to validate Bangladeshi phone number using regex
  const isValidBangladeshiPhoneNumber = (phoneNumber: string) => {
    const bdPhoneRegex = /^(?:\+?88)?01[3-9]\d{8}$/;
    return bdPhoneRegex.test(phoneNumber);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPhone(value);
    // Validate phone number on change
    if (!isValidBangladeshiPhoneNumber(value)) {
      setPhoneError("Please enter a valid Bangladeshi phone number");
    } else {
      setPhoneError(null);
    }
  };

  const handleUpdateUserDetails = async () => {
    if (user) {
      try {
        const response = await axios.patch(
          `${serverUrl}/api/users/${user._id}`,
          {
            phone,
            address,
          }
        );
        setUser(response.data);
        setIsEditing(false);
        toast.success("User updated successfully!");
      } catch (error) {
        console.error("Error updating user:", error);
        toast.error("Error updating user.");
      }
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold  ml-4 mb-4">User Profile</h2>
      <div className="flex items-start gap-8 m-4">
        <div className="mb-4">
          <h3 className="text-xl font-semibold">Personal Information</h3>
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <div>
            <label>
              <strong>Phone:</strong>
              {isEditing ? (
                <>
                  <input
                    type="text"
                    value={phone}
                    onChange={handlePhoneChange}
                    className="ml-2 border rounded px-2"
                  />
                  {phoneError && <p className="text-red-500">{phoneError}</p>}
                </>
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
                href={`${user.prescription}`}
                target="_blank"
              >
                Check <FaArrowRight />
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
      <OrderHistory userId={user._id} />
    </div>
  );
};

export default UserProfile;
