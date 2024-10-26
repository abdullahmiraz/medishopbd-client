import axios from "axios";
import React, { useRef, useState } from "react";
import toast from "react-hot-toast";

const imageHostingKey = process.env.NEXT_PUBLIC_IMAGE_HOSTING_KEY;
const imageHostingAPI = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;

interface ImageUploaderProps {
  onUploadSuccess: (imageUrl: string) => void;
  showSubmitButton?: boolean;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  onUploadSuccess,
  showSubmitButton = true,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleImageUpload = async () => {
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
        const imageUrl = uploadResponse?.data?.data?.url;
        console.log(imageUrl);
        onUploadSuccess(imageUrl);
        setSelectedFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        toast.success("Image uploaded successfully!");
      } else {
        throw new Error("Image upload failed.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Error uploading image.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <input
        type="file"
        className="file-input w-full bg-gray-200"
        onChange={handleFileChange}
        ref={fileInputRef}
      />
      {showSubmitButton && (
        <button
          className="btn btn-primary "
          onClick={handleImageUpload}
          disabled={isUploading}
        >
          {isUploading ? "Uploading..." : "Upload Image"}
        </button>
      )}
      {isUploading && (
        <p className="text-blue-500 ">Uploading image, please wait...</p>
      )}
    </div>
  );
};

export default ImageUploader;
