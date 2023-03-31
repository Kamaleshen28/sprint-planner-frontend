import React from 'react';
import { useNavigate } from 'react-router-dom';
import SidePanel from '../SidePanel';
import './Header.css';
import Button from '@mui/material/Button';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useOktaAuth } from '@okta/okta-react';

export default function Header() {
  const navigate = useNavigate();
  const { oktaAuth } = useOktaAuth();

  const handleSignoutClick = () => {
    localStorage.removeItem('projectId');
    oktaAuth.signOut('/');
  };

  return (
    <div className="header">
      <div className="heading">
        <SidePanel />
      </div>
      <div className="dashboard-icon">
        <p>
          <b>All Projects</b>
        </p>
        <DashboardIcon
          className="dashboard-icon-button"
          onClick={() => navigate('/')}
          style={{ marginTop: '10px', fontSize: '30px' }}
        />
      </div>
      <div className="signout-button-container" onClick={handleSignoutClick}>
        <Button variant="contained">Sign Out</Button>
      </div>
    </div>
  );
}
