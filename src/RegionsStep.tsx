import React from 'react';
import { observer } from 'mobx-react';

interface UserStepProps {
  selectedOption: string;
  setSelectedOption: (value: string) => void;
  setStep: (value: number) => void;
}

const UserStep: React.FC<UserStepProps> = observer((props) => {
  const { setStep } = props;

  const apiRegionName = (localStorage.getItem("name") || "").toLowerCase();

  const items = [
    { id: 1,  name: "Region1",  country: "RE", img: "/shepherd/regions/region1.jpg",  risks: "Floods, Droughts", pdf: "/shepherd/regions/poster.pdf" },
    { id: 2,  name: "Region2",  country: "EL", img: "/shepherd/regions/region2.jpg",  risks: "Floods, Droughts", pdf: "/shepherd/regions/poster.pdf" },
    { id: 3,  name: "Region3",  country: "FR", img: "/shepherd/regions/region3.jpg",  risks: "Floods, Soil Erosion", pdf: "/shepherd/regions/poster.pdf" },
    { id: 4,  name: "Region4",  country: "FI", img: "/shepherd/regions/region4.jpg",  risks: "Floods, Droughts, Heatwaves", pdf: "/shepherd/regions/poster.pdf" },
    { id: 5,  name: "Region5",  country: "NO", img: "/shepherd/regions/region5.jpg",  risks: "Floods, Heatwaves", pdf: "/shepherd/regions/poster.pdf" },
  ];

  return (
    <fieldset className="flex flex-col gap-4 pt-10 pb-10 px-10 items-center w-full">
      <div className="w-full pt-4 px-10">
        <h2 className="text-gray-500 mb-4">
          RESIST is working with a group of regions across Europe to increase their resilience to the effects of climate change
        </h2>

        <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(180px,1fr))]">
          {items.map((i) => {
            const isActive = i.name.toLowerCase() === apiRegionName;
            const cardClass = isActive
              ? "card bg-yellow-200 border-4 border-yellow-500 shadow-xl rounded-lg transition"
              : "card bg-base-200 shadow-none rounded-lg border border-base-300 hover:shadow-md transition";

            return (
              <div key={i.id} className={cardClass}>
                <figure className="h-32 overflow-hidden">
                  <img className="w-full h-full object-cover" src={i.img} alt="" />
                </figure>

                <div className="card-body p-4 gap-2">
                  <h2 className="card-title text-sm font-semibold block">
                    {i.name}
                  </h2>

                  <p className="text-xs opacity-70">
                    Climate risks:<br />
                    <span className="font-bold">{i.risks}</span>
                  </p>

                  <div className="card-actions block">
                    <a href={i.pdf} target="_blank" className="btn btn-primary btn-xs flex justify-center">Activities</a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-center">
        <div className="flex flex-col gap-4 mt-10 w-[17rem]">
          <button className="btn btn-info" onClick={() => setStep(0)}>Previous</button>
          <button className="btn btn-accent" onClick={() => setStep(2)}>Next</button>
        </div>
      </div>
    </fieldset>
  );
});

export default UserStep;
