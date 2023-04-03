import { Box, Fab, Tooltip, Button } from '@mui/material';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import DeveloperEntry from '../DeveloperEntry';
import './CSVInput.css';
import {
  parseImportedCSV,
  getDevelopers,
  getStories,
} from '../../utils/common/mappingUtils';

export default function CSVInput({
  setDeveloperList,
  setStoryList,
  handleChange,
  setTitle,
  setStartDate,
  setTotalDuration,
  setSprintDuration,
}) {
  const [data, setData] = useState(null);

  const handleImport = () => {
    if (!data) {
      alert('no data yet!');
      return;
    }
    setDeveloperList(
      getDevelopers(data.developers, data.projectMetaData.sprintCapacity),
    );
    // console.log('setting story list', getStories(data.stories));
    setStoryList(getStories(data.stories));
    setTitle(data.projectMetaData.title);
    setStartDate(data.projectMetaData.projectStartDate);
    setTotalDuration(data.projectMetaData.duration);
    setSprintDuration(data.projectMetaData.sprintDuration);
    // imported successfully
    handleChange(null, 1);
  };

  const handleUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const csvData = reader.result;
      console.log(csvData);
      const parsedData = parseImportedCSV(csvData);
      console.log('parsed data', parsedData);
      setData(parsedData);
    };
    reader.readAsText(file);
  };
  useEffect(() => {
    if (data) {
      handleImport();
    }
  }, [data]);
  return (
    <Button
      variant="outlined"
      component="label"
      sx={{ ml: '24px', mt: '5px', mb: '5px' }}
    >
      Import CSV
      <input type="file" accept=".csv" onChange={handleUpload} hidden />
    </Button>
  );
}

CSVInput.propTypes = {
  setDeveloperList: PropTypes.func,
  setStoryList: PropTypes.func,
  handleChange: PropTypes.func,
  setTitle: PropTypes.func,
  setStartDate: PropTypes.func,
  setTotalDuration: PropTypes.func,
  setSprintDuration: PropTypes.func,
};
