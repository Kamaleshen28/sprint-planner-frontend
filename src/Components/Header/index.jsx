import React from 'react';
import SidePanel from '../SidePanel';
import './Header.css';
import PropTypes from 'prop-types';

export default function Header({ heading }) {
  return (
    <div className="header">
      <div className="heading">
        <SidePanel />
        <h1>{heading}</h1>
      </div>
      {/* <div style={{ flex: 1 }}>
        <Title value={value} setValue={setValue} />
      </div> */}
    </div>
  );
}
Header.propTypes = {
  heading: PropTypes.string.isRequired,
};
