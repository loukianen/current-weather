import React from 'react';
import PropTypes from 'prop-types';
import City from './City.jsx';
import CitySelection from './CitySelection.jsx';

const Header = (props) => {
  const {
    mode, name, deg, setCommonState, screenSize,
  } = props;
  return (
    <div className="info-area-item">
      {mode === 'show'
        ? <City cityName={name} setCommonState={setCommonState} screenSize={screenSize} deg={deg} />
        : <CitySelection setCommonState={setCommonState} screenSize={screenSize} deg={deg} />}
    </div>
  );
};

Header.propTypes = {
  setCommonState: PropTypes.func.isRequired,
  mode: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  deg: PropTypes.string.isRequired,
  screenSize: PropTypes.string.isRequired,
};

export default Header;
