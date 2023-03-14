import { Button, Box, Fab, Modal, Tooltip, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import './StoryInput.css';
import { Edit } from '@mui/icons-material';

function Item(props) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        p: 1,
        m: 1,
        width: 200,
        bgcolor: (theme) =>
          theme.palette.mode === 'dark' ? '#101010' : 'grey.100',
        color: (theme) =>
          theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
        border: '1px solid',
        borderColor: (theme) =>
          theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
        borderRadius: 2,
        fontSize: '0.875rem',
        fontWeight: '700',
        ...sx,
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

export default function StoryInput({ storyList, setStoryList }) {
  const [id, setId] = useState(storyList.length + 1);
  const [stories, setStories] = useState('');
  const [dependencies, setDependencies] = useState([]);
  const [developer, setDeveloper] = useState([]);
  const [storyPoints, setStoryPoints] = useState(0);
  const [isOpen, setIsOpen] = useState({ open: false, id: null });

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

  const removeItem = (id) => {
    let newStoryList = storyList.filter((story) => story.id !== id);
    setStoryList(newStoryList);
    handlePopupClose();
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(storyList);
    if (id && stories && storyPoints) {
      const newStory = { id, stories, dependencies, developer, storyPoints };
      const myArray = newStory.dependencies.split(',');
      const myNewArray = myArray.map((item) => {
        return parseInt(item);
      });
      newStory.dependencies = myNewArray;
      setStoryList([...storyList, newStory]);
      setId(id + 1);
    }
  };
  return (
    <>
      <div className="story-container">
        <Box mx="auto">
          <div>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: '1fr repeat(4, 2fr) 1fr 1fr',
                ml: 6,
                p: 1,
              }}
            >
              <Item sx={{ width: '70%' }}>Id</Item>
              <Item sx={{ width: '70%' }}>Stories</Item>
              <Item sx={{ width: '70%' }}>Dependencies</Item>
              <Item sx={{ width: '70%' }}>Developer</Item>
              <Item sx={{ width: '70%' }}>Story Points</Item>
            </Box>
            <div className="story-list">
              {deleteConfirmationPopup}
              {storyList.length === 0 ? (
                <h1>No Stories</h1>
              ) : (
                storyList.map((story) => {
                  const { id, stories, dependencies, developer, storyPoints } =
                    story;
                  return (
                    <>
                      <Box
                        sx={{
                          display: 'grid',
                          gridTemplateColumns: '1fr repeat(4, 2fr) 1fr 1fr',
                          backgroundColor: 'white',
                          borderRadius: '10px',
                          ml: 6,
                          mt: 1,
                          p: 1,
                        }}
                      >
                        <Item sx={{ width: '70%' }}>{id}</Item>
                        <Item sx={{ width: '70%' }}>{stories}</Item>
                        <Item sx={{ width: '70%' }}>
                          {dependencies.toString()}
                        </Item>
                        <Item sx={{ width: '70%' }}>{developer}</Item>
                        <Item sx={{ width: '70%' }}>{storyPoints}</Item>
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
                          <IconButton color="disabled">
                            <Edit />
                          </IconButton>
                        </Tooltip>
                        {/* <Fab>
                          <FontAwesomeIcon icon={faEdit} />
                        </Fab> */}
                      </Box>
                    </>
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
                ml: 6,
                p: 1,
              }}
            >
              <Item>
                <TextValidator
                  type="text"
                  name="story"
                  defaultValue="Disabled"
                  value={stories}
                  placeholder="Enter Story Title"
                  validators={['required']}
                  errorMessages={['this field is required']}
                  onChange={(e) => setStories(e.target.value)}
                />
              </Item>
              <Item>
                <TextValidator
                  type="text"
                  name="dependencies"
                  value={dependencies}
                  placeholder="Enter Dependencies"
                  onChange={(e) => setDependencies(e.target.value)}
                />
              </Item>
              <Item>
                <TextValidator
                  type="text"
                  name="developers"
                  value={developer}
                  placeholder="Enter Developer"
                  validators={['isNumber', 'minNumber:0']}
                  errorMessages={[
                    'It should be number',
                    'Number should be positive',
                  ]}
                  onChange={(e) => setDeveloper(e.target.value)}
                />
              </Item>
              <Item>
                <TextValidator
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
                    'this field is required',
                    'It should be number',
                    'Number should be positive',
                  ]}
                  onChange={(e) => setStoryPoints(e.target.value)}
                />
              </Item>
              <div></div>
              <Fab
                variant="contained"
                style={{ margin: '0 auto', display: 'flex' }}
                type="submit"
              >
                +
              </Fab>
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
};
