/* eslint-disable react/prop-types */
import React, { useState, useContext } from 'react';
import { Tab, Tabs, Box, Typography } from '@mui/material';
import CardTest from '../CardTest';
import CardTestDeveloper from '../CardTestDeveloper';
import NewList from '../NewList';
import { DataContext } from '../../Contexts/DataContext';
import PropTypes from 'prop-types';

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
        <Box sx={{ p: 3 }}>
          <Typography component={'span'}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.proptypes = {
  props: PropTypes.shape({
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  }),
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function NewListView() {
  const [value, setValue] = useState(1);
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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      {sprints.length !== 0 && (
        <Box sx={{ width: '100%' }}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: 'divider',
              display: 'flex',
              flexDirection: 'row-reverse',
            }}
          >
            <Tabs
              sx={{ pr: '24px' }}
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Sprints" {...a11yProps(0)} />
              <Tab label="Developers" {...a11yProps(1)} sx={{ pr: 0 }} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <NewList
              heading="SPRINTS"
              contents={sprints}
              developerIdMapping={developerIdMapping}
            >
              <CardTest />
            </NewList>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <NewList
              heading="DEVELOPERS"
              contents={storiesPerDeveloper}
              developerIdMapping={developerIdMapping}
            >
              <CardTestDeveloper />
            </NewList>
          </TabPanel>
        </Box>
      )}
    </>
  );
}
