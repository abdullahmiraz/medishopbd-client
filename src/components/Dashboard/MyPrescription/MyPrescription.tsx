"use client";

import axios from "axios";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { serverUrl } from "../../../../api";
import ImageUploader from "../../ImageUploader/ImageUploader";
import Image from "next/image";

const MyPrescription = () => {
  const userId = localStorage.getItem("userId");
  const [currentPrescription, setCurrentPrescription] = useState<string | null>(null);

  useEffect(() => {
    const fetchCurrentPrescription = async () => {
      try {
        const response = await axios.get(`${serverUrl}/api/users/${userId}`);
        if (response.data && response.data.prescription) {
          setCurrentPrescription(response.data.prescription);
        }
      } catch (error) {
        console.error("Error fetching current prescription:", error);
        toast.error("Failed to fetch current prescription.");
      }
    };

    fetchCurrentPrescription();
  }, [userId]);

  const handleImageUploadSuccess = async (imageUrl: string) => {
    try {
      const updateResponse = await axios.patch(`${serverUrl}/api/users/${userId}`, {
        prescription: imageUrl,
      });

      if (updateResponse.data) {
        toast.success("Prescription updated successfully!");
        setCurrentPrescription(imageUrl); // Update the displayed prescription image
      }
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Error updating user.");
    }
  };

  const deletePrescription = async () => {
    try {
      await axios.patch(`${serverUrl}/api/users/${userId}`, {
        prescription: null,
      });

      toast.success("Prescription deleted successfully!");
      setCurrentPrescription(null); // Clear the displayed prescription image
    } catch (error) {
      console.error("Error deleting prescription:", error);
      toast.error("Error deleting prescription.");
    }
  };

  return (
    <div className=" p-6">
      <div className="bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-6">Update Prescription</h2>
        <div className="form-group mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Upload Prescription Image
          </label>
          <ImageUploader onUploadSuccess={handleImageUploadSuccess} showSubmitButton={true} />
        </div>
        <div className="divider"></div>
        {currentPrescription && (
          <div className="mt-6">
            <h3 className="text-xl font-bold mb-4">Previous Prescription</h3>
            <Image
              width={1000}
              height={1000}
              src={currentPrescription}
              alt="Current Prescription"
              className="max-w-full h-auto rounded"
            />
            <button
              onClick={deletePrescription}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded text-sm"
            >
              Delete Prescription
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPrescription;
