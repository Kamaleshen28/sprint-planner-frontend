import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { Modal } from '@mui/material';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import './ProjectCard.css';
import axios from 'axios';
import { useOktaAuth } from '@okta/okta-react';
import { CardContent } from '@mui/material';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import DeleteIcon from '@mui/icons-material/Delete';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';

const CardContentNoPadding = styled(CardContent)(`
padding: 0;
&:last-child {
  padding-bottom: 0;
}
`);
export default function ProjectCard({
  project,
  handleBookmarkChange,
  handleDeleteProject,
}) {
  const { authState } = useOktaAuth();

  const [plannedDetails, setPlannedDetails] = useState([]);
  const [isOpen, setIsOpen] = useState({ open: false, id: null });
  const handlePopupClose = () => {
    setIsOpen({ open: false, id: null });
  };
  const fetchData = async () => {
    const projectPlannedDetails = await axios.get(
      `http://localhost:8080/api/projects/${project.id}`,
      {
        headers: { authorization: authState?.accessToken.accessToken },
      },
    );
    setPlannedDetails(projectPlannedDetails.data.data);
  };

  useEffect(() => {
    fetchData();
  }, []);
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
        <h2 id="modal-modal-title">
          Are you sure you want to delete the project?
        </h2>
        <p id="modal-modal-description">
          This action cannot be undone. Please confirm.
        </p>
        <Button
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen({ open: false });
          }}
        >
          Cancel
        </Button>
        <Button
          color="error"
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteProject(isOpen.id);
          }}
        >
          Delete
        </Button>
      </Box>
    </Modal>
  );
  return (
    <>
      {deleteConfirmationPopup}
      <Card
        sx={{
          width: '100%',
          height: '100%',
          overflow: 'visible',
          '&:hover': {
            bgColor: '#ffffff',
            boxShadow: '0 8px 16px 0 rgba(0, 0, 0, 0.4)',
            cursor: 'pointer',
          },
        }}
      >
        <CardContentNoPadding
          sx={{
            p: 0,
            paddingBottom: 0,
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '100%',
          }}
        >
          <div className="title-header">
            <div>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                sx={{
                  color: 'white',
                  paddingLeft: 2,
                  paddingRight: 2,
                  mb: 0,
                  height: '50px',
                  borderTopRightRadius: '4px',
                  borderTopLeftRadius: '4px',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                  verticalAlign: 'middle',
                  display: 'flex',
                  alignItems: 'center',
                  paddingTop: 0.5,
                  paddingBottom: 0.5,
                }}
              >
                <p className="project-title">{project.title}</p>
              </Typography>
            </div>
            <div
              className="bookmark-icon"
              onClick={(e) => {
                e.stopPropagation();
                handleBookmarkChange(project.id);
              }}
            >
              {' '}
              {project.isBookmarked ? (
                <BookmarkIcon
                  style={{
                    fontSize: '30px',
                    marginTop: '10px',
                    color: '#DAA520',
                  }}
                />
              ) : (
                <BookmarkBorderIcon
                  style={{
                    fontSize: '30px',
                    marginTop: '10px',
                    color: '#DAA520',
                  }}
                />
              )}
            </div>
          </div>
          <Typography variant="body2" id="content-section">
            <Box id="content-top-section">
              {
                <span className="">
                  <b>Sprints:</b>{' '}
                  {plannedDetails.length != 0 &&
                    plannedDetails.status != 'unsupportedInput' &&
                    plannedDetails.sprints.length}
                  {plannedDetails.length != 0 &&
                    plannedDetails.status === 'unsupportedInput' && (
                      <i>{'NA'}</i>
                    )}
                </span>
              }
              <span className="">
                <b>Developers:</b>{' '}
                {plannedDetails.length != 0 && plannedDetails.developers.length}
              </span>
              <span className="project-start-date">
                <b>Start Date:</b>{' '}
                {new Date(project.projectStartDate).toDateString()}
              </span>
              {
                <span className="project-start-date">
                  <b>Total Duration:</b>{' '}
                  {plannedDetails.length != 0 &&
                    plannedDetails.status != 'unsupportedInput' &&
                    plannedDetails.sprints.length *
                      plannedDetails.sprintDuration +
                      ' Weeks'}
                  {plannedDetails.length != 0 &&
                    plannedDetails.status === 'unsupportedInput' && (
                      <i>{'NA'}</i>
                    )}
                </span>
              }
            </Box>
            <Box id="content-bottom-section">
              <span
                className="trash"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen({ open: true, id: project.id });
                }}
              >
                <DeleteIcon />
              </span>
              <span
                className={
                  project.status === 'planned'
                    ? 'project-status-bottom-section'
                    : 'project-status-bottom-section-draft'
                }
              >
                {project.status === 'planned' ? 'Planned' : 'Draft'}
              </span>
            </Box>
          </Typography>
        </CardContentNoPadding>
      </Card>
    </>
  );
}

ProjectCard.propTypes = {
  project: PropTypes.object,
  handleBookmarkChange: PropTypes.func,
  handleDeleteProject: PropTypes.func,
};
