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
  const handleDownload = () => {
    const sampleCSV = `Project Metadata
    title,sprintDuration,totalDuration,sprintCapacity,projectStartDate
    <project title>,<sprint duration in weeks>,<total duration in weeks>,<sprint capacity in days>,<project start date>
    
    Developers
    id,name,capacity
    <developer id>,<developer name>,<developer capacity in days>
    <developer id>,<developer name>,<developer capacity in days>

    Stories
    id,title,dependencies,preAssignedDeveloperId,storyPoints,description
    <story id>,<story title>,<story dependencies ids seperated by -  if any>,<story preassigned developer id if any>,<story points>,<story description>
    <story id>,<story title>,<story dependencies ids seperated by - if any>,<story preassigned developer id if any>,<story points>,<story description>`;

    const downloadLink = document.createElement('a');
    const blob = new Blob([sampleCSV]);
    const url = URL.createObjectURL(blob);
    downloadLink.href = url;
    downloadLink.download = 'sample.csv';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };
  return (
    <div>
      <Button
        variant="outlined"
        component="label"
        sx={{ ml: '24px', mt: '5px', mb: '5px' }}
      >
        Import CSV
        <input type="file" accept=".csv" onChange={handleUpload} hidden />
      </Button>
      <Button
        variant="outlined"
        component="label"
        sx={{ ml: '24px', mt: '5px', mb: '5px' }}
        onClick={handleDownload}
      >
        Download sample CSV
      </Button>
    </div>
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
