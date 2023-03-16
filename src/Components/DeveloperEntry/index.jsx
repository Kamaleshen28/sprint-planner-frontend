import { Box, Tooltip, IconButton, Modal, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import './DeveloperEntry.css';

function Item(props) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        p: 1,
        m: 1,
        width: 150,
        // bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : 'grey.100'),
        bgcolor: 'grey.200',
        // color: (theme) => (theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800'),
        color: 'grey.800',
        border: '1px solid',
        // borderColor: (theme) => (theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300'),
        borderColor: 'skyblue',
        borderRadius: 2,
        fontSize: '0.875rem',
        fontWeight: '700',
        ...sx,
        textAlign: 'center',
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

export default function DeveloperEntry({
  index,
  developerInfo,
  removeItem,
  deleteCheck,
}) {
  const { id, developer, sprintCapacity, capacity } = developerInfo;
  const [isOpen, setIsOpen] = useState({ open: false, id: null });

  const handlePopupOpen = (id) => {
    setIsOpen({ open: true, id });
  };
  const handlePopupClose = () => {
    setIsOpen({ open: false, id: null });
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
  return (
    // <div className="list-item">
    <>
      {deleteConfirmationPopup}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr 2fr repeat(3, 1fr)',
          backgroundColor: 'white',
          borderRadius: '10px',
          ml: 6,
          mt: 1,
          p: 1,
          // width: '100%',
          // m: 0.5,
          // justifyContent: 'space-between',
          // bgcolor: 'background.white',
          // borderRadius: 1,
          // gap: '0 2rem',
          // width: '70vw',
        }}
      >
        <Item sx={{ width: '80%', mx: 'auto' }}>{index}</Item>
        <Item sx={{ width: '80%', mx: 'auto' }}>{developer.toString()}</Item>
        <Item sx={{ width: '80%', mx: 'auto' }}>{sprintCapacity}</Item>
        <Item sx={{ width: '80%', mx: 'auto' }}>{capacity}</Item>
        {/* <Button onClick={() => removeItem(index)}>==</Button> */}
        {deleteCheck(id) ? (
          <Tooltip title="Delete">
            <IconButton color="primary" onClick={() => handlePopupOpen(id)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Remove or Edit Developer Id in the Stories Input form">
            <IconButton disableTouchRipple disableFocusRipple>
              <DeleteIcon style={{ color: 'red' }} />
            </IconButton>
          </Tooltip>
        )}
      </Box>
    </>
    // </div>
  );
}

DeveloperEntry.propTypes = {
  // key: PropTypes.number,
  index: PropTypes.number,
  developerInfo: PropTypes.object,
  removeItem: PropTypes.func,
  deleteCheck: PropTypes.func,
};
