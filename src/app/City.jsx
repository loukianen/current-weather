import React from 'react';

const City = (props) => {
  const { cityName } = props;
  return (
    <div className="city">
      <div id="cooseCity">
        <div>
          {cityName}
        </div>
        <div className="city-buttons">
          <button type="button">Сменить город</button>
          <div>
            <img src="img/location.png" alt="" />
            <button type="button">Мое местоположение</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default City;
