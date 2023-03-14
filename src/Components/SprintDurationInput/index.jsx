import React from 'react';
import './SprintDurationInput.css';
import PropTypes from 'prop-types';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { InputLabel } from '@mui/material';

function SprintDurationInput({ value, setValue }) {
  return (
    <div className="sprint-duration-input">
      {/* <span>Total Duration</span> */}
      <InputLabel>SprintDuration(Weeks): </InputLabel>
      <ValidatorForm>
        <TextValidator
          id="sprint-duration"
          type="number"
          placeholder="Enter Sprint Duration"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          validators={['required', 'isNumber', 'minNumber:0']}
          errorMessages={[
            'This field is required',
            'Enter a valid number',
            'Enter a number greater than 0',
          ]}
        />
      </ValidatorForm>
    </div>
  );
}

export default SprintDurationInput;

SprintDurationInput.propTypes = {
  value: PropTypes.number.isRequired,
  setValue: PropTypes.func.isRequired,
};
