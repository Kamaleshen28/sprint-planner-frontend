import {
  Box,
  createTheme,
  responsiveFontSizes,
  TextField,
  IconButton,
} from '@mui/material';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Edit } from '@mui/icons-material';

let theme = createTheme();
theme = responsiveFontSizes(theme);

const InlineEdit = ({ value, setValue, isActive, setIsActive }) => {
  const [editingValue, setEditingValue] = useState(value || '');

  const onChange = (event) => setEditingValue(event.target.value);

  const onKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === 'Escape') {
      event.target.blur();
    }
  };

  const onBlur = (event) => {
    setValue(event.target.value);
    setIsActive(false);
  };

  return (
    <TextField
      // sx={{ width: '100%', textAlign: 'center' }}
      id="standard-basic"
      variant="standard"
      type="text"
      placeholder="Enter Project Name"
      aria-label="Field name"
      // defaultValue={'Project Name'}
      value={editingValue}
      // disabled={!isActive}
      onChange={onChange}
      onKeyDown={onKeyDown}
      onBlur={onBlur}
      sx={{
        width: 300,
        textAlign: 'center',
        alignSelf: 'center',
        margin: 'auto',
        pointerEvents: isActive ? 'auto' : 'none',
        '& .MuiInput-underline:before': {
          borderBottom: isActive ? '1px solid #000' : 'none',
        },
        '& .MuiInput-underline:after': {
          borderBottom: isActive ? '1px solid #000' : 'none',
        },
        '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
          borderBottom: isActive ? '1px solid #000' : 'none',
        },
      }}
    />
  );
};

export default function Title({ value, setValue }) {
  // const [value, setValue] = useState();
  const [isActive, setIsActive] = useState(true);
  const handleClick = () => {
    setIsActive(true);
  };
  return (
    <Box
      component="span"
      mx="auto"
      display="flex"
      sx={{ mt: 2 }}
      width={400}
      height={40}
      bgcolor={isActive ? '#e4eef1' : 'transparent'}
      justifyContent={'space-between'}
      alignItems={'center'}
      borderRadius={'2px'}
    >
      <InlineEdit
        value={value}
        variant="h1"
        theme={theme}
        setValue={setValue}
        isActive={isActive}
        setIsActive={setIsActive}
        InputProps={{
          disableUnderline: !isActive,
        }}
      />
      <IconButton onClick={handleClick}>
        <Edit />
      </IconButton>
    </Box>
  );
}

InlineEdit.propTypes = {
  value: PropTypes.string,
  setValue: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
  setIsActive: PropTypes.func.isRequired,
};

Title.propTypes = {
  value: PropTypes.string,
  setValue: PropTypes.func.isRequired,
};
