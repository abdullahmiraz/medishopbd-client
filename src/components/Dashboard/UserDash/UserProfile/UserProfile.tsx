"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { serverUrl } from "../../../../../api";
import OrderHistory from "../OrderHistory/OrderHistory";
import Link from "next/link";
import { FaArrowRight, FaImage } from "react-icons/fa";
import Image from "next/image";
import ImageUploader from "../../../ImageUploader/ImageUploader";

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

const UserProfile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const mongoUserId = sessionStorage.getItem("mongoUserId");
  const userId = mongoUserId;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${serverUrl}/api/users/${userId}`);
        const userData = response.data;
        console.log(userData);
        setUser(userData);
        setName(userData.name);
        setEmail(userData.email);
        setPhone(userData.phone);
        setAddress(userData.address);
        setPhotoURL(userData.photoURL);
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
        {
          name,
          email,
          phone,
          address,
          photoURL,
        }
      );
      setUser(response.data);
      setIsEditing(false);
      toast.success("User updated successfully!");
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Error updating user.");
    }
  };

  const handleImageUploadSuccess = async (imageUrl: string) => {
    setPhotoURL(imageUrl);
    toast.success("Profile picture updated successfully!");
  };

  if (!user) {
    return <div className="text-center my-20">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">User Profile</h2>
      <div className="bg-white p-8 rounded shadow-md flex flex-col md:flex-row gap-8">
        <div className="flex flex-col items-center md:w-1/3">
          <div className="relative w-40 h-40 mb-4">
            {photoURL ? (
              <Image
                src={photoURL}
                alt="Profile Picture"
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center text-gray-400">
                <FaImage size={50} />
              </div>
            )}
            {isEditing && (
              <div className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full cursor-pointer">
                <ImageUploader onUploadSuccess={handleImageUploadSuccess} />
              </div>
            )}
          </div>
        </div>
        <div className="flex-1">
          <div className="flex justify-between">
            <h3 className="text-xl font-semibold mb-4">Personal Information</h3>
            {isEditing ? (
              <button
                onClick={handleUpdateUserDetails}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Save Profile Editing
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Edit Profile
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-bold mb-1">
                Name:
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border rounded px-3 py-2"
                />
              ) : (
                <p className="border rounded px-3 py-2">{user.name}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-1">
                Email:
              </label>
              {isEditing ? (
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border rounded px-3 py-2"
                />
              ) : (
                <p className="border rounded px-3 py-2">{user.email}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-1">
                Phone:
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full border rounded px-3 py-2"
                />
              ) : (
                <p className="border rounded px-3 py-2">{user.phone}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-1">
                Address:
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full border rounded px-3 py-2"
                />
              ) : (
                <p className="border rounded px-3 py-2">{user.address}</p>
              )}
            </div>
          </div>
          {user.prescription && (
            <div className="mt-4">
              <label className="block text-gray-700 font-bold mb-1">
                Prescription:
              </label>
              <Link
                href={user.prescription}
                target="_blank"
                className="flex items-center gap-2 bg-blue-500 px-4 py-2 text-white rounded-md"
              >
                View <FaArrowRight />
              </Link>
            </div>
          )}
        </div>
      </div>
      <div tabIndex={0} className="collapse border rounded-md mt-6">
        <div className="collapse-title text-md">
          Order History : Click to Open
        </div>
        <div className="collapse-content">
          <OrderHistory userId={userId} />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
