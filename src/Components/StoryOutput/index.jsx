import React from 'react';
import Card from '@mui/material/Card';
import PropTypes from 'prop-types';
import Modal from '@mui/material/Modal';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import Divider from '@mui/material/Divider';
import Tile from '../Tile';

const Story = ({
  id,
  dependencies,
  startDay,
  endDay,
  developers,
  title,
  assignedDeveloperId,
}) => {
  const date = Date.now();
  const startDate = new Date(date);
  const endDate = new Date(date);
  startDate.setDate(startDate.getDate() + startDay);
  endDate.setDate(endDate.getDate() + endDay);

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
    bgcolor: 'background.paper',
    border: '2px solid lightgrey',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };
  return (
    <React.Fragment>
      <Tile leftalign={true} handleOpen={handleOpen}>
        {id}: {title}
      </Tile>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Card sx={{ ...style, maxWidth: 250, p: 2 }} variant="outlined">
          <CardHeader
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              p: 0,
              marginLeft: 0.3,
              paddingBottom: 1.5,
            }}
            avatar={
              <Avatar
                sx={{ bgcolor: red[500], height: 50, width: 50 }}
                aria-label="recipe"
              >
                Story
              </Avatar>
            }
          />
          <Divider variant="middle" />

          <p>Story ID: {id}</p>
          <p>Title: {title}</p>
          <p>
            Dependencies:{' '}
            {dependencies.map((dependency, index) => (
              <li key={index}>{dependency}</li>
            ))}
          </p>
          <p>Start Day: {startDate.toLocaleDateString()}</p>
          <p>End Day: {endDate.toLocaleDateString()}</p>
          <p>
            All Developers:
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
