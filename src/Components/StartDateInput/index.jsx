import { Input, InputLabel } from '@mui/material';
import React from 'react';
import './StartDateInput.css';
import PropTypes from 'prop-types';

export default function StartDateInput({ value, setValue }) {
  return (
    // <div style={{ width: '300px' }}>
    //   <label htmlFor="startDate">Start Date</label>
    //   <input
    //     id="startDate"
    //     type="date"
    //     value={value}
    //     onChange={(event) => setValue(event.target.value)}
    //   />
    // </div>
    <div style={{ marginLeft: '30px' }}>
      <InputLabel htmlFor="startDate">
        <span
          style={{
            fontSize: 'large',
            color: 'grey',
          }}
        >
          Start:
        </span>
        <Input
          id="startDate"
          type="date"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          className="startDateInput"
        />
      </InputLabel>
    </div>
  );
}

StartDateInput.propTypes = {
  value: PropTypes.string,
  setValue: PropTypes.func,
};
