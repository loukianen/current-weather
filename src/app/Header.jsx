import React from 'react';
import City from './City.jsx';
import MeasureUnitsSwitch from './MeasureUnitsSwitch.jsx';

const Header = () => (
  <div className="group header">
    <City />
    <MeasureUnitsSwitch />
  </div>
);

export default Header;
