import React from "react";

interface StockInformationProps {
  batchNumber: string;
  quantity: number;
  expirationDate: string;
  aisleLocation: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const StockInformation: React.FC<StockInformationProps> = ({
  batchNumber,
  quantity,
  expirationDate,
  aisleLocation,
  onChange,
}) => (
  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
    <div className="mb-4">
      <label htmlFor="batchNumber" className="block mb-1">
        Batch Number
      </label>
      <input
        type="text"
        id="batchNumber"
        name="batchNumber"
        value={batchNumber}
        onChange={onChange}
        className="input input-bordered w-full"
      />
    </div>
    <div className="mb-4">
      <label htmlFor="quantity" className="block mb-1">
        Available Stock
      </label>
      <input
        type="number"
        id="quantity"
        name="quantity"
        value={quantity}
        onChange={onChange}
        className="input input-bordered w-full"
      />
    </div>
    <div className="mb-4">
      <label htmlFor="expirationDate" className="block mb-1">
        Expiration Date
      </label>
      <input
        type="date"
        id="expirationDate"
        name="expirationDate"
        value={expirationDate}
        onChange={onChange}
        className="input input-bordered w-full"
      />
    </div>
    <div className="mb-4">
      <label htmlFor="aisleLocation" className="block mb-1">
        Aisle Location
      </label>
      <input
        type="text"
        id="aisleLocation"
        name="aisleLocation"
        value={aisleLocation}
        onChange={onChange}
        className="input input-bordered w-full"
      />
    </div>
  </div>
);

export default StockInformation;
