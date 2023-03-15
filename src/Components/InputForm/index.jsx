/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import './InputForm.css';
import { Tab, Tabs, Box, Typography, Button } from '@mui/material';
import DeveloperInput from '../DeveloperInput';
import StoryInput from '../StoryInput';
import PropTypes from 'prop-types';

const storiesData = [
  {
    id: 1,
    stories: 'Authentication',
    dependencies: [],
    developer: [],
    storyPoints: 4,
  },
  {
    id: 2,
    stories: 'Frontend',
    dependencies: [1],
    developer: [],
    storyPoints: 4,
  },
  {
    id: 3,
    stories: 'BackEnd',
    dependencies: [],
    developer: [2],
    storyPoints: 4,
  },
  {
    id: 4,
    stories: 'Database',
    dependencies: [2, 3],
    developer: [],
    storyPoints: 4,
  },
];
const developersData = [
  { id: 1, developer: 'Harbir', sprintCapacity: 8, capacity: 14 },
  { id: 2, developer: 'Smita', sprintCapacity: 8, capacity: 42 },
  { id: 3, developer: 'Mukul', sprintCapacity: 8, capacity: 34 },
  { id: 4, developer: 'Kamleshan', sprintCapacity: 8, capacity: 54 },
];

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
          <Typography>{children}</Typography>
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

export default function InputForm() {
  const [storyList, setStoryList] = useState(storiesData);
  const [developerList, setDeveloperList] = useState(developersData);
  const [value, setValue] = useState(0);

  const deleteCheck = (id) => {
    // return true if stories.developer does not contain id
    let check = true;
    storyList.forEach((story) => {
      if (story.developer.includes(id)) check = false;
    });
    return check;
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
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
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Stories" {...a11yProps(0)} />
            <Tab label="Developers" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <StoryInput
            storyList={storyList}
            setStoryList={setStoryList}
            developerList={developerList}
          />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <DeveloperInput
            developerList={developerList}
            setDeveloperList={setDeveloperList}
            deleteCheck={deleteCheck}
          />
        </TabPanel>
      </Box>
      <Button sx={{ width: '10%', mx: 'auto' }} variant="contained">
        Submit
      </Button>
    </>
  );
}
