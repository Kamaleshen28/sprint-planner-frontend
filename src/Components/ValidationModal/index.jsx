import { Button, Modal } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './ValidationModal.css';

export default function ValidationModal({ isOpen, setIsOpen }) {
  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <Modal
      open={isOpen}
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
          //   border: '2px solid #000',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <h2 id="modal-modal-title">Please enter all the required fields</h2>
        <p id="modal-modal-description">
          Check the following -
          <ul>
            <li>Project Title</li>
            <li>Start Date</li>
            <li>Sprint Duration</li>
            <li>Stories Input</li>
          </ul>
        </p>
        <Button onClick={handleClose}>Cancel</Button>
      </Box>
    </Modal>
  );
}

ValidationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};
