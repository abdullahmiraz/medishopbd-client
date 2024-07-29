"use client";

import Image from "next/image";
import { useEffect } from "react";
import { FaArrowRight, FaImage } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserById,
  selectError,
  selectStatus,
  selectUser,
} from "../../../../redux/features/user/userSlice";
import { useRouter } from "next/navigation";
import Spinner from "../../../Shared/Spinner/Spinner";
import OrderHistory from "../OrderHistory/OrderHistory";
import { StatusCode } from "../../../../utils/statusCode";

const UserProfile = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector(selectUser);
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const isAuthenticated = localStorage.getItem('isAuthenticated');

    if (userId && isAuthenticated === 'true') {
      dispatch(fetchUserById(userId));
    } else {
      router.push("/login");
    }
  }, [dispatch, router]);

  if (status === StatusCode.LOADING) {
    return <Spinner />;
  }

  if (status === StatusCode.ERROR) {
    return <div className="text-center my-20 text-red-500">{error}</div>;
  }

  if (!user) {
    return <div className="text-center my-20">No user data found.</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">User Profile</h2>
      <div className="bg-white p-8 rounded shadow-md flex flex-col md:flex-row gap-8">
        <div className="flex flex-col items-center md:w-1/3">
          <div className="relative w-40 h-40 mb-4">
            {user.photoURL ? (
              <Image
                src={user.photoURL}
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
          </div>
        </div>
        <div className="flex-1">
          <div className="flex justify-between">
            <h3 className="text-xl font-semibold mb-4">Personal Information</h3>
            {/* Add Save Profile Editing functionality */}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-bold mb-1">Name:</label>
              <p className="border rounded px-3 py-2">{user.name || 'N/A'}</p>
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-1">Email:</label>
              <p className="border rounded px-3 py-2">{user.email || 'N/A'}</p>
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-1">Phone:</label>
              <p className="border rounded px-3 py-2">{user.phone || 'N/A'}</p>
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-1">Address:</label>
              <p className="border rounded px-3 py-2">{user.address || 'N/A'}</p>
            </div>
          </div>
          {user.prescription && (
            <div className="mt-4">
              <label className="block text-gray-700 font-bold mb-1">Prescription:</label>
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
