import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Story from '../StoryOutput';
import { IconButton, Typography } from '@mui/material';
import Modal from '@mui/material/Modal';
import Tile from '../Tile';
import CloseIcon from '@mui/icons-material/Close';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';

const Developer = (props) => {
  const { content, developerName } = props;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#eeeeee',
    border: '2px solid lightgrey',
    pt: 2,
    px: 4,
    pb: 3,
    overflowY: 'auto',
    minHeight: '100px',
  };
  let theme = createTheme({
    typography: {
      fontSize: 10,
      fontWeightBold: 400,
    },
  });
  theme = responsiveFontSizes(theme);
  return (
    <React.Fragment>
      <Tile handleOpen={handleOpen}> {developerName}</Tile>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box
          width={2 / 3}
          p={3}
          sx={{ ...style, overflow: 'auto', borderRadius: '4px' }}
          maxHeight={300}
        >
          <Box
            display="flex"
            sx={{
              position: 'relative',
              bgcolor: 'black',
              color: 'white',
              width: '100%',
              borderRadius: '6px',
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
              mb: 2,
              // borderTopRightRadius: 5,
              height: 50,
            }}
          >
            <Typography variant="h4" theme={theme} m="auto">
              {developerName}
            </Typography>
            <IconButton
              aria-label="settings"
              onClick={handleClose}
              sx={{
                position: 'absolute',
                right: 0,
                '&:hover': { bgcolor: '#f9f9f936' },
                p: 0,
                height: '40px',
                mt: '5px',
                mr: '5px',
              }}
            >
              <CloseIcon
                sx={{
                  color: 'white',
                  p: 1,
                }}
              />
            </IconButton>
          </Box>
          <Grid container spacing={2}>
            {content.map((story, index) => (
              <Grid item xs={12} key={index}>
                <Story
                  title={story.title}
                  id={story.id + 1}
                  dependencies={story.dependencies}
                  startDay={story.startDay}
                  endDay={story.endDay}
                  developers={story.developers}
                  assignedDeveloperId={story.assignedDeveloperId}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Modal>
    </React.Fragment>
  );
};
Developer.propTypes = {
  developerName: PropTypes.string,
  content: PropTypes.array,
};
export default Developer;
