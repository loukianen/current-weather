import React from 'react';
import City from './City.jsx';
import MeasureUnitsSwitch from './MeasureUnitsSwitch.jsx';

const Header = (props) => {
  const { cityName } = props;
  return (
    <div className="group header">
      <City cityName={cityName} />
      <MeasureUnitsSwitch />
    </div>
  );
};

export default Header;
