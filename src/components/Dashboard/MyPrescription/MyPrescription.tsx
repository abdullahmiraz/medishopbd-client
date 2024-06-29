// components/PrescriptionUpdate.tsx
"use client";

import axios from "axios";
import toast from "react-hot-toast";
import { serverUrl } from "../../../../api";
import ImageUploader from "../../ImageUploader/ImageUploader";

const MyPrescription = () => {
  const mongoUserId = sessionStorage.getItem("mongoUserId");

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
      </div>
    </div>
  );
};

export default MyPrescription;
