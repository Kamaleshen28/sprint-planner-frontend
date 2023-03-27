/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import './InputForm.css';
import { Tab, Tabs, Box, Typography } from '@mui/material';
import DeveloperInput from '../DeveloperInput';
import StoryInput from '../StoryInput';
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

export default function InputForm({
  storyList,
  setStoryList,
  developerList,
  setDeveloperList,
}) {
  const [value, setValue] = useState(1);

  const deleteCheck = (id) => {
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
            sx={{ pr: '24px' }}
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Stories" {...a11yProps(0)} />
            <Tab label="Developers" {...a11yProps(1)} sx={{ pr: 0 }} />
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
    </>
  );
}

InputForm.propTypes = {
  storyList: PropTypes.arrayOf(PropTypes.object),
  setStoryList: PropTypes.func,
  developerList: PropTypes.arrayOf(PropTypes.object),
  setDeveloperList: PropTypes.func,
};
