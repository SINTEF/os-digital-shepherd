import React, { ChangeEvent } from 'react';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { observer } from 'mobx-react';
import { selections } from './state';
// import { useTranslation } from 'react-i18next';


interface UserStepProps {
  selectedOption: string;
  setSelectedOption: (value: string) => void;
  setStep: (value: number) => void;
}

const UserStep: React.FC<UserStepProps> = observer((props) => {
  const { setStep, selectedOption, setSelectedOption } = props;
  const { firstTime, setPurpose, setFirstTime } = selections;

  const handleFirstTimeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setFirstTime(event.target.value === 'Yes');
  };

  const handlePurposeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setPurpose(event.target.value);
    setSelectedOption(event.target.value);
    //setStep(1);
  }
  const defaultFirstTimeValue = firstTime === undefined ? "" : firstTime ? "Yes" : "No";
  // const { t } = useTranslation("ns1");

  return (
    <fieldset className="flex flex-col gap-4 pt-10 pb-10 pl-[10rem] pr-[10rem] items-center justify-center w-full">
      <h2 className="fs-title text-xl font-bold">User <div className='tooltip tooltip-right text-left' data-tip="In this step, some basic information around your use are required in order to provide some extra guidance for the next steps." >
        <InformationCircleIcon className='size-5' />
      </div></h2>
      <label className="text-gray-500">Is this your first time using the RESIST Digital Shepherd?</label>
      <select defaultValue={defaultFirstTimeValue} className="select bg-gray-100 select-bordered border-spacing-2 w-full max-w-xs" onChange={handleFirstTimeChange}>
        <option value="">Select an option</option>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select>
      {firstTime && <div className='w-3/4 text-sm text-gray-500'>Then, welcome to the platform! Its purpose is to introduce you to the available RESIST digital-twin technologies and assist you in using them and onboarding data. Please pay extra attention to Step 4, going through all the informational material on the selected technology. Step 5 will assist you on preparing valid datasets for GDT visualization, if that is the purpose of your use.</div>}
      <div className='flex flex-col items-center gap-3 justify-center text-center'>
        <label className="text-gray-500 b-2">What is the main purpose for using the RESIST digital twin in this session?</label>
        <select value={selectedOption} className="select bg-gray-100 select-bordered w-full max-w-xs" onChange={handlePurposeChange}>
          <option value="">Select an option</option>
          <option value="Exploring the digital-twin technologies">Exploring the digital-twin technologies</option>
          <option value="Monitoring and/or planning">Monitoring and/or planning</option>
          <option value="Financial analysis">Financial analysis</option>
          <option value="Showcasing adaptation measures">Showcasing adaptation measures</option>
          <option value="Stakeholder engagement">Stakeholder engagement</option>
          <option value="Triggering discussion with public">Triggering discussion with public</option>
          <option value="Motivating behavioural change">Motivating behavioural change</option>
          <option value="Preparing data, no use of the twin now">Preparing data, no use of the twin now</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className='flex flex-col gap-4 mt-10 w-[17rem]'>
        <button className="btn btn-accent" onClick={() => setStep(1)}>Next</button>
      </div>
    </fieldset>
  );
});

export default UserStep;