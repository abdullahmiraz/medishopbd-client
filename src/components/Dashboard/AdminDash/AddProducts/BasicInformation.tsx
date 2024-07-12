import React, { useEffect, useState } from "react";

interface BasicInformationProps {
  productId: number;
  productName: string;
  measure: string;
  activeIngredient: string;
  productCode: string;
  manufacturer: string;
  requiresPrescription: string;
  pageCategory: string;
  dosageForm: string;
  applicationArea: string;
  productType: string;
  pricePerUnit: number;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}

const BasicInformation: React.FC<BasicInformationProps> = ({
  productId,
  productName,
  measure,
  productCode,
  activeIngredient,
  manufacturer,
  requiresPrescription,
  pageCategory,
  dosageForm,
  applicationArea,
  pricePerUnit,
  productType,
  onChange,
}) => {
  const [newProductCode, setNewProductCode] = useState("");

  useEffect(() => {
    const generateProductCode = () => {
      const code = `${productName}-${measure}-${dosageForm}-${productId}`
        .toLowerCase()
        .replace(/\s+/g, "-");
      setNewProductCode(code);
    };

    generateProductCode();
  }, [productName, measure, dosageForm, productId]);
  return (
    <div className="p-6 bg-base-100 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4 border-b-2">Basic Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="mb-4">
          <label className="block mb-1 font-medium">Product Id</label>
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
          <label className="block mb-1 font-medium">Product Name</label>
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
          <label className="block mb-1 font-medium">Measure</label>
          <input
            type="text"
            name="measure"
            value={measure}
            onChange={onChange}
            className="input input-bordered w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Dosage Form</label>
          <input
            type="text"
            name="dosageForm"
            value={dosageForm}
            onChange={onChange}
            className="input input-bordered w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Product Code</label>
          <input
            type="text"
            name="productCode"
            value={productCode}
            defaultValue={newProductCode}
            onChange={onChange}
            className="input input-bordered w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Active Ingredient</label>
          <input
            type="text"
            name="activeIngredient"
            value={activeIngredient}
            onChange={onChange}
            className="input input-bordered w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Application Area</label>
          <input
            type="text"
            name="applicationArea"
            value={applicationArea}
            onChange={onChange}
            className="input input-bordered w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Product Type</label>
          <input
            type="text"
            name="productType"
            value={productType}
            onChange={onChange}
            className="input input-bordered w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Price Per Unit</label>
          <input
            type="number"
            name="pricePerUnit"
            value={pricePerUnit}
            onChange={onChange}
            className="input input-bordered w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Manufacturer</label>
          <input
            type="text"
            name="manufacturer"
            value={manufacturer}
            onChange={onChange}
            className="input input-bordered w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Page Category</label>
          <input
            type="text"
            name="pageCategory"
            value={pageCategory}
            onChange={onChange}
            className="input input-bordered w-full"
          />
        </div>
        <div className="mb-4 flex items-center">
          <label className="block mb-1 font-medium mr-2">
            Prescription Required?
          </label>
          <input
            type="checkbox"
            name="requiresPrescription"
            checked={requiresPrescription === "true"}
            onChange={(e) =>
              onChange({
                target: {
                  name: "requiresPrescription",
                  value: e.target.checked ? "true" : "false",
                },
              } as React.ChangeEvent<HTMLInputElement>)
            }
            className="checkbox checkbox-primary"
          />
        </div>
      </div>
    </div>
  );
};

export default BasicInformation;
