import React from 'react';

interface PackagingProps {
  unitsPerStrip: number;
  stripsPerBox: number;
  handlePackagingChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Packaging: React.FC<PackagingProps> = ({ unitsPerStrip, stripsPerBox, handlePackagingChange }) => {
  return (
    <div className="space-y-4 p-6 bg-base-100 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4 border-b-2">Packaging</h2>
      <div>
        <label htmlFor="unitsPerStrip" className="block text-sm font-medium mb-2">Units Per Strip</label>
        <input
        min={1}
          type="number"
          id="unitsPerStrip"
          name="unitsPerStrip"
          value={unitsPerStrip}
          onChange={handlePackagingChange}
          className="input input-bordered w-full max-w-xs"
        />
      </div>
      <div>
        <label htmlFor="stripsPerBox" className="block text-sm font-medium mb-2">Strips Per Box</label>
        <input
        min={1}
          type="number"
          id="stripsPerBox"
          name="stripsPerBox"
          value={stripsPerBox}
          onChange={handlePackagingChange}
          className="input input-bordered w-full max-w-xs"
        />
      </div>
    </div>
  );
};

export default Packaging;
