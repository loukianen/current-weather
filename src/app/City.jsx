import React from 'react';
import { getWeatherData } from './utils';

const City = (props) => {
  const { cityName, setCommonState } = props;

  const handleChangeClick = () => {
    setCommonState({ mode: 'selection' });
  };

  const handleGeoClick = () => {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      getWeatherData(coords, setCommonState);
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

export default City;
