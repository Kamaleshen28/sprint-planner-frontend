import React from 'react';

import { Title, InputForm, Header, StartDateInput } from '../../Components';

function InputPage() {
  const [value, setValue] = React.useState();
  const [startDate, setStartDate] = React.useState();
  return (
    <>
      {/* <TopBar /> */}
      <Header value={value} setValue={setValue} heading="Sprint Planner" />
      <Title value={value} setValue={setValue} />
      <div className="common-input-section">
        <StartDateInput value={startDate} setValue={setStartDate} />
      </div>
      <InputForm />
    </>
  );
}

export default InputPage;
