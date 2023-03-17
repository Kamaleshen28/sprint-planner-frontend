import Button from '@mui/material/Button';
import React from 'react';
import PropTypes from 'prop-types';

const Tile = ({ handleOpen, children, leftalign }) => (
  <Button
    sx={{
      ':hover': {
        bgcolor: 'white',
        color: 'black',
        border: '1px solid black',
        fontWeight: 600,
      },
      fontSize: 15,
      boxShadow: 1,
      border: '1px solid lightgrey',
      bgcolor: 'white',
      color: 'black',
      fontWeight: 500,
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      display: 'block',
      textAlign: leftalign ? 'left' : 'center',
    }}
    variant="outlined"
    onClick={handleOpen}
    fullWidth={true}
    data-testid="modal-button"
  >
    {children}
  </Button>
);

Tile.propTypes = {
  handleOpen: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  leftalign: PropTypes.bool,
};

export default Tile;
