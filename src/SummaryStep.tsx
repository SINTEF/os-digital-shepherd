import React, { useState } from "react";
import { observer } from "mobx-react";
import { ChevronDoubleRightIcon } from "@heroicons/react/16/solid";

interface SummaryStepProps {
  setStep: (step: number) => void;
  optionList: Record<string, string>;
}

const SummaryStep: React.FC<SummaryStepProps> = observer((props) => {
  const { setStep } = props;
  const [showMissingRequiredFields, setShowMissingRequiredFields] =
    useState<boolean>(false);

  // Static demo datasets
  const demoDatasets = "Lorem ipsum dolor sit amet1 (CSV), Lorem ipsum dolor sit amet2 (CSV)";

  function onFinishForm(): void {
    // Demo mode: open visualization platform in new tab
    setShowMissingRequiredFields(false);
    window.open("https://example.com/gdt-platform", "_blank");
  }

  return (
    <fieldset className="flex flex-col gap-4 pt-10 pb-10 pl-[10rem] pr-[10rem] items-center justify-center w-full">
      <div className="text-2xl space-y-1">
        Selected datasets to load in the GDT:{" "}<br />
      <span className="text-lg">
        <span className="font-normal">{demoDatasets}</span>
        </span>
      </div>

      {showMissingRequiredFields && (
        <div className="text-red-500">Required fields are missing</div>
      )}


      <div className="flex flex-col gap-4 mt-10 w-[17rem]">
        <button className="btn btn-info" onClick={() => setStep(5)}>
          Previous
        </button>
        <button className="btn btn-warning w-full" onClick={onFinishForm}>
          Load the Graphical Digital Twin{""}<ChevronDoubleRightIcon className="size-5" />
        </button>
      </div>
    </fieldset>
  );
});

export default SummaryStep;
