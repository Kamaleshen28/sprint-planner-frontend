import React from 'react';
import './TotalDurationInput.css';
import PropTypes from 'prop-types';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { InputLabel } from '@mui/material';

function TotalDurationInput({ value, setValue }) {
  return (
    <div className="total-duration-input">
      <InputLabel>Total Duration ( Weeks ) : </InputLabel>
      <ValidatorForm onSubmit={() => {}} instantValidate>
        <TextValidator
          id="total-duration"
          type="number"
          placeholder="Enter Total Duration"
          value={value || undefined}
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

export default TotalDurationInput;

TotalDurationInput.propTypes = {
  value: PropTypes.number,
  setValue: PropTypes.func.isRequired,
};
