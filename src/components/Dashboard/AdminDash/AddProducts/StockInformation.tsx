import React from 'react';

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
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Stock Information</h2>
      {stockDetails.map((stock, index) => (
        <div key={index} className="border p-4 mb-4">
          <div>
            <label htmlFor={`batchNumber-${index}`} className="block text-sm font-medium">Batch Number</label>
            <input
              type="text"
              id={`batchNumber-${index}`}
              value={stock.batchNumber}
              onChange={(e) => handleStockChange(index, 'batchNumber', e.target.value)}
              className="input"
            />
          </div>
          <div>
            <label htmlFor={`quantity-${index}`} className="block text-sm font-medium">Quantity</label>
            <input
              type="number"
              id={`quantity-${index}`}
              value={stock.quantity}
              onChange={(e) => handleStockChange(index, 'quantity', e.target.value)}
              className="input"
            />
          </div>
          <div>
            <label htmlFor={`expirationDate-${index}`} className="block text-sm font-medium">Expiration Date</label>
            <input
              type="date"
              id={`expirationDate-${index}`}
              value={stock.expirationDate}
              onChange={(e) => handleStockChange(index, 'expirationDate', e.target.value)}
              className="input"
            />
          </div>
          <div>
            <label htmlFor={`aisleLocation-${index}`} className="block text-sm font-medium">Aisle Location</label>
            <input
              type="text"
              id={`aisleLocation-${index}`}
              value={stock.aisleLocation}
              onChange={(e) => handleStockChange(index, 'aisleLocation', e.target.value)}
              className="input"
            />
          </div>
          <button
            type="button"
            onClick={() => handleRemoveStock(index)}
            className="btn btn-danger"
          >
            Remove Stock
          </button>
        </div>
      ))}
      <button type="button" onClick={handleAddStock} className="btn btn-secondary">Add Stock</button>
    </div>
  );
};

export default StockInformation;
