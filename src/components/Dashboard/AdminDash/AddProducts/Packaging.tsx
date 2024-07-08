import React from 'react';

interface PackagingProps {
  unitsPerStrip: number;
  stripsPerBox: number;
  handlePackagingChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Packaging: React.FC<PackagingProps> = ({ unitsPerStrip, stripsPerBox, handlePackagingChange }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Packaging</h2>
      <div>
        <label htmlFor="unitsPerStrip" className="block text-sm font-medium">Units Per Strip</label>
        <input
          type="number"
          id="unitsPerStrip"
          name="unitsPerStrip"
          value={unitsPerStrip}
          onChange={handlePackagingChange}
          className="input"
        />
      </div>
      <div>
        <label htmlFor="stripsPerBox" className="block text-sm font-medium">Strips Per Box</label>
        <input
          type="number"
          id="stripsPerBox"
          name="stripsPerBox"
          value={stripsPerBox}
          onChange={handlePackagingChange}
          className="input"
        />
      </div>
    </div>
  );
};

export default Packaging;
