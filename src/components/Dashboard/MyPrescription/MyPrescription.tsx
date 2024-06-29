"use client";

import axios from "axios";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { serverUrl } from "../../../../api";
import ImageUploader from "../../ImageUploader/ImageUploader";
import Image from "next/image";

const MyPrescription = () => {
  const mongoUserId = sessionStorage.getItem("mongoUserId");
  const [currentPrescription, setCurrentPrescription] = useState<string | null>(
    null
  );

  useEffect(() => {
    const fetchCurrentPrescription = async () => {
      try {
        const response = await axios.get(
          `${serverUrl}/api/users/${mongoUserId}`
        );
        if (response.data && response.data.prescription) {
          setCurrentPrescription(response.data.prescription);
        }
      } catch (error) {
        console.error("Error fetching current prescription:", error);
        toast.error("Failed to fetch current prescription.");
      }
    };

    fetchCurrentPrescription();
  }, [mongoUserId]);

  const handleImageUploadSuccess = async (imageUrl: string) => {
    try {
      const updateResponse = await axios.patch(
        `${serverUrl}/api/users/${mongoUserId}`,
        {
          prescription: imageUrl,
        }
      );

      if (updateResponse.data) {
        toast.success("Prescription updated successfully!");
        setCurrentPrescription(imageUrl); // Update the displayed prescription image
      }
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Error updating user.");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-6">Update Prescription</h2>
        <div className="form-group mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Upload Prescription Image
          </label>
          <ImageUploader onUploadSuccess={handleImageUploadSuccess} />
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
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPrescription;
