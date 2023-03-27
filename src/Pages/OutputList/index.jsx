import React, { useContext } from 'react';
import { Header, NewListView, OutputView } from '../../Components';
import { DataContext } from '../../Contexts/DataContext';
import './OutputList.css';

export default function OutputList() {
  const { sprints, apiResponse } = useContext(DataContext);
  return (
    <>
      {sprints?.length > 0 ? (
        <React.Fragment>
          <Header />
          <div className="list-view">
            {/* <NewListView heading={apiResponse.title} /> */}
            <OutputView projectTitle={apiResponse.title} />
          </div>
        </React.Fragment>
      ) : null}
    </>
  );
}
