/* eslint-disable react/prop-types */
import React from 'react';
import { DataContext } from '../../Contexts/DataContext';
import { Tab, Tabs, Box, Typography } from '@mui/material';
import CardView from '../CardView';
import PropTypes from 'prop-types';
import './OutputView.css';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 0 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function OutputView(props) {
  const { projectTitle } = props;
  const { sprints } = React.useContext(DataContext);

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

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <h1 className="projectTitle">{projectTitle}</h1>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
          display: 'flex',
          flexDirection: 'row-reverse',
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Sprints" {...a11yProps(0)} />
          <Tab label="Developers" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <CardView
          content={sprints}
          developerIdMapping={developerIdMapping}
          heading="Sprints"
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <CardView
          content={storiesPerDeveloper}
          developerIdMapping={developerIdMapping}
          heading="Developers"
        />
      </TabPanel>
    </Box>
  );
}
