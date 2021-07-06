import React from 'react';

const City = () => (
  <div className="city">
    <form id="cooseCity">
      <div>
        Омск
      </div>
      <div className="city-buttons">
        <button type="button">Сменить город</button>
        <div>
          <img src="img/location.png" alt="" />
          <button type="button">Мое местоположение</button>
        </div>
      </div>
    </form>
  </div>
);

export default City;
