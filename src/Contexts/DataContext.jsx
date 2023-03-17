import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
export const DataContext = createContext({});
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Token } from '@mui/icons-material';

const DataProvider = ({ children }) => {
  const navigate = useNavigate();
  const [sprints, setSprints] = useState([]);
  const [stories, setStories] = useState([]);
  const [developers, setDevelopers] = useState([]);
  const [apiResponse, setApiResponse] = useState({});
  const [projectId, setProjectId] = useState('');

  useEffect(() => {
    console.log('projectId', projectId);
    const projectIdLocal = localStorage.getItem('projectId');
    if (projectId || projectIdLocal) {
      const id = projectId || projectIdLocal;
      let url = `http://localhost:8080/api/projects/${id}`;
      axios
        .get(url, {
          headers: { authorization: localStorage.getItem('accessToken') },
        })
        .then((res) => {
          setApiResponse(res.data.data);
          setSprints(res.data.data.sprints);
          setStories(res.data.data.stories);
          setDevelopers(res.data.data.developers);
        });
    } else {
      if (!localStorage.getItem('accessToken')) {
        navigate('/login');
      } else {
        navigate('/create');
      }
    }
  }, [projectId]);

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
