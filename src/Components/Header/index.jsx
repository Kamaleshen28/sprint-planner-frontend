import React from 'react';
import SidePanel from '../SidePanel';
import './Header.css';
import Title from '../Title';
import PropTypes from 'prop-types';

export default function Header() {
  return (
    <div className="header">
      <div className="heading">
        <SidePanel />
        <h1>Sprint Planner</h1>
      </div>
      {/* <div style={{ flex: 1 }}>
        <Title value={value} setValue={setValue} />
      </div> */}
    </div>
  );
}
