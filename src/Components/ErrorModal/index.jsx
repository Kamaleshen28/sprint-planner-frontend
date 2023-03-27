import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ErrorIcon from '@mui/icons-material/Error';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';
import { IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
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
  const navigate = useNavigate();
  const handleAutoFill = () => {
    handleClose();
    navigate('/edit/auto-fill');
  };
  const handleSaveDraft = () => {
    navigate('/edit');
    handleClose();
  };

  React.useEffect(() => {});
  return (
    <div>
      <Modal
        open={open.bool}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {/* <IconButton color="primary" onClick={() => {}}>
          <Delete />
        </IconButton> */}
        <Box sx={style}>
          <Box className="modal-header" sx={buttonHeader}>
            {open.err.response ? (
              <ErrorIcon color="success" />
            ) : (
              <ErrorIcon color="error" />
            )}
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {open.err.response
                ? open.success
                  ? 'Need More Developers'
                  : 'Completion Not Possible'
                : 'Error !!'}
            </Typography>
          </Box>
          <Typography
            component={'span'}
            id="modal-modal-description"
            sx={{ mt: 2 }}
          >
            {open.err.response?.data.message
              ? open.err.response.data.message
              : open.err.message}
            <br />
            {open.success ? (
              <div style={{ marginTop: '20px' }}>
                <Button onClick={() => handleSaveDraft()} color="success">
                  Save draft
                </Button>
                <Button onClick={() => handleAutoFill()} color="primary">
                  Auto-fill Developers
                </Button>
              </div>
            ) : (
              <Button
                style={{ marginTop: '20px' }}
                onClick={() => handleSaveDraft()}
                color="success"
              >
                Close
              </Button>
            )}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

ErrorModal.propTypes = {
  open: PropTypes.shape({
    bool: PropTypes.bool,
    err: PropTypes.object,
    success: PropTypes.bool,
  }),
  setOpen: PropTypes.func,
  handleClose: PropTypes.func,
  handleOpen: PropTypes.func,
};
