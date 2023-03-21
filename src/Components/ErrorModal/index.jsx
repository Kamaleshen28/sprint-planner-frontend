import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ErrorIcon from '@mui/icons-material/Error';
import PropTypes from 'prop-types';
import { Check, CheckCircle, Warning } from '@mui/icons-material';

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

export default function ErrorModal({ open, setOpen, handleClose, handleOpen }) {
  // const [open, setOpen] = React.useState(false);

  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);

  React.useEffect(() => {});
  return (
    <div>
      <Modal
        open={open.bool}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box className="modal-header" sx={buttonHeader}>
            {open.err.response ? (
              <ErrorIcon color="success" />
            ) : (
              <ErrorIcon color="error" />
            )}
            {/* <ErrorIcon sx={buttonStyle} /> */}
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {open.err.response
                ? open.success
                  ? 'Need More Developers'
                  : 'Completion Not Possible'
                : 'Error !!'}
            </Typography>
          </Box>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {open.err.response?.data.message
              ? open.err.response.data.message
              : open.err.message}
            <br />
            {/* {'Error'} */}
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
