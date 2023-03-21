import { Button, Box, Fab, Modal, Tooltip, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import Chip from '@mui/material/Chip';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Typography from '@mui/material/Typography';
import Fade from '@mui/material/Fade';
import './StoryInput.css';
import EditInput from '../EditInput';
import { Edit } from '@mui/icons-material';

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
function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function Item(props) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        p: 1,
        m: 1,
        width: 150,
        bgcolor: 'white',

        // bgcolor: (theme) =>
        //   theme.palette.mode === 'dark' ? '#101010' : 'grey.100',
        color: 'grey.800',
        // border: '1px solid',
        // borderColor: (theme) =>
        //   theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
        borderRadius: 1,
        fontSize: '0.875rem',
        fontWeight: '700',
        ...sx,
        minHeight: '20px',
      }}
      {...other}
    />
  );
}

Item.propTypes = {
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool]),
    ),
    PropTypes.func,
    PropTypes.object,
  ]),
};

export default function StoryInput({ storyList, setStoryList, developerList }) {
  const theme = useTheme();
  const [id, setId] = useState(storyList.length + 1);
  const [stories, setStories] = useState('');
  const [dependencies, setDependencies] = useState([]);
  const [developer, setDeveloper] = useState([]);
  const [storyPoints, setStoryPoints] = useState(undefined);
  const [isOpen, setIsOpen] = useState({ open: false, id: null });
  const [editOpen, setEditOpen] = useState({
    open: false,
    id: null,
    selectedStory: {},
  });
  const [modalOpen, setModalOpen] = useState(false);

  const handleEditPopupOpen = (id) => {
    const selectedStory = storyList?.find((story) => story.id === id);
    setEditOpen({ open: true, id, selectedStory });
  };
  const handleEditPopupClose = () => {
    setEditOpen({ open: false, id: null, selectedStory: {} });
  };

  const handlePopupOpen = (id) => {
    setIsOpen({ open: true, id });
  };
  const handlePopupClose = () => {
    setIsOpen({ open: false, id: null });
  };

  const deleteCheck = (id) => {
    let check = true;
    storyList.forEach((story) => {
      if (story.dependencies.includes(id)) check = false;
    });
    return check;
  };

  const deleteConfirmationPopup = (
    <Modal
      open={isOpen.open}
      onClose={handlePopupClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          borderRadius: 2,
          p: 4,
        }}
      >
        <h2 id="modal-modal-title">Are you sure you want to delete?</h2>
        <p id="modal-modal-description">
          This action cannot be undone. Please confirm.
        </p>
        <Button onClick={handlePopupClose}>Cancel</Button>
        <Button color="error" onClick={() => removeItem(isOpen.id)}>
          Delete
        </Button>
      </Box>
    </Modal>
  );

  const EditInputModal = (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={editOpen.open}
      onClose={handleEditPopupClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={editOpen.open}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '90%',
            bgcolor: 'background.paper',
            boxShadow: 24,
            // margin: '0 30px',
          }}
        >
          <EditInput
            id={editOpen.id}
            stories={editOpen.selectedStory.stories}
            dependencies={editOpen.selectedStory.dependencies}
            developer={editOpen.selectedStory.developer}
            storyPoints={editOpen.selectedStory.storyPoints}
            storyList={storyList}
            setStoryList={setStoryList}
            developerList={developerList}
            closeedit={handleEditPopupClose}
          />
        </Box>
      </Fade>
    </Modal>
  );

  const removeItem = (id) => {
    let newStoryList = storyList.filter((story) => story.id !== id);
    setStoryList(newStoryList);
    handlePopupClose();
  };
  const handleDeveloperChange = (event) => {
    const { value } = event.target;
    if (value === ' ') {
      setDeveloper([]);
    } else {
      setDeveloper([value]);
    }
  };
  const handledependencyChange = (event) => {
    const { value } = event.target;
    setDependencies(value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (id && stories && storyPoints) {
      const newStory = { id, stories, dependencies, developer, storyPoints };
      setStoryList([...storyList, newStory]);
      setId(id + 1);
      setStories('');
      setDependencies([]);
      setDeveloper([]);
      setStoryPoints('');
    }
  };

  const getDeveloperAssigned = (id) => {
    if (!id || id.length === 0 || id === ' ') return [];
    const developerassigned = developerList?.find((dev) => dev.id === id[0]);
    return developerassigned ? developerassigned.developer : [];
  };

  const getDependencies = (id) => {
    if (!id) return [];
    const depArray = id.map((i) => {
      const dependency = storyList.find((dep) => dep.id === i);
      return dependency.stories;
    });
    return depArray;
  };
  return (
    <>
      <div className="story-container">
        <Box mx="auto" sx={{ ml: 1, mr: 1 }}>
          <div>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: '1fr repeat(4, 2fr) 1fr 1fr',
                // ml: 6,
                p: 1,
              }}
            >
              <Item sx={{ width: '70%' }}>SERIAL NO.</Item>
              <Item sx={{ width: '70%' }}>STORIES</Item>
              <Item sx={{ width: '70%' }}>DEPENDENCIES</Item>
              <Item sx={{ width: '70%' }}>DEVELOPER</Item>
              <Item sx={{ width: '70%' }}>STORY POINTS</Item>
            </Box>
            <div className="story-list">
              {deleteConfirmationPopup}
              {EditInputModal}
              {storyList.length === 0 ? (
                <p style={{ fontSize: '1.3rem' }}>No Stories</p>
              ) : (
                storyList.map((story, index) => {
                  const { id, stories, dependencies, developer, storyPoints } =
                    story;
                  return (
                    <div key={id}>
                      <Box
                        sx={{
                          display: 'grid',
                          gridTemplateColumns: '1fr repeat(4, 2fr) 1fr 1fr',
                          backgroundColor: '#e4eef1',
                          borderRadius: '2px',
                          height: '50px',
                          // display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          // ml: 6,
                          mt: 1,
                          p: 1,
                        }}
                      >
                        <Item sx={{ width: '80%' }}>{index}</Item>
                        <Item sx={{ width: '80%' }}>{stories}</Item>
                        <Item sx={{ width: '80%' }}>
                          {getDependencies(dependencies).toString()}
                        </Item>
                        <Item sx={{ width: '80%' }}>
                          {getDeveloperAssigned(developer).toString()}
                        </Item>
                        <Item sx={{ width: '80%' }}>{storyPoints}</Item>
                        {deleteCheck(id) ? (
                          <Tooltip title="Delete">
                            <IconButton
                              color="primary"
                              onClick={() => handlePopupOpen(id)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        ) : (
                          <Tooltip title="Remove or Edit Dependent stories">
                            <IconButton disableTouchRipple disableFocusRipple>
                              <DeleteIcon style={{ color: 'red' }} />
                            </IconButton>
                          </Tooltip>
                        )}
                        <Tooltip title="Edit">
                          <IconButton
                            color="disabled"
                            onClick={() => handleEditPopupOpen(id)}
                          >
                            <Edit />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </div>
                  );
                })
              )}
            </div>
          </div>
          <ValidatorForm
            className="story-container-form"
            onSubmit={handleSubmit}
            onError={(errors) => console.log(errors)}
          >
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: '1fr repeat(4, 2fr) 1fr 1fr',
                // ml: 6,
                p: 1,
                alignItems: 'center',
              }}
            >
              {/* <Item>

              </Item> */}
              <div></div>
              <Item sx={{ width: '95%' }}>
                <TextValidator
                  style={{ width: '100%' }}
                  type="text"
                  name="story"
                  value={stories}
                  placeholder="Enter Story Title"
                  validators={['required']}
                  errorMessages={['this field is required']}
                  onChange={(e) => setStories(e.target.value)}
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
                  Story Dependency
                </InputLabel>
                <Select
                  sx={{ m: 1 }}
                  labelId="demo-multiple-name-label"
                  id="demo-multiple-name"
                  multiple
                  value={dependencies}
                  onChange={handledependencyChange}
                  input={
                    <OutlinedInput id="select-multiple-chip" label="Chip" />
                  }
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((dependencyId) => (
                        <Chip
                          key={dependencyId}
                          label={
                            storyList?.find((e) => e.id === dependencyId)
                              .stories
                          }
                        />
                      ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  {storyList.map((story) => (
                    <MenuItem key={story.id} value={story.id}>
                      <Checkbox checked={dependencies.includes(story.id)} />
                      <ListItemText primary={story.stories} />
                    </MenuItem>
                  ))}
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
                  Auto assign Developer
                </InputLabel>
                <Select
                  sx={{ m: 1 }}
                  value={developer}
                  onChange={handleDeveloperChange}
                  input={<OutlinedInput />}
                  renderValue={(selected) => {
                    const obj = developerList?.find(
                      (e) => e.id === selected[0],
                    );
                    return obj?.developer;
                  }}
                  MenuProps={MenuProps}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {developerList.map((developer) => (
                    <MenuItem key={developer.id} value={developer.id}>
                      {developer.developer}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Item sx={{ width: '95%' }}>
                <TextValidator
                  style={{ width: '100%' }}
                  type="text"
                  name="storyPoints"
                  value={storyPoints}
                  placeholder="Enter Story Points"
                  validators={[
                    'required',
                    'isNumber',
                    'minNumber:0',
                    'maxNumber:10',
                  ]}
                  errorMessages={[
                    'This field is required',
                    'It should be number',
                    'Number should be positive',
                  ]}
                  onChange={(e) => setStoryPoints(e.target.value)}
                />
              </Item>
              {/* <div></div> */}
              <Fab
                variant="contained"
                style={{ margin: 'auto', display: 'flex' }}
                color="primary"
                type="submit"
              >
                +
              </Fab>
              <div></div>
            </Box>
          </ValidatorForm>
        </Box>
      </div>
    </>
  );
}

StoryInput.propTypes = {
  storyList: PropTypes.array,
  setStoryList: PropTypes.func,
  developerList: PropTypes.array,
};
