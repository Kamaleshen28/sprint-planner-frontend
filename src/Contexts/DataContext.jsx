import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
export const DataContext = createContext({});
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useOktaAuth } from '@okta/okta-react';

const DataProvider = ({ children }) => {
  const [sprints, setSprints] = useState([]);
  const [stories, setStories] = useState([]);
  const [developers, setDevelopers] = useState([]);
  const [comments, setComments] = useState([]);
  const [apiResponse, setApiResponse] = useState({});
  const [projectId, setProjectId] = useState('');
  const [updateSidebar, setUpdateSidebar] = useState(false);
  const { authState } = useOktaAuth();

  useEffect(() => {
    const projectIdLocal = localStorage.getItem('projectId');
    if (projectId || (projectIdLocal && authState?.accessToken.accessToken)) {
      const id = projectId || projectIdLocal;
      let url = `http://localhost:8080/api/projects/${id}`;
      axios
        .get(url, {
          headers: {
            authorization: authState?.accessToken.accessToken,
          },
        })
        .then((res) => {
          setApiResponse(res.data.data);
          setSprints(res.data.data.sprints || []);
          setStories(res.data.data.stories);
          setDevelopers(res.data.data.developers);
          setComments(res.data.data.comments);
        })
        .catch((err) => {
          console.log('err', err);
        });
    }
  }, [projectId, authState]);

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
        comments,
        setComments,
        updateSidebar,
        setUpdateSidebar,
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
