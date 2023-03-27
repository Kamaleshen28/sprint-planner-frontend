import {
  Box,
  Card,
  CardContent,
  Grid,
  Modal,
  Typography,
  Avatar,
  IconButton,
  styled,
} from '@mui/material';
import PropTypes from 'prop-types';
import CloseIcon from '@mui/icons-material/Close';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import React, { useState } from 'react';
import Story from '../StoryOutput';

const CardContentNoPadding = styled(CardContent)(`
  padding: 0;
  &:last-child {
    padding-bottom: 0;
  }
`);
function stringToColor(string) {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}${
      name.split(' ').length == 2 ? name.split(' ')[1][0] : ''
    }`,
  };
}

const CardTestDeveloper = ({ content, developerName }) => {
  const [open, setOpen] = useState(false);
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
    bgcolor: 'background.paper',
    border: '2px solid lightgrey',
    boxShadow: 24,
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
    <>
      <Card
        onClick={() => handleOpen()}
        sx={{
          maxWidth: 345,
          overflow: 'visible',
          '&:hover': {
            bgColor: '#ffffff',
            boxShadow: '0 8px 16px 0 rgba(0, 0, 0, 0.4)',
            cursor: 'pointer',
          },
        }}
      >
        <CardContentNoPadding
          sx={{
            p: 0,
            paddingBottom: 0,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{
              bgcolor: 'black',
              color: 'white',
              paddingLeft: 2,
              paddingRight: 2,
              mb: 0,
              display: 'flex',
              alignItems: 'center',
              height: '50px',
              justifyContent: 'space-between',
              borderTopRightRadius: '4px',
              borderTopLeftRadius: '4px',
            }}
          >
            {developerName}
            <Avatar {...stringAvatar(developerName)} />
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              height: 100,
              p: 2,
              borderLeft: '4px solid',
              borderColor: stringToColor(developerName),
              '&:hover': {
                borderColor: '#30A3DA',
              },
              flexGrow: 1,
              borderBottomLeftRadius: '4px',
            }}
          >
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContentNoPadding>
      </Card>

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
    </>
  );
};
CardTestDeveloper.propTypes = {
  developerName: PropTypes.string,
  content: PropTypes.array,
};
export default CardTestDeveloper;
