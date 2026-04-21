import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { MagnifyingGlassIcon, InformationCircleIcon } from "@heroicons/react/24/outline";

interface DataPreparationStepProps {
  setStep: (value: number) => void;
  selectedOption: string;
  setSelectedOption: (value: string) => void;
}

interface DataItem {
  link: string;
  type?: string;
  format?: string;
  description?: string;
}

interface ToolItem {
  link: string;
  name?: string;
  description?: string;
}

interface Solution {
  solution_name: string;
  solution_status: string;
  description: string;
  data: DataItem[];
  tools: ToolItem[];
}

const Region1_DATA: Solution[] = [
  {
    solution_name: "Region1 Coastal Erosion Study1",
    solution_status: "Active",
    description: "Analysis of coastal erosion patterns and mitigation strategies in Region1 region",
    data: [
      { link: "https://example.com/Region1-erosion-data.csv", type: "CSV", format: "CSV", description: "Coastal erosion measurements" },
      { link: "https://example.com/Region1-surveys.geojson", type: "GeoJSON", format: "GeoJSON", description: "Survey points and erosion zones" }
    ],
    tools: [
      { link: "https://example.com/Region1-surveys.geojson", name: "GeoJSON Editor", description: "Edit and visualize spatial data" }
    ]
  },
  {
    solution_name: "Region1 Coastal Erosion Study2",
    solution_status: "Active",
    description: "Analysis of coastal erosion patterns and mitigation strategies in Region1 region",
    data: [
      { link: "https://example.com/Region1-climate-data.csv", type: "CSV", format: "CSV", description: "Climate and weather data" }
    ],
    tools: [
      { link: "https://example.com/Region1-surveys.geojson", name: "CSV Editor", description: "Edit CSV files online" }
    ]
  },
  {
    solution_name: "Region1 Coastal Erosion Study3",
    solution_status: "Planning",
    description: "Analysis of coastal erosion patterns and mitigation strategies in Region1 region",
    data: [
      { link: "https://example.com/Region1-species.csv", type: "CSV", format: "CSV", description: "Species inventory and distribution" }
    ],
    tools: []
  },
  {
    solution_name: "Region1 Coastal Erosion Study4",
    solution_status: "Active",
    description: "Analysis of coastal erosion patterns and mitigation strategies in Region1 region",
    data: [
      { link: "https://example.com/Region1-erosion-data.csv", type: "CSV", format: "CSV", description: "Coastal erosion measurements" },
      { link: "https://example.com/Region1-surveys.geojson", type: "GeoJSON", format: "GeoJSON", description: "Survey points and erosion zones" }
    ],
    tools: [
      { link: "https://example.com/Region1-surveys.geojson", name: "GeoJSON Editor", description: "Edit and visualize spatial data" }
    ]
  },
  {
    solution_name: "Region1 Coastal Erosion Study5",
    solution_status: "Active",
    description: "Analysis of coastal erosion patterns and mitigation strategies in Region1 region",
    data: [
      { link: "https://example.com/Region1-climate-data.csv", type: "CSV", format: "CSV", description: "Climate and weather data" }
    ],
    tools: [
      { link: "https://example.com/Region1-surveys.geojson", name: "CSV Editor", description: "Edit CSV files online" }
    ]
  },
  {
    solution_name: "Region1 Coastal Erosion Study6",
    solution_status: "Planning",
    description: "Analysis of coastal erosion patterns and mitigation strategies in Region1 region",
    data: [
      { link: "https://example.com/Region1-species.csv", type: "CSV", format: "CSV", description: "Species inventory and distribution" }
    ],
    tools: []
  }
];

