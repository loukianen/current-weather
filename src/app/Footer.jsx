import React from 'react';
import PropTypes from 'prop-types';

const Footer = (props) => {
  const {
    pres, hum, speed, direction, pop,
  } = props;
  const windSpeed = { blockName: 'Ветер', value: `${speed} м/с, ${direction}` };
  const atmosphericPressure = { blockName: 'Давление', value: `${pres} мм рт. ст.` };
  const humidity = { blockName: 'Влажность', value: `${hum}%` };
  const probabilityOfPrecipitation = { blockName: 'Вероятность дождя', value: `${pop}%` };

  const renderData = [windSpeed, atmosphericPressure, humidity, probabilityOfPrecipitation];

  const renderWeatherBlocks = () => renderData.map(({ blockName, value }) => (
    <div key={blockName} className="footer-item">
      <div className="weather-block-name">{blockName}</div>
      <div className="weather-block-value">{value}</div>
    </div>
  ));

  return (
    <div className="info-area-item footer">
      {renderWeatherBlocks()}
    </div>
  );
};

Footer.propTypes = {
  pres: PropTypes.number.isRequired,
  hum: PropTypes.number.isRequired,
  speed: PropTypes.number.isRequired,
  direction: PropTypes.string.isRequired,
  pop: PropTypes.number.isRequired,
};

export default Footer;
