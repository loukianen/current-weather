import React from 'react';
import PropTypes from 'prop-types';
import { getWeatherData } from './utils';
import MeasureUnitsSwitch from './MeasureUnitsSwitch.jsx';

const City = (props) => {
  const {
    cityName, setCommonState, screenSize, deg,
  } = props;
  const cityNameClass = screenSize === 'small' ? 'font30' : 'font50';
  const buttonClass = screenSize === 'small' ? 'city-button font15' : 'city-button font18';

  const handleChangeClick = () => {
    setCommonState({ mode: 'selection' });
  };

  const handleGeoClick = () => {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      const { latitude, longitude } = coords;
      getWeatherData({ lat: latitude, lon: longitude }, setCommonState);
    });
  };

  return (
    <div className="city">
      <div id="cooseCity">
        <div className="first-city-block">
          <div className={cityNameClass}>
            {cityName}
          </div>
          <MeasureUnitsSwitch degrees={deg} setCommonState={setCommonState} />
        </div>
        <div className="city-buttons-block">
          <button className={buttonClass} type="button" onClick={handleChangeClick}>Сменить город</button>
          <button className={buttonClass} type="button" onClick={handleGeoClick}>
            <img className="arrow" src="img/location.png" alt="" />
            Мое местоположение
          </button>
        </div>
      </div>
    </div>
  );
};

City.propTypes = {
  setCommonState: PropTypes.func.isRequired,
  cityName: PropTypes.string.isRequired,
  screenSize: PropTypes.string.isRequired,
  deg: PropTypes.string.isRequired,
};

export default City;
