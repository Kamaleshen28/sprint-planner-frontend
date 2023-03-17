/* eslint-disable react/prop-types */
import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { DataContext } from '../../Contexts/DataContext';

export default function SidePanel() {
  const { setProjectId } = React.useContext(DataContext);
  const navigate = useNavigate();
  const [state, setState] = React.useState(false);
  const [projects, setProjects] = React.useState([]);
  const [project, setProject] = React.useState('');
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState(open);
  };
  const handleChange = (event) => {
    setProjectId(event.target.value);
    setProject(event.target.value);
    localStorage.setItem('projectId', event.target.value);
  };
  React.useEffect(() => {
    axios
      .get('http://localhost:8080/api/projects', {
        headers: { authorization: localStorage.getItem('accessToken') },
      })
      .then((res) => {
        setProjects(res.data.data);
      });
  }, []);
  const list = (anchor) => (
    <Box
      sx={{
        width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250,
      }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Divider />
      <List
        disablePadding
        sx={{
          '& .MuiListItemButton-root:hover': {
            backgroundColor: '#051C2A',
            '&, & .MuiListItemIcon-root': {
              color: 'white',
            },
          },
        }}
      >
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => navigate('/create')}
            data-testid="create-project-text"
          >
            <ListItemText primary="Create Project" />
          </ListItemButton>
        </ListItem>
      </List>

      <List>
        <ListItem>
          <Box sx={{ width: '100%' }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Project</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={project}
                label="Project"
                onChange={handleChange}
              >
                {projects.map((project) => (
                  <MenuItem key={project.id} value={project.id}>
                    {project.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </ListItem>
      </List>

      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => navigate('/')}
            data-testid="list-view-button"
          >
            <ListItemText primary="List View" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton
            onClick={() => navigate('/graph')}
            data-testid="dependency-graph-button"
          >
            <ListItemText primary="Dependency Graph" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate('/ganttChart')}>
            <ListItemText primary="Gantt Chart" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
  return (
    <div>
      <React.Fragment>
        <Button onClick={toggleDrawer(true)}>
          <MenuIcon sx={{ color: 'white' }} />
        </Button>
        <Drawer anchor={'left'} open={state} onClose={toggleDrawer(false)}>
          {list('left')}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
