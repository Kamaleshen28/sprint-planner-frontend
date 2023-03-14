import React from 'react';
import SidePanel from '../SidePanel';
import './Header.css';

export default function Header() {
  return (
    <div className="header">
      <div className="heading">
        <SidePanel />
      </div>
      {/* <div style={{ flex: 1 }}>
        <Title value={value} setValue={setValue} />
      </div> */}
    </div>
  );
}
