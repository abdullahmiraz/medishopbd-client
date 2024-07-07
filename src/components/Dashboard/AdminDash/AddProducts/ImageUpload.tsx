import Image from 'next/image';
import React, { useState } from 'react';

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
  const [selectedProductImage, setSelectedProductImage] = useState<File | null>(null);
  const [selectedLeafletImage, setSelectedLeafletImage] = useState<File | null>(null);

  // Handle product image file selection
  const handleProductImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedProductImage(event.target.files[0]);
    }
  };

  // Handle leaflet image file selection
  const handleLeafletImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedLeafletImage(event.target.files[0]);
    }
  };

  // Notify parent of image changes
  React.useEffect(() => {
    onImageChange(selectedProductImage, selectedLeafletImage);
  }, [selectedProductImage, selectedLeafletImage, onImageChange]);

  return (
    <div className="space-y-6">
      <div>
        {productImageUrl && (
          <div className="mb-4">
            <h3>Product Image</h3>
            <Image
              src={productImageUrl}
              alt="Product"
              width={300}
              height={200}
              style={{ objectFit: 'cover' }}
            />
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleProductImageChange}
        />
      </div>
      <div>
        {leafletImageUrl && (
          <div className="mb-4">
            <h3>Leaflet Image</h3>
            <Image
              src={leafletImageUrl}
              alt="Leaflet"
              width={300}
              height={200}
              style={{ objectFit: 'cover' }}
            />
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleLeafletImageChange}
        />
      </div>
    </div>
  );
};

export default ImageUpload;
