import React, { useState } from "react";

interface DataSubmissionStepProps {
  setStep: (step: number) => void;
  selectedOption: string;
  setSelectedOption: (option: string) => void;
}

const DataSubmissionStep: React.FC<DataSubmissionStepProps> = ({
  setStep,
}) => {
  const [fileInput, setFileInput] = useState<string | Blob>("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [format, setFormat] = useState("");

  const [formError, setFormError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const allowedExtensions = [".csv"];

  const getFileExtension = (filename: string) =>
    filename.slice(filename.lastIndexOf(".")).toLowerCase();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!allowedExtensions.includes(getFileExtension(file.name))) {
      return;
    }

    setFileInput(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description || !format || !fileInput) {
      setFormError("All fields are mandatory.");
      return;
    }

    setFormError(null);
    // Fake upload - just show success modal
    setShowModal(true);
  };

  return (
    <fieldset className="flex flex-col gap-4 pt-10 pb-10 items-center w-full">

      <h2 className="text-gray-500">Submit your datasets using the form</h2>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
          <div className="bg-white p-4 rounded">
            <p className="text-green-600 font-bold">Dataset uploaded successfully</p>
            <p className="text-black">
              You can now upload more datasets
              <br />
              using the same form
              <br />
              or move to the next step
            </p>
            <br />
            <button
              className="text-red-500 mt-2"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <form className="p-8 bg-[#EDE3D3] space-y-6 min-w-[450px]">

        {formError && <p className="text-red-500">{formError}</p>}

        <input
          className="w-full border p-2"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <textarea
          className="w-full border p-2"
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <div>
        <select
          className="w-full border p-2"
          value={format}
          onChange={e => setFormat(e.target.value)}
        >
          <option value="">Select format</option>
          <option value="data1">Data1 | .csv</option>
          <option value="data2">Data2 | .csv</option>
          <option value="data3">Data3 | .csv</option>
          <option value="data4">Data4 | .csv</option>
        </select>
        </div>
        
        <div>
          <input
            type="file"
            className="w-full border border-gray-400 p-2 rounded bg-white text-black"
            accept={allowedExtensions.join(",")}
            onChange={handleFileChange}
          />
        </div>

        <div>
          <button
            type="button"
            onClick={handleSubmit}
            className="btn bg-[#1E3A8A] text-white border-none hover:bg-[#1E40AF]"
          >
            Upload dataset
          </button>
        </div>

      </form>

      <div className="flex justify-center">
        <div className="flex flex-col gap-4 mt-10 w-[17rem]">
          <button className="btn btn-info" onClick={() => setStep(3)}>
            Previous
          </button>
          <button className="btn btn-accent" onClick={() => setStep(5)}>
            Next
          </button>
        </div>
      </div>

    </fieldset>
  );
};

export default DataSubmissionStep;
