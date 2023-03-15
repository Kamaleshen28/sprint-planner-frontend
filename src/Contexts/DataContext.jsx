import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
export const DataContext = createContext({});
import PropTypes from 'prop-types';

const DataProvider = ({ children }) => {
  const [sprints, setSprints] = useState([]);
  const [stories, setStories] = useState([]);
  const [developers, setDevelopers] = useState([]);
  const [apiResponse, setApiResponse] = useState({});
  useEffect(() => {
    let url =
      'http://localhost:8000/api/projects/28b52660-d0d2-4c01-9cda-a584771ccdcc';
    axios.get(url).then((res) => {
      setApiResponse(res.data.data);
      setSprints(res.data.data.sprints);
      setStories(res.data.data.stories);
      setDevelopers(res.data.data.developers);
    });
  }, []);

  return (
    <DataContext.Provider
      value={{
        sprints,
        setSprints,
        apiResponse,
        setApiResponse,
        stories,
        setStories,
        developers,
        setDevelopers,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default DataProvider;
