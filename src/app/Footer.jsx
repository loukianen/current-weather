import React from 'react';
import PropTypes from 'prop-types';

const Footer = (props) => {
  const {
    pres, hum, speed, direction, pop, screenSize,
  } = props;
  const windSpeed = { blockName: 'Ветер', value: `${speed} м/с, ${direction}` };
  const atmosphericPressure = { blockName: 'Давление', value: `${pres} мм рт. ст.` };
  const humidity = { blockName: 'Влажность', value: `${hum}%` };
  const probabilityOfPrecipitation = { blockName: 'Вероятность дождя', value: `${pop}%` };

  const blockNameClass = screenSize === 'small' ? 'weather-block-name font15' : 'weather-block-name font18';
  const blockValueClass = screenSize === 'small' ? 'font18' : 'font25';
  const itemClass = screenSize === 'small' ? 'footer-item-2' : 'footer-item-4';

  const renderData = [windSpeed, atmosphericPressure, humidity, probabilityOfPrecipitation];

  const renderWeatherBlocks = () => renderData.map(({ blockName, value }) => (
    <div key={blockName} className={itemClass}>
      <div className={blockNameClass}>{blockName}</div>
      <div className={blockValueClass}>{value}</div>
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
  screenSize: PropTypes.string.isRequired,
};

export default Footer;
