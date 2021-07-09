import React from 'react';
import PropTypes from 'prop-types';
import City from './City.jsx';
import CitySelection from './CitySelection.jsx';
import MeasureUnitsSwitch from './MeasureUnitsSwitch.jsx';

const Header = (props) => {
  const {
    mode, name, deg, setCommonState,
  } = props;
  return (
    <div className="info-area-item header">
      {mode === 'show'
        ? <City cityName={name} setCommonState={setCommonState} />
        : <CitySelection setCommonState={setCommonState} />}
      <MeasureUnitsSwitch degrees={deg} setCommonState={setCommonState} />
    </div>
  );
};

Header.propTypes = {
  setCommonState: PropTypes.func.isRequired,
  mode: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  deg: PropTypes.string.isRequired,
};
//  <MeasureUnitsSwitch degrees={deg} setCommonState={setCommonState} />
export default Header;
