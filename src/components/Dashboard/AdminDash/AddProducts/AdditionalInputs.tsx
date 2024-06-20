// AdditionalInputs.tsx

import React from "react";

interface Props {
  productData: any; // Use 'any' for simplicity in this example, consider updating with proper types
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; // Change event type to HTMLSelectElement
}

const AdditionalInputs: React.FC<Props> = ({ productData, onChange }) => {
  return (
    <>
      <div className="mb-4">
        <label className="block mb-1">Dosage Form</label>
        <select
          name="dosageForm"
          value={productData.dosageForm}
          onChange={onChange}
          className="select select-bordered w-full"
        >
          <option value="">Select Dosage Form</option>
          <option value="Tablet">Tablet</option>
          <option value="Capsule">Capsule</option>
          <option value="Liquid">Liquid</option>
          <option value="Injection">Injection</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-1">Application Area</label>
        <select
          name="applicationArea"
          value={productData.applicationArea}
          onChange={onChange}
          className="select select-bordered w-full"
        >
          <option value="">Select Application Area</option>
          <option value="Oral">Oral</option>
          <option value="Topical">Topical</option>
          <option value="Injection">Injection</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-1">Primary Category</label>
        <select
          name="primaryCategory"
          value={productData.primaryCategory}
          onChange={onChange}
          className="select select-bordered w-full"
        >
          <option value="">Select Primary Category</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Personal Care">Personal Care</option>
          <option value="Nutrition">Nutrition</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-1">Sub Category</label>
        <select
          name="subCategory"
          value={productData.subCategory}
          onChange={onChange}
          className="select select-bordered w-full"
        >
          <option value="">Select Sub Category</option>
          <option value="Pain Relief">Pain Relief</option>
          <option value="Skin Care">Skin Care</option>
          <option value="Vitamins">Vitamins</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-1">Product Type</label>
        <select
          name="productType"
          value={productData.productType}
          onChange={onChange}
          className="select select-bordered w-full"
        >
          <option value="">Select Product Type</option>
          <option value="Medicine">Medicine</option>
          <option value="Supplement">Supplement</option>
          <option value="Cosmetic">Cosmetic</option>
        </select>
      </div>
    </>
  );
};

export default AdditionalInputs;
