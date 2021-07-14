import React from 'react';
import PropTypes from 'prop-types';
import { getWeatherData } from './utils';
import MeasureUnitsSwitch from './MeasureUnitsSwitch.jsx';

const City = (props) => {
  const {
    cityName, setCommonState, screenSize, deg,
  } = props;
  const cityNameClass = screenSize === 'small' ? 'font30' : 'font50';
  const buttonClass = screenSize === 'small' ? 'font15 city-button-sm' : 'font18 city-button';
  const buttonBlockClass = screenSize === 'small' ? 'city-buttons-block-sm' : 'city-buttons-block';

  const handleChangeClick = (e) => {
    e.stopPropagation();
    setCommonState({ mode: 'selection' });
  };

  const handleGeoClick = (e) => {
    e.stopPropagation();
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
          <MeasureUnitsSwitch degrees={deg} setCommonState={setCommonState} screenSize={screenSize} />
        </div>
        <div className={buttonBlockClass}>
          <button className={buttonClass} type="button" onClick={handleChangeClick}>Сменить город</button>
          <div className="arrow-wrap">
            <img className="arrow" src="img/location.png" alt="" />
          </div>
          <button className={buttonClass} type="button" onClick={handleGeoClick}>Мое местоположение</button>
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
