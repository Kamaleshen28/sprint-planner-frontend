import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
export const DataContext = createContext({});
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const DataProvider = ({ children }) => {
  const navigate = useNavigate();
  const [sprints, setSprints] = useState([]);
  const [apiResponse, setApiResponse] = useState({});
  const [projectId, setProjectId] = useState('');
  useEffect(() => {
    const projectIdLocal = localStorage.getItem('projectId');
    if (projectId || projectIdLocal) {
      const id = projectId || projectIdLocal;
      let url = `http://localhost:8000/api/projects/${id}`;
      axios.get(url).then((res) => {
        setApiResponse(res.data.data);
        setSprints(res.data.data.sprints);
      });
    } else {
      navigate('/create');
    }
  }, []);

  return (
    <DataContext.Provider
      value={{
        sprints,
        setSprints,
        apiResponse,
        setApiResponse,
        projectId,
        setProjectId,
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
