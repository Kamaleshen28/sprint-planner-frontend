import React, { useContext } from 'react';
import {
  Card,
  CardContent,
  Modal,
  Typography,
  Avatar,
  styled,
} from '@mui/material';
import PropTypes from 'prop-types';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import { DataContext } from '../../Contexts/DataContext';
import './StoryCard.css';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

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
const Story = ({ id, dependencies, startDay, endDay, developers, title }) => {
  const { apiResponse, stories } = useContext(DataContext);
  // const date = Date.now();

  let startDate = new Date(apiResponse.projectStartDate);
  let count = 0;
  while (
    count < startDay ||
    startDate.getDay() === 0 ||
    startDate.getDay() === 6
  ) {
    startDate = new Date(startDate.setDate(startDate.getDate() + 1));
    if (startDate.getDay() != 0 && startDate.getDay() != 6) {
      //Date.getDay() gives weekday starting from 0(Sunday) to 6(Saturday)
      count++;
    }
  }

  const duration = endDay - startDay - 1;
  let endDate = new Date(startDate);

  count = 0;
  while (count < duration) {
    endDate = new Date(endDate.setDate(endDate.getDate() + 1));
    if (endDate.getDay() != 0 && endDate.getDay() != 6) {
      //Date.getDay() gives weekday starting from 0(Sunday) to 6(Saturday)
      count++;
    }
  }

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
    // width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
  };
  return (
    <React.Fragment>
      <Card
        onClick={() => handleOpen()}
        sx={{
          maxWidth: '100%',
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
            width: '100%',
          }}
        >
          <Typography
            gutterBottom
            variant="h5"
            component="span"
            sx={{
              bgcolor: 'black',
              color: 'white',
              paddingLeft: 2,
              paddingRight: 2,
              mb: 0,
              height: '50px',
              borderTopRightRadius: '4px',
              borderTopLeftRadius: '4px',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              verticalAlign: 'middle',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <p className="story-title">{title}</p>
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            component="span"
            sx={{
              height: 130,
              textAlign: 'center',
              p: 2,
              borderLeft: '4px solid',
              borderColor: stringToColor(developers[0].name),
              '&:hover': {
                borderColor: '#30A3DA',
              },
              flexGrow: 1,
              borderBottomLeftRadius: '4px',
            }}
          >
            <p>
              <b>From:</b>
              {startDate.toDateString()}
            </p>
            <p>
              <b>To:</b>
              {endDate.toDateString()}
            </p>
            <div className="storyDevelopers">
              <Avatar {...stringAvatar(developers[0].name)} />
              <p>{developers[0].name}</p>
            </div>
          </Typography>
        </CardContentNoPadding>
      </Card>
      <Modal
        open={open}
        data-testid="story-modal"
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Card sx={{ ...style, minWidth: 270 }} variant="outlined">
          <CardHeader
            sx={{
              display: 'flex',
              // justifyContent: 'center',
              backgroundColor: 'black',
              // alignItems: 'center',
              color: 'white',
              mx: 'auto',
              border: 'none',

              p: 0,
              pl: 4,
              fontSize: 18,
              fontWeight: 500,

              // paddingBottom: 1.5,
            }}
            avatar={<p>STORY {id}</p>}
            action={
              <p style={{ marginRight: '1rem' }}>
                <IconButton
                  aria-label="settings"
                  onClick={handleClose}
                  sx={{ '&:hover': { bgcolor: '#f9f9f936' } }}
                >
                  <CloseIcon
                    sx={{
                      color: 'white',
                    }}
                  />
                </IconButton>
              </p>
            }
          />
          <Divider variant="middle" />
          <CardContent
            sx={{
              pt: 2,
              px: 4,
              pb: 3,
              width: '370px',
              height: '230px',
              overflowY: 'scroll',
              // mb: 3,
            }}
          >
            {/* <p>
              <b>Story ID:</b> {id}
            </p> */}
            <p>
              <b>Title: </b> {title}
            </p>
            <p>
              <b>Start Date: </b> {startDate.toDateString()}
            </p>
            <p>
              <b>End Date: </b> {endDate.toDateString()}
            </p>
            <p>
              <b>Developer: </b>
              {developers[0].name}
            </p>
            <p>
              <b>Dependencies: </b>
              {dependencies.length !== 0
                ? dependencies.map((dependency, index) => (
                    <li
                      key={index}
                      style={{
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                        width: '100%',
                      }}
                    >
                      {/* {dependency}:{' '} */}
                      {stories.find((story) => story.id === dependency).title}
                    </li>
                  ))
                : 'NA'}
            </p>
          </CardContent>
        </Card>
      </Modal>
    </React.Fragment>
  );
};
Story.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  dependencies: PropTypes.array.isRequired,
  startDay: PropTypes.number.isRequired,
  endDay: PropTypes.number.isRequired,
  developers: PropTypes.array.isRequired,
  assignedDeveloperId: PropTypes.number.isRequired,
};
export default Story;
