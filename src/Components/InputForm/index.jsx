import React, { useState } from 'react';
import './InputForm.css';
import { Tab, Tabs, Box, Typography } from '@mui/material';
import DeveloperInput from '../DeveloperInput';
import StoryInput from '../StoryInput';
import PropTypes from 'prop-types';
import CSVInput from '../CSVInput';
import { useLocation } from 'react-router-dom';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  // url location ends with /edit

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

TabPanel.propTypes = {
  children: PropTypes.node.isRequired,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
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
  setTitle,
  setStartDate,
  setTotalDuration,
  setSprintDuration,
}) {
  const location = useLocation();
  console.log('location', location);
  const isEditUrl = location.pathname.endsWith('/edit');
  console.log('isEditUrl', isEditUrl);
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
            justifyContent: 'space-between',
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
            {/* <Tab label="Import CSV" {...a11yProps(1)} sx={{ pr: 0 }} /> */}
          </Tabs>
          {!isEditUrl && (
            <CSVInput
              setDeveloperList={setDeveloperList}
              handleChange={handleChange}
              setStoryList={setStoryList}
              setTitle={setTitle}
              setStartDate={setStartDate}
              setTotalDuration={setTotalDuration}
              setSprintDuration={setSprintDuration}
            />
          )}
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
        {/* <TabPanel value={value} index={2}>
          <CSVInput
            setDeveloperList={setDeveloperList}
            handleChange={handleChange}
            setStoryList={setStoryList}
            setTitle={setTitle}
            setStartDate={setStartDate}
            setTotalDuration={setTotalDuration}
            setSprintDuration={setSprintDuration}
          />
        </TabPanel> */}
      </Box>
    </>
  );
}

InputForm.propTypes = {
  storyList: PropTypes.arrayOf(PropTypes.object),
  setStoryList: PropTypes.func,
  developerList: PropTypes.arrayOf(PropTypes.object),
  setDeveloperList: PropTypes.func,
  setTitle: PropTypes.func,
  setStartDate: PropTypes.func,
  setTotalDuration: PropTypes.func,
  setSprintDuration: PropTypes.func,
};
