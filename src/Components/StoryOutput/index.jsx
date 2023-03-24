import React, { useContext } from 'react';
import Card from '@mui/material/Card';
import PropTypes from 'prop-types';
import Modal from '@mui/material/Modal';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import Divider from '@mui/material/Divider';
import Tile from '../Tile';
import { DataContext } from '../../Contexts/DataContext';
import { CardContent } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

const Story = ({
  id,
  dependencies,
  startDay,
  endDay,
  developers,
  title,
  assignedDeveloperId,
}) => {
  const { apiResponse, stories } = useContext(DataContext);
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
      <Tile leftalign={true} handleOpen={handleOpen}>
        {id}: {title}
      </Tile>
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
            }}
          >
            {/* <p>
              <b>Story ID:</b> {id}
            </p> */}
            <p>
              <b>Title: </b> {title}
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
                      {dependency}:{' '}
                      {stories.find((story) => story.id === dependency).title}
                    </li>
                  ))
                : 'NA'}
            </p>
            <p>
              <b>Start Day: </b> {startDate.toLocaleDateString()}
            </p>
            <p>
              <b>End Day: </b> {endDate.toLocaleDateString()}
            </p>
            <p>
              <b>Developer: </b>
              {developers[0].name}
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
