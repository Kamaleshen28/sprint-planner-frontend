import { Input, InputLabel } from '@mui/material';
import React from 'react';
import './StartDateInput.css';
import PropTypes from 'prop-types';

export default function StartDateInput({ value, setValue }) {
  // const currentDate = new Date();
  // const defaultFormat = currentDate.toISOString().slice(0, 10);
  return (
    <div className="start-date-input">
      <InputLabel htmlFor="startDate">
        <span
          style={{
            fontSize: 'large',
            color: 'grey',
          }}
        >
          Start:
        </span>
      </InputLabel>
      <Input
        id="startDate"
        type="date"
        // defaultValue={defaultFormat}
        value={value || undefined}
        onChange={(event) => setValue(event.target.value)}
        className="startDateInput"
      />
    </div>
  );
}

StartDateInput.propTypes = {
  value: PropTypes.string,
  setValue: PropTypes.func.isRequired,
};
