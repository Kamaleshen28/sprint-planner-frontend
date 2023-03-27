import React from 'react';
import { useNavigate } from 'react-router-dom';
import SidePanel from '../SidePanel';
import './Header.css';
import Button from '@mui/material/Button';
import { useOktaAuth } from '@okta/okta-react';

export default function Header() {
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
      <div className="signout-button-container" onClick={handleSignoutClick}>
        <Button variant="contained">Sign Out</Button>
      </div>
    </div>
  );
}
