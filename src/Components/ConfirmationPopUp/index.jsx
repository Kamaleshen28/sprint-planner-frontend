// import { Button, Modal } from '@mui/material';
// import { Box } from '@mui/system';
// import React, { useState } from 'react';
// import './ConfirmationPopUp.css';

// export default function ConfirmationPopUp({ removeItem, handlePopupOpen }) {
//   const [toBeDeletedID, setToBeDeletedID] = useState(null);

//   const handlePopupClose = () => {
//     setIsOpen(false);
//     setToBeDeletedID(null);
//   };
//   return (
//     <Modal
//       open={isOpen}
//       onClose={handlePopupClose}
//       aria-labelledby="modal-modal-title"
//       aria-describedby="modal-modal-description"
//     >
//       <Box
//         sx={{
//           position: 'absolute',
//           top: '50%',
//           left: '50%',
//           transform: 'translate(-50%, -50%)',
//           width: 400,
//           bgcolor: 'background.paper',
//           border: '2px solid #000',
//           boxShadow: 24,
//           p: 4,
//         }}
//       >
//         <h2 id="modal-modal-title">Are you sure you want to delete?</h2>
//         <p id="modal-modal-description">
//           This action cannot be undone. Please confirm.
//         </p>
//         <Button onClick={handlePopupClose}>Cancel</Button>
//         <Button onClick={() => removeItem(toBeDeletedID)}>Delete</Button>
//       </Box>
//     </Modal>
//   );
// }

// ConfirmationPopUp.propTypes = {
//   removeItem: PropTypes.func.isRequired,
//   handlePopupOpen: PropTypes.func.isRequired,
// };
