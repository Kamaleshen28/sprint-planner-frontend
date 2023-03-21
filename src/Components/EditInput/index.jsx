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
} from '@mui/material';
import PropTypes from 'prop-types';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import './EditInputModal.css';

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
        // borderRadius: 2,
        fontSize: '0.875rem',
        fontWeight: '700',
        ...sx,
      }}
      {...other}
    />
  );
}

const EditInput = ({
  id,
  stories,
  dependencies,
  developer,
  storyPoints,
  storyList,
  setStoryList,
  developerList,
  closeedit,
}) => {
  const [editstories, seteditStories] = useState(stories);
  const [editdependencies, seteditDependencies] = useState(dependencies);
  const [editdeveloper, seteditDeveloper] = useState(developer);
  const [editstoryPoints, seteditStoryPoints] = useState(storyPoints);
  const handleDeveloperChangeEdit = (event) => {
    const { value } = event.target;
    if (value === ' ') {
      seteditDeveloper([]);
    } else {
      seteditDeveloper([value]);
    }
  };
  const handledependencyChangeEdit = (event) => {
    const { value } = event.target;
    seteditDependencies(value);
  };
  const handleSubmitEdit = (e) => {
    console.log('edit');
    console.log(
      id,
      editstories,
      editdependencies,
      editdeveloper,
      editstoryPoints,
    );
    e.preventDefault();
    if (editstories && editstoryPoints) {
      const newStory = {
        id: id,
        stories: editstories,
        dependencies: editdependencies,
        developer: editdeveloper,
        storyPoints: editstoryPoints,
      };
      const index = storyList.findIndex((story) => story.id === id);
      const newStoryList = [...storyList];
      newStoryList[index] = newStory;
      setStoryList(newStoryList);
      closeedit();
    } else {
      console.log('error');
    }
  };
  return (
    <ValidatorForm
      className="story-container-edit"
      onSubmit={handleSubmitEdit}
      // onError={(errors) => console.log(errors)}
    >
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr repeat(4, 2fr) 1fr 1fr',
          height: '100px',
          width: '90%',
          alignItems: 'center',
          bgcolor: 'white',
        }}
      >
        <div></div>
        <Item sx={{ width: '80%', mx: 'auto' }}>
          <TextValidator
            style={{ width: '100%' }}
            type="text"
            name="story"
            defaultValue="Disabled"
            value={editstories}
            placeholder="Enter Story Title"
            validators={['required']}
            errorMessages={['this field is required']}
            onChange={(e) => seteditStories(e.target.value)}
          />
        </Item>
        <FormControl
          sx={{ m: 1, width: 300 }}
          style={{ backgroundColor: 'white', borderRadius: '10px' }}
        >
          <InputLabel
            variant="standard"
            htmlFor="uncontrolled-native"
            sx={{ m: 1 }}
          >
            Story Dependecy
          </InputLabel>
          <Select
            sx={{ m: 1 }}
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
            multiple
            value={editdependencies}
            onChange={handledependencyChangeEdit}
            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((dependencyId) => (
                  <Chip
                    key={dependencyId}
                    label={
                      storyList?.find((e) => e.id === dependencyId).stories
                    }
                  />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {storyList.map((story) => {
              return (
                story.id !== id && (
                  <MenuItem key={story.id} value={story.id}>
                    <Checkbox checked={editdependencies?.includes(story.id)} />
                    <ListItemText primary={story.stories} />
                  </MenuItem>
                )
              );
            })}
          </Select>
        </FormControl>
        <FormControl
          sx={{ m: 1, width: 300 }}
          style={{ backgroundColor: 'white', borderRadius: '10px' }}
        >
          <InputLabel
            variant="standard"
            htmlFor="uncontrolled-native"
            sx={{ m: 1 }}
          >
            Preassign Developer
          </InputLabel>
          <Select
            sx={{ m: 1 }}
            value={editdeveloper}
            onChange={handleDeveloperChangeEdit}
            input={<OutlinedInput />}
            renderValue={(selected) => {
              const obj = developerList?.find((e) => e.id === selected[0]);
              return obj?.developer;
            }}
            MenuProps={MenuProps}
          >
            <MenuItem value=" ">
              <em>None</em>
            </MenuItem>
            {developerList.map((developer) => (
              <MenuItem key={developer.id} value={developer.id}>
                {developer.developer}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Item sx={{ width: '80%', mx: 'auto' }}>
          <TextValidator
            style={{ width: '100%' }}
            type="text"
            name="storyPoints"
            value={editstoryPoints}
            placeholder="Enter Story Points"
            validators={['required', 'isNumber', 'minNumber:0', 'maxNumber:10']}
            errorMessages={[
              'this field is required',
              'It should be number',
              'Number should be positive',
            ]}
            onChange={(e) => seteditStoryPoints(e.target.value)}
          />
        </Item>
        <Fab
          // variant="contained"
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

EditInput.propTypes = {
  id: PropTypes.number,
  stories: PropTypes.string,
  setStories: PropTypes.func,
  dependencies: PropTypes.array,
  setDependencies: PropTypes.func,
  developer: PropTypes.array,
  setDeveloper: PropTypes.func,
  storyPoints: PropTypes.string,
  setStoryPoints: PropTypes.func,
  storyList: PropTypes.array,
  setStoryList: PropTypes.func,
  developerList: PropTypes.array,
  closeedit: PropTypes.func,
};

export default EditInput;
