import React from "react";

interface PackagingProps {
  unitsPerStrip: number;
  stripsPerBox: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Packaging: React.FC<PackagingProps> = ({
  unitsPerStrip,
  stripsPerBox,
  onChange,
}) => (
  <div className="grid grid-cols-2 gap-4">
    <div className="mb-4">
      <label className="block mb-1">Units Per Strip</label>
      <input
        type="number"
        name="unitsPerStrip"
        value={unitsPerStrip}
        onChange={onChange}
        className="input input-bordered w-full"
      />
    </div>
    <div className="mb-4">
      <label className="block mb-1">Strips Per Box</label>
      <input
        type="number"
        name="stripsPerBox"
        value={stripsPerBox}
        onChange={onChange}
        className="input input-bordered w-full"
      />
    </div>
  </div>
);

export default Packaging;
