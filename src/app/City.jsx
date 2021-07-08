import React from 'react';
import PropTypes from 'prop-types';
import { getWeatherData } from './utils';

const City = (props) => {
  const { cityName, setCommonState } = props;

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
        <div className="city-name">
          {cityName}
        </div>
        <div className="city-buttons-block">
          <button className="city-button" type="button" onClick={handleChangeClick}>Сменить город</button>
          <button className="city-button" type="button" onClick={handleGeoClick}>
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
};

export default City;
