/* eslint-disable react/prop-types */
import React, { useState } from 'react';
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
import { Chip, Modal } from '@mui/material';

export default function SidePanel() {
  const { setProjectId, projectId, updateSidebar } =
    React.useContext(DataContext);
  const navigate = useNavigate();
  const [state, setState] = React.useState(false);
  const [projects, setProjects] = React.useState([]);
  const [project, setProject] = React.useState('');
  const [plannedStatus, setPlannedStatus] = React.useState(false);
  const [isOpen, setIsOpen] = useState({ open: false, id: null });

  // const location = useLocation();

  const handlePopupClose = () => {
    setIsOpen({ open: false, id: null });
  };

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
    // console.log(event.target.value);
    setProjectId(event.target.value);
    setProject(event.target.value);
    localStorage.setItem('projectId', event.target.value);
    const selectedProject = projects.find(
      (project) => project.id === event.target.value,
    );
    if (selectedProject.status === 'planned') {
      setState(false);
      setPlannedStatus(true);
      navigate('/ganttChart');
      window.location.reload();
    } else {
      setState(false);
      setPlannedStatus(false);
      navigate('/edit');
    }
    toggleDrawer(false);
  };
  const handleDeleteProject = async () => {
    try {
      // already taken confirmation from user
      let projectId = localStorage.getItem('projectId');
      const res = await axios.delete(
        `http://localhost:8080/api/projects/${projectId}`,
        {
          headers: { authorization: localStorage.getItem('accessToken') },
        },
      );
      console.log(res);
      setProjectId('');
      localStorage.removeItem('projectId');
      setProject('');
      setPlannedStatus(false);

      navigate('/create');
    } catch (error) {
      console.log(error.message);
    }
  };

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
          onClick={() => {
            setIsOpen({ open: false });
          }}
        >
          Cancel
        </Button>
        <Button color="error" onClick={handleDeleteProject}>
          Delete
        </Button>
      </Box>
    </Modal>
  );

  React.useEffect(() => {
    console.log('projectId', projectId);
    axios
      .get('http://localhost:8080/api/projects', {
        headers: { authorization: localStorage.getItem('accessToken') },
      })
      .then((res) => {
        // console.log(res.data.data);
        setProjects(res.data.data);
        const selectedProject = res.data.data.find(
          (project) => project.id === localStorage.getItem('projectId'),
        );
        if (selectedProject) {
          setProject(selectedProject.id);
          setPlannedStatus(selectedProject.status === 'planned');
        }
      });
  }, [projectId, updateSidebar]);

  const list = (anchor) => (
    <Box
      sx={{
        width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 400,
        maxWidth: 400,
      }}
      role="presentation"
      // onClick={toggleDrawer(anchor, false)}
      // onKeyDown={toggleDrawer(anchor, false)}
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
                renderValue={(value) => {
                  const project = projects.find(
                    (project) => project.id === value,
                  );
                  return project?.title;
                }}
                label="Project"
                onChange={handleChange}
              >
                {projects.map((project) => (
                  <MenuItem key={project.id} value={project.id}>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: '100%',
                      }}
                    >
                      <span
                        style={{
                          width: 250,
                          textOverflow: 'ellipsis',
                          overflow: 'hidden',
                        }}
                      >
                        {project.title}
                      </span>
                      {project.status === 'planned' ? (
                        <Chip
                          style={{ width: 100 }}
                          color="success"
                          label="planned"
                        />
                      ) : (
                        <Chip style={{ width: 100 }} label="draft" />
                      )}
                    </div>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </ListItem>
      </List>

      <Divider />
      {localStorage.getItem('projectId') && (
        <>
          <List>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => navigate('/')}
                disabled={!plannedStatus}
                data-testid="list-view-button"
              >
                <ListItemText primary="List View" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton
                disabled={!plannedStatus}
                onClick={() => navigate('/graph')}
                data-testid="dependency-graph-button"
              >
                <ListItemText primary="Dependency Graph" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                disabled={!plannedStatus}
                onClick={() => navigate('/ganttChart')}
              >
                <ListItemText primary="Gantt Chart" />
              </ListItemButton>
            </ListItem>
            <ListItem>
              <Button
                sx={{ width: '90%', mx: 'auto' }}
                variant="contained"
                onClick={() => navigate('/edit')}
              >
                Edit Project
              </Button>
            </ListItem>
            <ListItem>
              <Button
                sx={{ width: '90%', mx: 'auto' }}
                variant="contained"
                color="error"
                onClick={() => setIsOpen({ open: true })}
              >
                Delete Project
              </Button>
            </ListItem>
          </List>
        </>
      )}
    </Box>
  );

  return (
    <div>
      {deleteConfirmationPopup}
      <React.Fragment>
        <Button
          onClick={toggleDrawer(true)}
          sx={{ pl: 0, justifyContent: 'left' }}
        >
          <MenuIcon sx={{ color: 'black', fontSize: 30 }} />
        </Button>
        <Drawer anchor={'left'} open={state} onClose={toggleDrawer(false)}>
          {list('left')}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
