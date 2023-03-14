import React, { useContext } from 'react';
import { Header, ListView } from '../../Components';
import { DataContext } from '../../Contexts/DataContext';
import './OutputList.css';

export default function OutputList() {
  const { sprints, apiResponse } = useContext(DataContext);
  return (
    <>
      {sprints.length ? (
        <React.Fragment>
          <Header heading={apiResponse.title} />
          <div className="list-view">
            <ListView />
          </div>
        </React.Fragment>
      ) : null}
    </>
  );
}
