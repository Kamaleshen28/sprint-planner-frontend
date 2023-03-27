import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DraftsIcon from '@mui/icons-material/Drafts';
import './ProjectCard.css';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function ProjectCard({ project }) {
  return (
    <>
      <Card
        className="project-card"
        sx={{ width: '95%', height: '40vh', borderRadius: 0 }}
      >
        <CardContent sx={{ padding: 0 }}>
          <Typography
            variant="h5"
            component="div"
            sx={{
              color: 'white',
              height: '5vh',
              backgroundColor: 'black',
              p: 2,
            }}
          >
            {project.title}
          </Typography>
          <Typography sx={{ mb: 1.5, mt: 4 }} color="text.secondary">
            Project Start Date:{' '}
            {new Date(project.projectStartDate).toDateString()}
          </Typography>
          <div className="card-footer">
            <Typography variant="body2" sx={{ mt: 2, fontSize: '20px' }}>
              {project.status === 'planned' ? 'Planned' : 'Draft'}
            </Typography>
            {project.status === 'planned' ? (
              <CheckCircleOutlineIcon
                style={{ fontSize: '40px', color: 'green' }}
              />
            ) : (
              <DraftsIcon style={{ fontSize: '40px' }} />
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
}

ProjectCard.propTypes = {
  project: PropTypes.object,
};
