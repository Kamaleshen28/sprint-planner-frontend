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

const Story = ({
  id,
  dependencies,
  startDay,
  endDay,
  developers,
  title,
  assignedDeveloperId,
}) => {
  const { apiResponse } = useContext(DataContext);
  // const date = Date.now();

  let startDate = new Date(apiResponse.projectStartDate);
  let endDate = new Date(apiResponse.projectStartDate);
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

  count = 0;
  while (count < endDay || endDate.getDay() === 0 || endDate.getDay() === 6) {
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
              // display: 'flex',
              // justifyContent: 'center',
              backgroundColor: 'black',
              // alignItems: 'center',
              color: 'white',
              mx: 'auto',
              border: 'none',

              p: 0,
              // pt: 2,
              pl: 4,
              fontSize: 18,
              fontWeight: 500,

              // paddingBottom: 1.5,
            }}
            // avatar={
            //   <Avatar
            //     sx={{
            //       bgcolor: red[500],
            //       height: '50px',
            //       width: 50,
            //     }}
            //     aria-label="recipe"
            //   >
            //     STORY {id}
            //   </Avatar>
            // }
            avatar={<p>STORY {id}</p>}
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
              <b>Title:</b> {title}
            </p>
            <p>
              <b>Dependencies(ID): </b>
              {dependencies.length !== 0
                ? dependencies.map((dependency, index) => (
                    <li key={index}>{dependency}</li>
                  ))
                : 'NA'}
            </p>
            <p>
              <b>Start Day:</b> {startDate.toLocaleDateString()}
            </p>
            <p>
              <b>End Day:</b> {endDate.toLocaleDateString()}
            </p>
            <p>
              <b>All Developers:</b>
              {developers.map((developer, index) =>
                developer.id === assignedDeveloperId ? (
                  <li key={index}>
                    <b>{developer.name}</b> (Assigned)
                  </li>
                ) : (
                  <li key={index}>{developer.name}</li>
                ),
              )}
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
