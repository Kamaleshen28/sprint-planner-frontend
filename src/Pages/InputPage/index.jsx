import React from 'react';
import './InputPage.css';

import {
  Title,
  InputForm,
  Header,
  StartDateInput,
  TotalDurationInput,
  SprintDurationInput,
} from '../../Components';

function InputPage() {
  const [value, setValue] = React.useState();
  const [startDate, setStartDate] = React.useState();
  const [totalDuration, setTotalDuration] = React.useState();
  const [sprintDuration, setSprintDuration] = React.useState();
  return (
    <>
      {/* <TopBar /> */}
      <Header value={value} setValue={setValue} heading="Sprint Planner" />
      <Title value={value} setValue={setValue} />
      <div className="common-input-section">
        <StartDateInput value={startDate} setValue={setStartDate} />
        <TotalDurationInput value={totalDuration} setValue={setTotalDuration} />
        <SprintDurationInput
          value={sprintDuration}
          setValue={setSprintDuration}
        />
      </div>
      <InputForm />
    </>
  );
}

export default InputPage;
