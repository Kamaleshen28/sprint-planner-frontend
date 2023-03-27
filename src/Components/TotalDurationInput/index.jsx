import React from 'react';
import './TotalDurationInput.css';
import PropTypes from 'prop-types';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { InputLabel } from '@mui/material';

function TotalDurationInput({ value, setValue }) {
  return (
    <div className="total-duration-input">
      <InputLabel>Total Duration(weeks): </InputLabel>
      <ValidatorForm onSubmit={() => {}} instantValidate>
        <TextValidator
          sx={{
            bgcolor: 'white',
          }}
          id="total-duration"
          type="number"
          placeholder="Enter Total Duration"
          value={value || undefined}
          onChange={(e) => setValue(e.target.value)}
          validators={['required', 'isNumber', 'minNumber:0', 'maxNumber:150']}
          errorMessages={[
            'This field is required',
            'Enter a valid number',
            'Enter a number greater than 0',
            'Enter a number less than 150',
          ]}
        />
      </ValidatorForm>
    </div>
  );
}

export default TotalDurationInput;

TotalDurationInput.propTypes = {
  value: PropTypes.string,
  setValue: PropTypes.func.isRequired,
};
