import Image from "next/image";
import React, { useEffect, useState } from "react";

interface ImageUploadProps {
  onImageChange: (productImage: File | null, leafletImage: File | null) => void;
  productImageUrl?: string;
  leafletImageUrl?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onImageChange,
  productImageUrl,
  leafletImageUrl,
}) => {
  const [selectedProductImage, setSelectedProductImage] = useState<File | null>(
    null
  );
  const [selectedLeafletImage, setSelectedLeafletImage] = useState<File | null>(
    null
  );

  // Handle product image file selection
  const handleProductImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedProductImage(event.target.files[0]);
    }
  };

  // Handle leaflet image file selection
  const handleLeafletImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedLeafletImage(event.target.files[0]);
    }
  };

  // Notify parent of image changes
  useEffect(() => {
    onImageChange(selectedProductImage, selectedLeafletImage);
  }, [selectedProductImage, selectedLeafletImage, onImageChange]);

  return (
    <div className="space-y-6 p-6 bg-base-100 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4  border-b-2">Upload Product Images</h2>
      <div>
        <label htmlFor="productImage" className="block mb-1 font-medium">
          Product Image
        </label>
        <input
          id="productImage"
          name="productImage"
          type="file"
          accept="image/*"
          onChange={handleProductImageChange}
          className="file-input file-input-bordered file-input-primary w-full max-w-xs"
        />
      </div>
      <div>
        <label htmlFor="leafletImage" className="block mb-1 font-medium">
          Leaflet Image
        </label>
        <input
          id="leafletImage"
          name="leafletImage"
          type="file"
          accept="image/*"
          onChange={handleLeafletImageChange}
          className="file-input file-input-bordered file-input-primary w-full max-w-xs"
        />
      </div>
    </div>
  );
};

export default ImageUpload;
