import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import './ProjectCard.css';
import axios from 'axios';
import { useOktaAuth } from '@okta/okta-react';
import { CardContent } from '@mui/material';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';

const CardContentNoPadding = styled(CardContent)(`
padding: 0;
&:last-child {
  padding-bottom: 0;
}
`);
export default function ProjectCard({ project, handleBookmarkChange }) {
  const { authState } = useOktaAuth();

  const [plannedDetails, setPlannedDetails] = useState([]);
  const fetchData = async () => {
    const projectPlannedDetails = await axios.get(
      `http://localhost:8080/api/projects/${project.id}`,
      {
        headers: { authorization: authState?.accessToken.accessToken },
      },
    );
    setPlannedDetails(projectPlannedDetails.data.data);
  };
  // const toggleBookmark = async () => {
  //   try {
  //     const projectPlannedDetails = await axios.put(
  //       `http://localhost:8080/api/projects/${project.id}/bookmark`,
  //       {
  //         isBookmarked: !plannedDetails.isBookmarked,
  //       },
  //       {
  //         headers: { authorization: authState?.accessToken.accessToken },
  //       },
  //     );
  //     setPlannedDetails({
  //       ...plannedDetails,
  //       isBookmarked: !plannedDetails.isBookmarked,
  //     });
  //     if (project.id === bookmarkChange) {
  //       setBookmarkChange(undefined);
  //     } else {
  //       setBookmarkChange(project.id);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const toggleBookmark = async () => {
    try {
      const projectPlannedDetails = await axios.put(
        `http://localhost:8080/api/projects/${project.id}/bookmark`,
        {
          isBookmarked: !plannedDetails.isBookmarked,
        },
        {
          headers: { authorization: authState?.accessToken.accessToken },
        },
      );
      setPlannedDetails({
        ...plannedDetails,
        isBookmarked: !plannedDetails.isBookmarked,
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <Card
        sx={{
          width: '95%',
          height: '20vh',
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
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{
              bgcolor: 'black',
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
          <Typography id="content-section">
            <Box id="content-top-section">
              {
                <span className="">
                  Sprints:{' '}
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
                Developers:{' '}
                {plannedDetails.length != 0 && plannedDetails.developers.length}
              </span>
            </Box>
            <Box id="content-middle-section">
              <span className="project-start-date">
                Start Date: {new Date(project.projectStartDate).toDateString()}
              </span>
              {
                <span className="project-start-date">
                  Total Duration:{' '}
                  {plannedDetails.length != 0 &&
                    plannedDetails.status != 'unsupportedInput' &&
                    plannedDetails.sprints.length *
                      plannedDetails.sprintDuration}
                  {plannedDetails.length != 0 &&
                    plannedDetails.status === 'unsupportedInput' && (
                      <i>{'NA'}</i>
                    )}
                </span>
              }
            </Box>
            <Box id="content-bottom-section">
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  handleBookmarkChange(project.id);
                }}
              >
                {' '}
                {project.isBookmarked ? (
                  <BookmarkIcon />
                ) : (
                  <BookmarkBorderIcon />
                )}
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
};
