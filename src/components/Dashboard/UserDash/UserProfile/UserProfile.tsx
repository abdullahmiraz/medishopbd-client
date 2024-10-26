"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { FaArrowRight, FaImage } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserById,
  selectError,
  selectStatus,
  selectUser,
  updateUserDetails,
} from "../../../../redux/features/user/userSlice";
import { useRouter } from "next/navigation";
import Spinner from "../../../Shared/Spinner/Spinner";
import OrderHistory from "../OrderHistory/OrderHistory";
import ImageUploader from "../../../ImageUploader/ImageUploader";
import toast from "react-hot-toast";
import { placeholderImage } from "../../../../../api";
import Head from "next/head";
import { StatusCode } from "../../../../utils/StatusCode";

const UserProfile = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector(selectUser);
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const userId = localStorage.getItem("userId");

  console.log(user);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");

    if (userId && isAuthenticated === "true") {
      dispatch<any>(fetchUserById(userId));
    } else {
      router.push("/login");
    }
  }, [dispatch, router]);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setPhone(user.phone || "");
      setAddress(user.address || "");
      setPhotoURL(user.photoURL || "");
    }
  }, [user]);

  if (status === StatusCode.LOADING) {
    return <Spinner />;
  }

  if (status === StatusCode.ERROR) {
    console.log(error);
    return <div className="text-center my-20 text-red-500">{error}</div>;
  }

  if (!user) {
    return <div className="text-center my-20">No user data found.</div>;
  }

  const handleUpdateUserDetails = async () => {
    try {
      const updatedUser = {
        name,
        email,
        phone,
        address,
        photoURL,
      };
      await dispatch<any>(
        updateUserDetails({ userId, userDetails: updatedUser })
      ).unwrap();
      toast.success("User updated successfully!");
      setIsEditing(false);
    } catch (error) {
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
    <div className="p-6">
      <Head>
        <title>User Profile</title>
      </Head>
      <h2 className="text-3xl font-bold mb-6">User Profile</h2>
      <div className="bg-white p-8 rounded shadow-md flex flex-col md:flex-row gap-8">
        <div className="flex flex-col items-center md:w-1/3">
          <div className="relative  w-full h-full">
            {photoURL ? (
              <Image
                src={photoURL || placeholderImage}
                alt="Profile Picture"
                height={150}
                width={150}
                className="rounded-full  w-56 h-56 object-cover border-2"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center text-gray-400">
                <FaImage size={50} />
              </div>
            )}
            {isEditing && (
              <div className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full cursor-pointer">
                <ImageUploader
                  onUploadSuccess={handleImageUploadSuccess}
                  showSubmitButton={true}
                />
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
              <a
                href={user.prescription}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-blue-500 px-4 py-2 text-white rounded-md"
              >
                View <FaArrowRight />
              </a>
            </div>
          )}
        </div>
      </div>
      <div tabIndex={0} className="collapse border rounded-md mt-6">
        <div className="collapse-title text-md">
          Order History: Click to Open
        </div>
        <div className="collapse-content">
          <OrderHistory userId={user._id} />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
