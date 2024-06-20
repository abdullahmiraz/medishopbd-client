// AdditionalInputs.tsx

import React from "react";

interface Props {
  productData: any; // Use 'any' for simplicity in this example, consider updating with proper types
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AdditionalInputs: React.FC<Props> = ({ productData, onChange }) => {
  return (
    <>
      <div className="mb-4">
        <label className="block mb-1">Dosage Form</label>
        <input
          type="text"
          name="dosageForm"
          value={productData.dosageForm}
          onChange={onChange}
          className="input input-bordered w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Application Area</label>
        <input
          type="text"
          name="applicationArea"
          value={productData.applicationArea}
          onChange={onChange}
          className="input input-bordered w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Primary Category</label>
        <input
          type="text"
          name="primaryCategory"
          value={productData.primaryCategory}
          onChange={onChange}
          className="input input-bordered w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Sub Category</label>
        <input
          type="text"
          name="subCategory"
          value={productData.subCategory}
          onChange={onChange}
          className="input input-bordered w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Product Type</label>
        <input
          type="text"
          name="productType"
          value={productData.productType}
          onChange={onChange}
          className="input input-bordered w-full"
        />
      </div>
    </>
  );
};

export default AdditionalInputs;
