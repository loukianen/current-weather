import React from 'react';
import City from './City.jsx';
import CitySelection from './CitySelection.jsx';
import MeasureUnitsSwitch from './MeasureUnitsSwitch.jsx';

const Header = (props) => {
  const { mode, name, deg, setCommonState } = props;
  return (
    <div className="group header">
      {mode === 'show'
        ? <City cityName={name} setCommonState={setCommonState} />
        : <CitySelection setCommonState={setCommonState} />}
      <MeasureUnitsSwitch degrees={deg} setCommonState={setCommonState} />
    </div>
  );
};

export default Header;
