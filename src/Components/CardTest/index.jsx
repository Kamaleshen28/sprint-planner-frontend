import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Modal,
  Typography,
} from '@mui/material';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import React, { useState } from 'react';
import Story from '../StoryOutput';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';

const CardContentNoPadding = styled(CardContent)(`
  padding: 0;
  &:last-child {
    padding-bottom: 0;
  }
`);
var intToRGB = function (value) {
  var valueAsPercentageOfMax = value / 19;
  var MAX_RGB_INT = 16600000;
  var valueFromMaxRgbInt = Math.floor(MAX_RGB_INT * valueAsPercentageOfMax);

  var blue = Math.floor(valueFromMaxRgbInt % 256);
  var green = Math.floor((valueFromMaxRgbInt / 256) % 256);
  var red = Math.floor((valueFromMaxRgbInt / 256 / 256) % 256);

  return 'rgba(' + red + ',' + green + ',' + blue + ',' + 0.8 + ')';
};

const CardTest = ({ content, index }) => {
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
              mb: 0,
              height: '50px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderTopRightRadius: '4px',
              borderTopLeftRadius: '4px',
            }}
          >
            SPRINT
            <Avatar sx={{ bgcolor: intToRGB(index + 1), ml: 2 }}>
              {index + 1}
            </Avatar>
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              height: 100,
              p: 2,
              borderLeft: '4px solid',
              borderColor: intToRGB(index + 1),
              flexGrow: 1,
              '&:hover': {
                borderColor: '#30A3DA',
              },
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
              bgcolor: 'black',
              position: 'relative',
              color: 'white',
              width: '100%',
              borderRadius: '6px',
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
              mb: 2,
              height: 50,
            }}
          >
            <Typography variant="h4" theme={theme} m="auto">
              SPRINT 1
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
            {content?.map((story, index) => {
              return (
                <Grid key={index} item xs={12} data-testid="stories">
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
              );
            })}
          </Grid>
        </Box>
      </Modal>
    </>
  );
};
CardTest.propTypes = {
  content: PropTypes.array,
  index: PropTypes.number,
};
export default CardTest;
