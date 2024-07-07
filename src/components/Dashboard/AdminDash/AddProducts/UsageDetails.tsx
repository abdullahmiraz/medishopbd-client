import React from "react";

interface UsageDetailsProps {
  indications: string;
  dosageDetails: {
    ageRange: string;
    userGroup: string;
    dosageInstructions: string;
  };
  pharmacology: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const UsageDetails: React.FC<UsageDetailsProps> = ({
  indications,
  dosageDetails,
  pharmacology,
  onChange,
}) => (
  <div className="space-y-4">
    <div className="mb-4">
      <label className="block mb-1">Indications</label>
      <textarea
        name="indications"
        value={indications}
        onChange={onChange}
        className="textarea textarea-bordered w-full"
        rows={3}
      />
    </div>
    <div className="mb-4">
      <label className="block mb-1">Dosage Details</label>
      <input
        type="text"
        name="ageRange"
        value={dosageDetails.ageRange}
        onChange={onChange}
        className="input input-bordered w-full mb-2"
        placeholder="Age Range"
      />
      <input
        type="text"
        name="userGroup"
        value={dosageDetails.userGroup}
        onChange={onChange}
        className="input input-bordered w-full mb-2"
        placeholder="User Group"
      />
      <textarea
        name="dosageInstructions"
        value={dosageDetails.dosageInstructions}
        onChange={onChange}
        className="textarea textarea-bordered w-full"
        rows={3}
        placeholder="Dosage Instructions"
      />
    </div>
    <div className="mb-4">
      <label className="block mb-1">Pharmacology</label>
      <textarea
        name="pharmacology"
        value={pharmacology}
        onChange={onChange}
        className="textarea textarea-bordered w-full"
        rows={3}
      />
    </div>
  </div>
);

export default UsageDetails;
