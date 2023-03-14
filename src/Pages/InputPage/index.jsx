import React from 'react';

import { Title, InputForm, Header, StartDateInput } from '../../Components';

function InputPage() {
  const [value, setValue] = React.useState();
  const [startDate, setStartDate] = React.useState();
  return (
    <>
      <Header value={value} setValue={setValue} />
      <Title value={value} setValue={setValue} />
      <div className="common-input-section">
        <StartDateInput value={startDate} setValue={setStartDate} />
      </div>
      <InputForm />
    </>
  );
}

export default InputPage;
