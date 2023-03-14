import React from 'react';

// import { Topbar, Title, InputForm } from '../../Components';
import { TopBar, Title, InputForm, Header } from '../../Components';

function InputPage() {
  const [value, setValue] = React.useState();
  return (
    <>
      {/* <TopBar /> */}
      <Header value={value} setValue={setValue} />
      <Title value={value} setValue={setValue} />
      <InputForm />
    </>
  );
}

export default InputPage;
