import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
export const DataContext = createContext({});
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Token } from '@mui/icons-material';
import { useOktaAuth } from '@okta/okta-react';

const DataProvider = ({ children }) => {
  const navigate = useNavigate();
  const [sprints, setSprints] = useState([]);
  const [stories, setStories] = useState([]);
  const [developers, setDevelopers] = useState([]);
  const [comments, setComments] = useState([]);
  const [apiResponse, setApiResponse] = useState({});
  const [projectId, setProjectId] = useState('');
  const [updateSidebar, setUpdateSidebar] = useState(false);
  // const [selectedProject, setSelectedProject] = useState({});

  const { authState } = useOktaAuth();
  // console.log('authState', authState);

  useEffect(() => {
    // console.log('AJJA ETHE');
    // console.log('projectId DataContext', projectId);
    const projectIdLocal = localStorage.getItem('projectId');
    // console.log('projectIdLocal ETHE', projectIdLocal);
    // if (!localStorage.getItem('accessToken')) {
    //   console.log('accessToken ETHE');
    //   // navigate('/login');
    // } else {
    if (projectId || (projectIdLocal && authState?.accessToken.accessToken)) {
      const id = projectId || projectIdLocal;
      let url = `http://localhost:8080/api/projects/${id}`;
      // console.log('KUSHBHI ', authState);
      axios
        .get(url, {
          headers: {
            authorization: authState?.accessToken.accessToken,
          },
        })
        .then((res) => {
          console.log('res.data.data', 'then');
          setApiResponse(res.data.data);
          setSprints(res.data.data.sprints || []);
          setStories(res.data.data.stories);
          setDevelopers(res.data.data.developers);
          setComments(res.data.data.comments);
        })
        .catch((err) => {
          console.log('err', err);
        });
      // } else {
      //   // navigate('/create');
      // }
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
