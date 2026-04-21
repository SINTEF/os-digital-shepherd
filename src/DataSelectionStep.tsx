import React, { useState, useEffect } from "react";
import { ArrowDownTrayIcon, TrashIcon } from "@heroicons/react/24/outline";

interface DataSelectionStepProps {
  setStep: (step: number) => void;
  selectedOption: string;
  setSelectedOption: (option: string) => void;
}

interface Dataset {
  id: string;
  name: string;
  description: string;
  format: string;
}

const EXAMPLE_DATASETS: Dataset[] = [
  {
    id: "dataset-001",
    name: "Lorem ipsum dolor sit amet1",
    description: "Pellentesque vestibulum ex ut orci facilisis condimentum",
    format: "CSV"
  },
  {
    id: "dataset-002",
    name: "Lorem ipsum dolor sit amet2",
    description: "Pellentesque vestibulum ex ut orci facilisis condimentum",
    format: "CSV"
  },
  {
    id: "dataset-003",
    name: "Lorem ipsum dolor sit amet3",
    description: "Pellentesque vestibulum ex ut orci facilisis condimentum",
    format: "CSV"
  }
];

const DataSelectionStep: React.FC<DataSelectionStepProps> = ({
  setStep,
  selectedOption,
  setSelectedOption,
}) => {
  const [selectedDatasetIds, setSelectedDatasetIds] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setSelectedOption("");
  }, [setSelectedOption]);

  const handleDatasetChange = (datasetId: string) => {
    const updated = selectedDatasetIds.includes(datasetId)
      ? selectedDatasetIds.filter(id => id !== datasetId)
      : [...selectedDatasetIds, datasetId];
    
    setSelectedDatasetIds(updated);
    setSelectedOption(updated.length > 0 ? "selected" : "");
    
    if (updated.length > 0) {
      setError(null);
    }
  };

  const handleNext = () => {
    if (!selectedOption || selectedDatasetIds.length === 0) {
      setError("At least one (1) selection is required");
    } else {
      setError(null);
      setStep(6);
    }
  };

  return (
    <fieldset className="flex flex-col gap-4 pt-10 pb-10 pl-[10rem] pr-[10rem] items-center justify-center w-full">
      <h2 className="text-gray-500">
        Select one or more datasets
      </h2>
      
      <div className="flex flex-col mx-auto gap-3 w-full max-w-md">
        {EXAMPLE_DATASETS.map((dataset) => (
          <div
            key={dataset.id}
            className="flex items-center justify-between gap-4 p-4 border border-gray-300 rounded-lg bg-white hover:bg-gray-50"
          >
            <div className="flex items-start gap-4 flex-1 cursor-pointer" onClick={() => handleDatasetChange(dataset.id)}>
              <input
                type="checkbox"
                className="checkbox checkbox-primary mt-1"
                checked={selectedDatasetIds.includes(dataset.id)}
                onChange={() => handleDatasetChange(dataset.id)}
              />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">{dataset.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{dataset.description}</p>
                <p className="text-xs text-gray-500 mt-2">Format: {dataset.format}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="btn btn-sm btn-success text-white" onClick={(e) => e.preventDefault()}>
                <ArrowDownTrayIcon className="size-4" />
              </button>
              <button className="btn btn-sm btn-error text-white" onClick={(e) => e.preventDefault()}>
                <TrashIcon className="size-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-4 mt-10 w-[17rem]">
        <button className="btn btn-info" onClick={() => setStep(4)}>
          Previous
        </button>
        <button className="btn btn-accent" onClick={() => handleNext()}>
          Next
        </button>
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </fieldset>
  );
};

export default DataSelectionStep;
