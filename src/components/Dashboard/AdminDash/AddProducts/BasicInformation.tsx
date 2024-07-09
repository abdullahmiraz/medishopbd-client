import React from "react";

interface BasicInformationProps {
  productId: number;
  productName: string;
  measure: string;
  activeIngredient: string;
  manufacturer: string;
  requiresPrescription: string;
  pageCategory: string;
  dosageForm: string;
  applicationArea: string;
  productType: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}

const BasicInformation: React.FC<BasicInformationProps> = ({
  productId,
  productName,
  measure,
  activeIngredient,
  manufacturer,
  requiresPrescription,
  pageCategory,
  dosageForm,
  applicationArea,
  productType,
  onChange,
}) => (
  <div>
    <h2 className="text-xl font-bold">Basic Information</h2>
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      <div className="mb-4">
        <label className="block mb-1">Product Id</label>
        <input
          type="number"
          name="productId"
          value={productId}
          onChange={onChange}
          className="input input-bordered w-full"
          required
        />
      </div>
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

      {/* manufacturer,
  requiresPrescription,
  pageCategory, */}
      <div className="mb-4">
        <label className="block mb-1">Manufacturer</label>
        <input
          type="text"
          name="manufacturer"
          value={manufacturer}
          onChange={onChange}
          className="input input-bordered w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Prescription Required?</label>
        <input
          type="checkbox"
          name="requiresPrescription"
          checked={requiresPrescription == "true"}
          onChange={(e) =>
            onChange({
              target: {
                name: "requiresPrescription",
                value: e.target.checked ? "true" : "false",
              },
            } as React.ChangeEvent<HTMLInputElement>)
          }
          className="checkbox"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Page Category</label>
        <input
          type="text"
          name="pageCategory"
          value={pageCategory}
          onChange={onChange}
          className="input input-bordered w-full"
        />
      </div>
    </div>
  </div>
);

export default BasicInformation;
