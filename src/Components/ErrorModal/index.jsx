import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ErrorIcon from '@mui/icons-material/Error';
import PropTypes from 'prop-types';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'white',
  boxShadow: 30,
  p: 4,
  color: 'black',
  borderRadius: '10px',
};

const buttonHeader = {
  display: 'flex',
  alignItems: 'center',
  gap: '5px',
};

const buttonStyle = {
  color: '#ff3333',
};

export default function ErrorModal({ open, setOpen, handleClose, handleOpen }) {
  // const [open, setOpen] = React.useState(false);

  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);

  React.useEffect(() => {});

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box className="modal-header" sx={buttonHeader}>
            <ErrorIcon sx={buttonStyle} />
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Error in sending data!
            </Typography>
          </Box>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Please submit again
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

ErrorModal.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  handleClose: PropTypes.func,
  handleOpen: PropTypes.func,
};
