import React from 'react';
import { observer } from 'mobx-react';

interface UserStepProps {
  selectedOption: string;
  setSelectedOption: (value: string) => void;
  setStep: (value: number) => void;
}

const UserStep: React.FC<UserStepProps> = observer((props) => {
  const { setStep } = props;


  return (
    <fieldset className="flex flex-col gap-4 pt-10 pb-10 pl-[10rem] pr-[10rem] items-center justify-center w-full">
    <div className="w-full flex justify-center pt-4">
      <div className="max-w-3xl px-6">
        <h3 className="text-2xl mb-6">
          Welcome to the RESIST Digital Shepherd<br />for the region of {localStorage.getItem("name")}!
        </h3>

        <p className="mb-4">
          This platform functions as an information gate and an onboarding environment for the RESIST
          project's Graphical Digital Twin technology. It provides orientation
          on the participating regions, the AugmentCity GDT system, the
          preparation workflow for geographical datasets, and the steps required
          to visualize those datasets inside the GDT.
        </p>

        <p className="mb-4">
          Use <strong>Take a tour</strong> in the upper-right menu for a
          structured walkthrough of each stage.
        </p>

        <p className="mb-4">
          Use <strong>Support</strong> for operational issues.
        </p>
      </div>
    </div>

      <div className='flex flex-col gap-4 mt-10 w-[17rem]'>
        <button className="btn btn-accent" onClick={() => setStep(1)}>Next</button>
      </div>
    </fieldset>
  );
});

export default UserStep;