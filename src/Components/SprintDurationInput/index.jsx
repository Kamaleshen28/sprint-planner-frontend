import React from 'react';
import './SprintDurationInput.css';
import PropTypes from 'prop-types';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { InputLabel } from '@mui/material';

function SprintDurationInput({ value, setValue }) {
  return (
    <div className="sprint-duration-input">
      <InputLabel>Sprint Duration(weeks): </InputLabel>
      <ValidatorForm onSubmit={() => {}} instantValidate={true}>
        <TextValidator
          id="sprint-duration"
          type="number"
          placeholder="Enter Sprint Duration"
          value={value || undefined}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          validators={['required', 'isNumber', 'minNumber:0', 'maxNumber:5']}
          errorMessages={[
            'This field is required',
            'Enter a valid number',
            'Enter a positive number',
            'Enter a number less than 5',
          ]}
        />
      </ValidatorForm>
    </div>
  );
}

export default SprintDurationInput;

SprintDurationInput.propTypes = {
  value: PropTypes.string,
  setValue: PropTypes.func.isRequired,
};
