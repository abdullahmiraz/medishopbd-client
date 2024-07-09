import React from "react";

interface UsageDetailsProps {
  indications: {
    mainTitle: string;
    subtitles: string[];
  };
  dosageDetails: {
    ageRange: string;
    userGroup: string;
    dosageInstructions: string[];
  }[];
  pharmacology: string;
  handleUsageDetailsChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleIndicationsChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleDosageDetailChange: (index: number, field: string, value: any) => void;
  handleDosageInstructionChange: (
    dosageIndex: number,
    instructionIndex: number,
    value: string
  ) => void;
  handleAddDosageDetail: () => void;
  handleRemoveDosageDetail: (index: number) => void;
  handleIndicationSubtitleChange: (index: number, value: string) => void;
}

const UsageDetails: React.FC<UsageDetailsProps> = ({
  indications,
  dosageDetails,
  pharmacology,
  handleUsageDetailsChange,
  handleIndicationsChange,
  handleDosageDetailChange,
  handleDosageInstructionChange,
  handleAddDosageDetail,
  handleRemoveDosageDetail,
  handleIndicationSubtitleChange,
}) => {
  return (
    <div className="space-y-6 p-6 bg-base-100 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4 border-b-2">Usage Details</h2>

      <div className="mb-4">
        <label htmlFor="mainTitle" className="block text-sm font-medium mb-1">
          Main Title
        </label>
        <input
          type="text"
          id="mainTitle"
          name="mainTitle"
          value={indications.mainTitle}
          onChange={handleIndicationsChange}
          className="input input-bordered w-full"
        />
      </div>

      {indications.subtitles.map((subtitle, index) => (
        <div key={index} className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Subtitle {index + 1}
          </label>
          <input
            type="text"
            value={subtitle}
            onChange={(e) =>
              handleIndicationSubtitleChange(index, e.target.value)
            }
            className="input input-bordered w-full"
          />
        </div>
      ))}
      <button
        type="button"
        onClick={() =>
          handleIndicationSubtitleChange(indications.subtitles.length, "")
        }
        className="btn btn-primary mb-4"
      >
        Add Subtitle
      </button>

      <div className="mb-4">
        <label
          htmlFor="pharmacology"
          className="block text-sm font-medium mb-1"
        >
          Pharmacology
        </label>
        <textarea
          id="pharmacology"
          name="pharmacology"
          value={pharmacology}
          onChange={handleUsageDetailsChange}
          className="textarea textarea-bordered w-full"
        />
      </div>

      {dosageDetails.map((detail, index) => (
        <div key={index} className="border p-4 mb-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">
            Dosage Detail {index + 1}
          </h3>

          <div className="mb-4">
            <label
              htmlFor={`ageRange-${index}`}
              className="block text-sm font-medium mb-1"
            >
              Age Range
            </label>
            <input
              type="text"
              id={`ageRange-${index}`}
              value={detail.ageRange}
              onChange={(e) =>
                handleDosageDetailChange(index, "ageRange", e.target.value)
              }
              className="input input-bordered w-full"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor={`userGroup-${index}`}
              className="block text-sm font-medium mb-1"
            >
              User Group
            </label>
            <input
              type="text"
              id={`userGroup-${index}`}
              value={detail.userGroup}
              onChange={(e) =>
                handleDosageDetailChange(index, "userGroup", e.target.value)
              }
              className="input input-bordered w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Dosage Instructions
            </label>
            {detail.dosageInstructions.map((instruction, i) => (
              <div key={i} className="mb-2">
                <input
                  type="text"
                  value={instruction}
                  onChange={(e) =>
                    handleDosageInstructionChange(index, i, e.target.value)
                  }
                  className="input input-bordered w-full"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                handleDosageDetailChange(index, "dosageInstructions", [
                  ...detail.dosageInstructions,
                  "",
                ])
              }
              className="btn btn-primary"
            >
              Add Instruction
            </button>
          </div>

          <button
            type="button"
            onClick={() => handleRemoveDosageDetail(index)}
            className="btn btn-error"
          >
            Remove Dosage Detail
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={handleAddDosageDetail}
        className="btn btn-primary w-full"
      >
        Add Dosage Detail
      </button>
    </div>
  );
};

export default UsageDetails;
