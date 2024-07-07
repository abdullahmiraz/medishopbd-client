import React from "react";

interface BasicInformationProps {
  productName: string;
  measure: string;
  activeIngredient: string;
  dosageForm: string;
  applicationArea: string;
  productType: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}

const BasicInformation: React.FC<BasicInformationProps> = ({
  productName,
  measure,
  activeIngredient,
  dosageForm,
  applicationArea,
  productType,
  onChange,
}) => (
  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
    <div className="mb-4">
      <label className="block mb-1">Product Name</label>
      <input
        type="text"
        name="productName"
        value={productName}
        onChange={onChange}
        className="input input-bordered w-full"
        required
      />
    </div>
    <div className="mb-4">
      <label className="block mb-1">Measure</label>
      <input
        type="text"
        name="measure"
        value={measure}
        onChange={onChange}
        className="input input-bordered w-full"
      />
    </div>
    <div className="mb-4">
      <label className="block mb-1">Active Ingredient</label>
      <input
        type="text"
        name="activeIngredient"
        value={activeIngredient}
        onChange={onChange}
        className="input input-bordered w-full"
      />
    </div>
    <div className="mb-4">
      <label className="block mb-1">Dosage Form</label>
      <input
        type="text"
        name="dosageForm"
        value={dosageForm}
        onChange={onChange}
        className="input input-bordered w-full"
      />
    </div>
    <div className="mb-4">
      <label className="block mb-1">Application Area</label>
      <input
        type="text"
        name="applicationArea"
        value={applicationArea}
        onChange={onChange}
        className="input input-bordered w-full"
      />
    </div>
    <div className="mb-4">
      <label className="block mb-1">Product Type</label>
      <input
        type="text"
        name="productType"
        value={productType}
        onChange={onChange}
        className="input input-bordered w-full"
      />
    </div>
  </div>
);

export default BasicInformation;
