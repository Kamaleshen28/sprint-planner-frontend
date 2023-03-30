import { Box, Fab, Tooltip } from '@mui/material';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
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
  const handleImport = () => {
    if (!data) {
      alert('no data yet!');
      return;
    }
    setDeveloperList(
      getDevelopers(data.developers, data.projectMetaData.sprintCapacity),
    );
    setStoryList(getStories(data.stories));
    setTitle(data.projectMetaData.title);
    setStartDate(data.projectMetaData.projectStartDate);
    setTotalDuration(data.projectMetaData.duration);
    setSprintDuration(data.projectMetaData.sprintDuration);
    // imported successfully
    handleChange(null, 1);
  };
  return (
    <>
      <div className="csv-input-container">
        <input type="file" accept=".csv" onChange={handleUpload} />
        <button onClick={handleImport}>Import</button>
      </div>
    </>
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
