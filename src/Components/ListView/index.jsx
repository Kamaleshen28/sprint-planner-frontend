import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import Developer from '../DeveloperOutput';
import Sprint from '../SprintOutput';
import List from '../List';
import PropTypes from 'prop-types';
import { DataContext } from '../../Contexts/DataContext';
import './ListView.css';

const style = {
  width: '100%',
  height: '70vh',
  minHeight: 400,
  // bgcolor: '#fafafa',
  // border: '2px solid lightgrey',
  // boxShadow: 4,
};

const ListView = ({ heading }) => {
  const { sprints } = useContext(DataContext);

  const developerIdMapping = {};
  const storiesPerDeveloper = sprints.reduce((acc, sprint) => {
    sprint.forEach((story) => {
      story.developers.forEach((developer) => {
        developerIdMapping[developer.id] = developer.name;
        if (!acc[developer.id]) {
          acc[developer.id] = [];
        }
        if (!acc[developer.id].find((exist) => story.id === exist.id))
          acc[developer.id].push(story);
      });
    });
    return acc;
  }, []);

  return (
    <div
      style={{
        height: '90vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        width: '80%',
        margin: '0 auto ',
      }}
    >
      <h1 className="project-title">{heading}</h1>
      <Box
        p={5}
        sx={{
          ...style,
          display: 'flex',
          boxSizing: 'border-box',
          justifyContent: 'space-around',
          rowGap: 10,
          borderRadius: 0.5,
        }}
      >
        <List
          heading="SPRINTS"
          contents={sprints}
          developerIdMapping={developerIdMapping}
        >
          <Sprint />
        </List>

        <List
          heading="DEVELOPERS"
          contents={storiesPerDeveloper}
          developerIdMapping={developerIdMapping}
        >
          <Developer />
        </List>
      </Box>
    </div>
  );
};

ListView.propTypes = {
  heading: PropTypes.string.isRequired,
};
export default ListView;
