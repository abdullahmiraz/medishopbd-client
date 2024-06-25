"use client";

import axios from "axios";
import React, { useState } from "react";
import { FaUpload } from "react-icons/fa";
import toast from "react-hot-toast";
import { serverUrl } from "../../../../api";

const imageHostingKey = process.env.NEXT_PUBLIC_IMAGE_HOSTING_KEY;
const imageHostingAPI = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;

const PrescriptionUpdate = () => {
  const mongoUserId = sessionStorage.getItem("mongoUserId");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpdatePrescription = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!selectedFile) {
      toast.error("Please select an image to upload.");
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("image", selectedFile);

      const uploadResponse = await axios.post(imageHostingAPI, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (uploadResponse.data.success) {
        const imageUrl = uploadResponse.data.data.url;

        const updateResponse = await axios.patch(
          `${serverUrl}/api/users/${mongoUserId}`,
          {
            prescription: imageUrl,
          }
        );

        if (updateResponse.data) {
          toast.success("Prescription updated successfully!");
          setSelectedFile(null);
          (event.target as HTMLFormElement).reset();
        }
      } else {
        throw new Error("Image upload failed.");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Error updating user.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-6">Update Prescription</h2>
        <form onSubmit={handleUpdatePrescription}>
          <div className="form-group mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Upload Prescription Image
            </label>
            <input
              required
              type="file"
              className="file-input w-full bg-gray-200"
              onChange={handleFileChange}
            />
          </div>
          {isUploading && (
            <div className="mb-4">
              <p className="text-blue-500">Uploading image, please wait...</p>
            </div>
          )}
          <button
            className="btn btn-primary w-full flex items-center justify-center"
            type="submit"
            disabled={isUploading}
          >
            {isUploading ? (
              <span>Uploading...</span>
            ) : (
              <>
                Add Prescription <FaUpload className="ml-2" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PrescriptionUpdate;
