import React from 'react';

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
  handleUsageDetailsChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleIndicationsChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleDosageDetailChange: (index: number, field: string, value: any) => void;
  handleDosageInstructionChange: (dosageIndex: number, instructionIndex: number, value: string) => void;
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
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Usage Details</h2>
      <div>
        <label htmlFor="mainTitle" className="block text-sm font-medium">Main Title</label>
        <input
          type="text"
          id="mainTitle"
          name="mainTitle"
          value={indications.mainTitle}
          onChange={handleIndicationsChange}
          className="input"
        />
      </div>
      {indications.subtitles.map((subtitle, index) => (
        <div key={index}>
          <label className="block text-sm font-medium">Subtitle {index + 1}</label>
          <input
            type="text"
            value={subtitle}
            onChange={(e) => handleIndicationSubtitleChange(index, e.target.value)}
            className="input"
          />
        </div>
      ))}
      <button type="button" onClick={() => handleIndicationSubtitleChange(indications.subtitles.length, "")} className="btn btn-secondary">Add Subtitle</button>
      <div>
        <label htmlFor="pharmacology" className="block text-sm font-medium">Pharmacology</label>
        <textarea
          id="pharmacology"
          name="pharmacology"
          value={pharmacology}
          onChange={handleUsageDetailsChange}
          className="textarea"
        />
      </div>
      {dosageDetails.map((detail, index) => (
        <div key={index} className="border p-4 mb-4">
          <h3 className="text-lg font-semibold">Dosage Detail {index + 1}</h3>
          <div>
            <label htmlFor={`ageRange-${index}`} className="block text-sm font-medium">Age Range</label>
            <input
              type="text"
              id={`ageRange-${index}`}
              value={detail.ageRange}
              onChange={(e) => handleDosageDetailChange(index, 'ageRange', e.target.value)}
              className="input"
            />
          </div>
          <div>
            <label htmlFor={`userGroup-${index}`} className="block text-sm font-medium">User Group</label>
            <input
              type="text"
              id={`userGroup-${index}`}
              value={detail.userGroup}
              onChange={(e) => handleDosageDetailChange(index, 'userGroup', e.target.value)}
              className="input"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Dosage Instructions</label>
            {detail.dosageInstructions.map((instruction, i) => (
              <input
                key={i}
                type="text"
                value={instruction}
                onChange={(e) => handleDosageInstructionChange(index, i, e.target.value)}
                className="input"
              />
            ))}
            <button
              type="button"
              onClick={() => handleDosageDetailChange(index, 'dosageInstructions', [...detail.dosageInstructions, ''])}
              className="btn btn-secondary"
            >
              Add Instruction
            </button>
          </div>
          <button
            type="button"
            onClick={() => handleRemoveDosageDetail(index)}
            className="btn btn-danger"
          >
            Remove Dosage Detail
          </button>
        </div>
      ))}
      <button type="button" onClick={handleAddDosageDetail} className="btn btn-secondary">Add Dosage Detail</button>
    </div>
  );
};

export default UsageDetails;
