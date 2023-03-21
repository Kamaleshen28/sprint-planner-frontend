import React, { useState } from 'react';
import {
  Box,
  Chip,
  Checkbox,
  FormControl,
  Fab,
  InputLabel,
  MenuItem,
  Select,
  OutlinedInput,
  ListItemText,
  Tooltip,
} from '@mui/material';
import PropTypes from 'prop-types';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

Item.propTypes = {
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool]),
    ),
    PropTypes.func,
    PropTypes.object,
  ]),
};

function Item(props) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        p: 1,
        m: 1,
        width: 200,
        // bgcolor: (theme) =>
        //   theme.palette.mode === 'dark' ? '#101010' : 'grey.100',
        color: (theme) =>
          theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
        // border: '1px solid',
        // borderColor: (theme) =>
        //   theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
        borderRadius: 2,
        fontSize: '0.875rem',
        fontWeight: '700',
        ...sx,
      }}
      {...other}
    />
  );
}

const EditDeveloperInput = ({
  id,
  developer,
  sprintCapacity,
  capacity,
  closeedit,
  developerList,
  setDeveloperList,
}) => {
  const [editdeveloper, seteditDeveloper] = useState(developer);
  const [editcapacity, seteditCapacity] = useState(capacity);
  const [editsprintCapacity, seteditSprintCapacity] = useState(sprintCapacity);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editdeveloper && editcapacity && editsprintCapacity) {
      const newDeveloper = {
        id: id,
        developer: editdeveloper,
        sprintCapacity: editsprintCapacity,
        capacity: editcapacity,
      };
      const index = developerList.findIndex((dev) => dev.id === id);
      const newDeveloperList = [...developerList];
      newDeveloperList[index] = newDeveloper;
      setDeveloperList(newDeveloperList);
      closeedit();
    }
  };

  return (
    <ValidatorForm
      className="developer-container-edit"
      onSubmit={handleSubmit}
      onError={(errors) => console.log(errors)}
    >
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr 2fr repeat(3, 1fr) 1fr',
          // bgcolor: '#28709e',
          // borderRadius: '0 0 20px 20px',
          height: '100px',
          alignItems: 'center',
          width: '90%',
          bgcolor: 'white',
          // boxShadow: '0px 0px 11px -8px #000000',
        }}
      >
        <div></div>
        <Item sx={{ width: '80%', mx: 'auto' }}>
          <TextValidator
            style={{ width: '100%' }}
            placeholder="Enter Developer Name"
            type="text"
            name="developer"
            defaultValue="Disabled"
            value={editdeveloper}
            validators={['required', 'matchRegexp:^[a-zA-Z ]*$']}
            errorMessages={['this field is required', 'Not a valid name']}
            onChange={(e) => seteditDeveloper(e.target.value)}
          />
        </Item>
        <Item sx={{ width: '80%', mx: 'auto' }}>
          <TextValidator
            placeholder="Enter Sprint Capacity"
            type="number"
            name="sprintCapacity"
            value={editsprintCapacity}
            validators={['required', 'isNumber', 'minNumber:0']}
            errorMessages={[
              'this field is required',
              'Not a number',
              'Should be positive',
            ]}
            onChange={(e) => seteditSprintCapacity(e.target.value)}
          />
        </Item>
        <Item sx={{ width: '80%', mx: 'auto' }}>
          <TextValidator
            placeholder="Enter capacity"
            type="number"
            name="capacity"
            value={editcapacity}
            validators={['required', 'isNumber', 'minNumber:0']}
            errorMessages={[
              'this field is required',
              'Not a number',
              'Should be positive',
            ]}
            onChange={(e) => seteditCapacity(e.target.value)}
          />
        </Item>

        <Fab
          color="primary"
          type="submit"
          aria-label="add"
          sx={{ fontSize: '1.5rem' }}
        >
          +
        </Fab>
        <Fab
          onClick={closeedit}
          variant="contained"
          style={{ margin: 'auto', display: 'flex' }}
          color="error"
          type="submit"
        >
          x
        </Fab>
      </Box>
    </ValidatorForm>
  );
};

EditDeveloperInput.propTypes = {
  id: PropTypes.number,
  developer: PropTypes.string,
  sprintCapacity: PropTypes.number,
  capacity: PropTypes.number,
  closeedit: PropTypes.func,
  developerList: PropTypes.array,
  setDeveloperList: PropTypes.func,
};

export default EditDeveloperInput;
