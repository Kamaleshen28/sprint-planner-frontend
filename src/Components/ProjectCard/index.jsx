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
      <Card sx={{ width: '98%', height: '98%' }}>
        <CardContent>
          <Typography
            variant="h5"
            component="div"
            sx={{
              mt: 8.5,
              mr: -2,
              ml: -2,
              backgroundColor: 'black',
              color: 'white',
            }}
          >
            {project.title}
          </Typography>
          <Typography sx={{ mb: 1.5, mt: 1.5 }} color="text.secondary">
            Project Start Date:{' '}
            {new Date(project.projectStartDate).toLocaleDateString()}
          </Typography>
          <Typography variant="body2" sx={{ mb: 8.5 }}>
            Project Status: {project.status === 'planned' ? 'Planned' : 'Draft'}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
}

ProjectCard.propTypes = {
  project: PropTypes.object,
};

