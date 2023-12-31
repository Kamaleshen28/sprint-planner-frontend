import { Button, Modal } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import PropTypes from 'prop-types';
import './ValidationModal.css';

export default function ValidationModal({ isOpen, setIsOpen }) {
  const handleClose = () => {
    setIsOpen({ bool: false, atLeastOneOptionalAvailable: false });
  };
  return (
    <Modal
      open={isOpen.bool}
      onClose={handleClose}
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
          bgcolor: 'white',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <h2 id="modal-modal-title">Please Enter All the required Fields</h2>
        {isOpen.atLeastOneOptionalAvailable ? (
          <span id="modal-modal-description">
            Fill all of the following fields -
            <ul>
              <li>Project Title</li>
              <li>Start Date</li>
              <li>Sprint Duration</li>
              <li>Stories</li>
            </ul>
          </span>
        ) : (
          <p id="modal-modal-description">
            Enter at least one of the following -
            <ul>
              <li>Total Duration</li>
              <li>Developers</li>
            </ul>
          </p>
        )}
        <Button onClick={handleClose}>Cancel</Button>
      </Box>
    </Modal>
  );
}

ValidationModal.propTypes = {
  isOpen: PropTypes.shape({
    bool: PropTypes.bool.isRequired,
    atLeastOneOptionalAvailable: PropTypes.bool.isRequired,
  }).isRequired,
  setIsOpen: PropTypes.func.isRequired,
};
