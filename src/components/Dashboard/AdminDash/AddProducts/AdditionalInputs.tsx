import React from "react";

interface AdditionalInputsProps {
  productData: any; // Replace with your productData type
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AdditionalInputs: React.FC<AdditionalInputsProps> = ({ productData, handleChange }) => {
  return (
    <div>
      <div className="mb-4">
        <label className="block mb-1">Dosage Form</label>
        <input
          type="text"
          name="dosageForm"
          value={productData.dosageForm}
          onChange={handleChange}
          className="input input-bordered w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Application Area</label>
        <input
          type="text"
          name="applicationArea"
          value={productData.applicationArea}
          onChange={handleChange}
          className="input input-bordered w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Primary Category</label>
        <input
          type="text"
          name="primaryCategory"
          value={productData.primaryCategory}
          onChange={handleChange}
          className="input input-bordered w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Sub Category</label>
        <input
          type="text"
          name="subCategory"
          value={productData.subCategory}
          onChange={handleChange}
          className="input input-bordered w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Product Type</label>
        <input
          type="text"
          name="productType"
          value={productData.productType}
          onChange={handleChange}
          className="input input-bordered w-full"
        />
      </div>
    </div>
  );
};

export default AdditionalInputs;
