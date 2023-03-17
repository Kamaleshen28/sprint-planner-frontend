import React from 'react';
import { useNavigate } from 'react-router-dom';
import SidePanel from '../SidePanel';
import './Header.css';
import Button from '@mui/material/Button';

export default function Header() {
  const navigate = useNavigate();
  const handleSignoutClick = () => {
    localStorage.setItem('accessToken', null);
    navigate('/login');
  };

  return (
    <div className="header">
      <div className="heading">
        <SidePanel />
      </div>
      {/* <div style={{ flex: 1 }}>
        <Title value={value} setValue={setValue} />
      </div> */}

      <div className="signout-button-container" onClick={handleSignoutClick}>
        {/* <button className="signout-button">Sign Out</button> */}
        <Button variant="contained">Sign Out</Button>
      </div>
    </div>
  );
}