const DataTabsInline: React.FC<{ dataPreparation: string }> = observer(({ dataPreparation }) => {
  const [selectedTab, setSelectedTab] = useState(1);
  const [selectedSolution, setSelectedSolution] = useState<Solution | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = Region1_DATA.filter((item) =>
    JSON.stringify(item).toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleClick = (solution: Solution) => {
    setSelectedSolution(solution);
  };

  if (dataPreparation !== "Yes") {
    return null;
  }

  return (
    <div className="flex flex-col mt-10">
      <div role="tablist" className="tabs tabs-md tabs-boxed">
        <a
          className={`tab text-base ${selectedTab === 1 ? "tab-active hover:bg-info" : ""}`}
          onClick={() => setSelectedTab(1)}
        >
          RESIST repository{" "}
          <div
            className="tooltip tooltip-right text-left"
            data-tip="Here, you can search through Region1's RESIST-repository entries to get access to data that may be of interest when formatting your dataset(s)."
          >
            <InformationCircleIcon className="size-5" />
          </div>
        </a>
        <a
          className={`tab text-base ${selectedTab === 2 ? "tab-active" : ""}`}
          onClick={() => setSelectedTab(2)}
        >
          Data templates{" "}
          <div
            className="tooltip tooltip-right text-left"
            data-tip="These templates can serve as a starting material when formatting your datasets."
          >
            <InformationCircleIcon className="size-5" />
          </div>
        </a>
        <a
          className={`tab text-base ${selectedTab === 3 ? "tab-active" : ""}`}
          onClick={() => setSelectedTab(3)}
        >
          Online editing tools{" "}
          <div
            className="tooltip tooltip-right text-left"
            data-tip="You can use these online tools to format your datasets for the GDT."
          >
            <InformationCircleIcon className="size-5" />
          </div>
        </a>
      </div>

      {selectedTab === 1 && (
        <div className="bg-[#EDE3D3] border-base-300 p-5 text-neutral">
          <div className="flex flex-col">
            <label className="font-bold italic text-gray-500 mb-3 flex items-center gap-2">
              <MagnifyingGlassIcon className="size-4 inline" />
              <span>Search in Region1's RESIST Repository</span>
            </label>

            <div className="flex flex-row gap-2 justify-center h-full">
              <div className="flex flex-col items-center gap-2 w-1/3">
                <input
                  id="search"
                  type="text"
                  className="input input-bordered w-full max-w-xs text-neutral-content bg-neutral"
                  placeholder="Start typing here..."
                  onChange={(e) => setSearchTerm(e.target.value)}
                />

                <div className="flex flex-col w-full h-[20rem] overflow-scroll bg-[#EDE3D3] gap-1">
                  {filteredData.map((item) => (
                    <button
                      className="btn btn-neutral btn-block text-sm h-fit p-2"
                      key={item.solution_name}
                      onClick={() => handleClick(item)}
                    >
                      {item.solution_name}
                    </button>
                  ))}
                </div>
              </div>

              {selectedSolution && (
                <div className="card bg-neutral text-primary shadow-lg p-4 text-start w-2/3">
                  <p className="card-subtitle text-xs">
                    <i>
                      {selectedSolution.solution_status
                        ? `(${selectedSolution.solution_status})`
                        : ``}
                    </i>
                  </p>
                  <h4 className="card-title text-normal font-bold text-wrap">
                    {selectedSolution.solution_name}
                  </h4>
                  <p className="text-sm mb-2">{selectedSolution.description}</p>

                  {selectedSolution.data.length > 0 && (
                    <div className="text-sm">
                      <h5 className="font-semibold mb-2">Data:</h5>
                      <ul className="list-disc pl-5">
                        {selectedSolution.data.map((item, idx) => (
                          <li key={idx}>
                            <a href={item.link} target="_blank" rel="noopener noreferrer" className="link link-accent">
                              {item.description || item.link}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {selectedSolution.tools.length > 0 && (
                    <div className="text-sm mt-3">
                      <h5 className="font-semibold mb-2">Tools:</h5>
                      <ul className="list-disc pl-5">
                        {selectedSolution.tools.map((tool, idx) => (
                          <li key={idx}>
                            <a href={tool.link} target="_blank" rel="noopener noreferrer" className="link link-accent">
                              {tool.name || tool.link}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {selectedTab === 2 && (
        <div className="bg-[#EDE3D3] border-base-300 p-6">
          <div className="flex flex-col">
            <div className="flex flex-col gap-4">
              <div className="flex flex-row gap-4 justify-center p-10">
                <a className="btn btn-neutral" href="https://example.com/template1.csv" target="_blank">Template1 (.csv)</a>
                <a className="btn btn-neutral" href="https://example.com/template2.csv" target="_blank">Template2 (.csv)</a>
                <a className="btn btn-neutral" href="https://example.com/template3.csv" target="_blank">Template3 (.csv)</a>
                <a className="btn btn-neutral" href="https://example.com/template4.csv" target="_blank">Template4 (.csv)</a>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedTab === 3 && (
        <div className="bg-[#EDE3D3] border-spacing-2 border-purple p-6">
          <div className="flex flex-col">
            <div className="flex flex-col gap-4">
              <div className="flex flex-row gap-4 justify-center p-10">
                <a className="btn btn-neutral" href="https://example.com/tool1/" target="_blank">Tool1 (CSV/GeoJSON)</a>
                <a className="btn btn-neutral" href="https://example.com/tool2/" target="_blank">Tool2 (CSV)</a>
                <a className="btn btn-neutral" href="https://example.com/tool3/" target="_blank">Tool3 (CSV)</a>
                <a className="btn btn-neutral" href="https://example.com/tool4/" target="_blank">Tool4 (GeoJSON/CSV)</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

const DataPreparationStep: React.FC<DataPreparationStepProps> = observer((props) => {
  const { setStep, selectedOption, setSelectedOption } = props;
  const defaultValue = selectedOption;
  const [error, setError] = useState<string | null>(null);

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedOption(value);

    if (value !== "") {
      setError(null);
    }
  };

  const handleNext = () => {
    if (selectedOption === "") {
      setError("Please provide an answer");
    } else {
      setError(null);
      setStep(selectedOption === "No" ? 5 : 4);
    }
  };

  return (
    <fieldset className="flex flex-col gap-4 pt-10 pb-10 pl-[10rem] pr-[10rem] items-center justify-center w-full">
      <label className="text-gray-500">Do you want to prepare/provide new data to the GDT?</label>
      <select defaultValue={defaultValue} className="select bg-gray-100 select-bordered border-spacing-2 w-full max-w-xs"
        onChange={(event) => handleOptionChange(event)}>
        <option value="">Select an option</option>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select>
      {selectedOption === 'Yes' && <DataTabsInline dataPreparation={selectedOption} />}
      
      <div className='flex flex-col gap-4 mt-10 w-[17rem]'>
        <button className="btn btn-info" onClick={() => setStep(2)}>Previous</button>
        <button className="btn btn-accent" onClick={handleNext}>Next</button>
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </fieldset>
  );
});

export default DataPreparationStep;