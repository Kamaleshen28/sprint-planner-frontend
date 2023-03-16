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
import { useNavigate } from 'react-router-dom';

export default function SidePanel() {
  const navigate = useNavigate();
  const [state, setState] = React.useState(false);
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState(open);
  };

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
        <Divider />
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
