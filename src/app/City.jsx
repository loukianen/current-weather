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
        <div>
          {cityName}
        </div>
        <div className="city-buttons">
          <button type="button" onClick={handleChangeClick}>Сменить город</button>
          <div>
            <img src="img/location.png" alt="" />
            <button type="button" onClick={handleGeoClick}>Мое местоположение</button>
          </div>
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
