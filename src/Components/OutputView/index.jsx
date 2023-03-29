/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { DataContext } from '../../Contexts/DataContext';
import {
  Tab,
  Tabs,
  Box,
  Typography,
  Autocomplete,
  TextField,
} from '@mui/material';
import CardView from '../CardView';
import PropTypes from 'prop-types';
import './OutputView.css';
import { ElectricalServices } from '@mui/icons-material';

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
          <Typography component="span">{children}</Typography>
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
  const [selectedDeveloper, setSelectedDeveloper] = React.useState({
    label: 'All',
  });
  const { projectTitle } = props;
  const { sprints } = React.useContext(DataContext);
  const [filteredSprints, setFilteredSprints] = React.useState(sprints);
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

  useEffect(() => {
    if (selectedDeveloper?.label && selectedDeveloper?.label !== 'All') {
      const filteredSprints = sprints.map((sprint) =>
        sprint.filter((story) =>
          story.developers.find(
            (developer) => developer.name === selectedDeveloper?.label,
          ),
        ),
      );
      setFilteredSprints(filteredSprints);
    } else {
      setFilteredSprints(sprints);
    }
  }, [selectedDeveloper]);

  const allDevelopers = [
    { label: 'All' },
    ...Object.keys(developerIdMapping).map((key) => ({
      label: developerIdMapping[key],
    })),
  ];
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
          // flexDirection: 'row-reverse',
        }}
      >
        {value == 0 && allDevelopers.length !== 0 && (
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={allDevelopers}
            onChange={(event, newValue) => {
              setSelectedDeveloper(newValue);
            }}
            sx={{
              width: 300,
              marginLeft: '5.5vw',
              backgroundColor: 'white',
              height: '43px',
              my: 'auto',
              borderRadius: '4px',
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Developer"
                variant="outlined"
              />
            )}
            value={selectedDeveloper}
            isOptionEqualToValue={(option, value) =>
              option.value === value.value
            }
          />
        )}

        <Tabs
          sx={{ marginLeft: 'auto' }}
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
          content={filteredSprints}
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
