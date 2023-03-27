import React, { useContext } from 'react';
import { Header, OutputView } from '../../Components';
import { DataContext } from '../../Contexts/DataContext';
import './OutputList.css';

export default function OutputList() {
  const { sprints, apiResponse } = useContext(DataContext);
  console.log('sprints', sprints);
  return (
    <>
      {sprints?.length > 0 ? (
        <React.Fragment>
          <Header />
          <div className="list-view">
            <OutputView projectTitle={apiResponse.title} />
          </div>
        </React.Fragment>
      ) : null}
    </>
  );
}
