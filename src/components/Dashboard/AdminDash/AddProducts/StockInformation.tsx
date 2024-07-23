import React from "react";

interface StockInformationProps {
  stockDetails: {
    batchNumber: string;
    quantity: number;
    expirationDate: string;
    aisleLocation: string;
  }[];
  handleStockChange: (index: number, field: string, value: any) => void;
  handleAddStock: () => void;
  handleRemoveStock: (index: number) => void;
}

const StockInformation: React.FC<StockInformationProps> = ({
  stockDetails,
  handleStockChange,
  handleAddStock,
  handleRemoveStock,
}) => {
  return (
    <div className="space-y-4 p-6 bg-base-100 rounded-lg shadow-lg my-4">
      <h2 className="text-xl font-bold mb-4 border-b-2">Stock Information</h2>
      {stockDetails.map((stock, index) => (
        <div key={index} className="border p-4 mb-4 rounded-lg bg-base-200">
          <div className="mb-4">
            <label
              htmlFor={`batchNumber-${index}`}
              className="block text-sm font-medium mb-2"
            >
              Batch Number
            </label>
            <input
              type="text"
              id={`batchNumber-${index}`}
              value={stock.batchNumber}
              onChange={(e) =>
                handleStockChange(index, "batchNumber", e.target.value)
              }
              className="input input-bordered w-full"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor={`quantity-${index}`}
              className="block text-sm font-medium mb-2"
            >
              Quantity
            </label>
            <input
              min={0}
              type="number"
              id={`quantity-${index}`}
              value={stock.quantity}
              onChange={(e) =>
                handleStockChange(index, "quantity", e.target.value)
              }
              className="input input-bordered w-full"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor={`expirationDate-${index}`}
              className="block text-sm font-medium mb-2"
            >
              Expiration Date
            </label>
            <input
              type="date"
              id={`expirationDate-${index}`}
              value={stock.expirationDate}
              onChange={(e) =>
                handleStockChange(index, "expirationDate", e.target.value)
              }
              className="input input-bordered w-full"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor={`aisleLocation-${index}`}
              className="block text-sm font-medium mb-2"
            >
              Aisle Location
            </label>
            <input
              type="text"
              id={`aisleLocation-${index}`}
              value={stock.aisleLocation}
              onChange={(e) =>
                handleStockChange(index, "aisleLocation", e.target.value)
              }
              className="input input-bordered w-full"
            />
          </div>
          <button
            type="button"
            onClick={() => handleRemoveStock(index)}
            className="btn btn-error mt-4"
          >
            Remove Stock
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={handleAddStock}
        className="btn btn-primary"
      >
        Add Stock
      </button>
    </div>
  );
};

export default StockInformation;
