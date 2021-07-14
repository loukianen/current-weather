import React from 'react';
import PropTypes from 'prop-types';

const getBlockClass = (blockNumber, screenType) => {
  if (screenType === 'small') {
    return `block-${blockNumber}-sm`;
  }
  return `block-${blockNumber}`;
};

const Footer = (props) => {
  const {
    pres, hum, speed, direction, pop, screenSize,
  } = props;
  const windSpeed = { blockName: 'Ветер', value: `${speed} м/с, ${direction}` };
  const atmosphericPressure = { blockName: 'Давление', value: `${pres} мм рт. ст.` };
  const humidity = { blockName: 'Влажность', value: `${hum}%` };
  const probabilityOfPrecipitation = { blockName: 'Вероятность дождя', value: `${pop}%` };

  const blockNameClass = screenSize === 'small' ? 'weather-block-name-sm font15' : 'weather-block-name font18';
  const blockValueClass = screenSize === 'small' ? 'font18-700' : 'font25';
  const itemClass = screenSize === 'small' ? 'footer-item-2' : 'footer-item-4';
  const footerClass = screenSize === 'small' ? 'footer-sm' : 'footer';
  const footerWrapClass = screenSize === 'small' ? 'info-area-item footer-wrap-sm' : 'info-area-item';

  const renderData = [windSpeed, atmosphericPressure, humidity, probabilityOfPrecipitation];

  const renderWeatherBlocks = (screenType) => renderData.map(({ blockName, value }, i) => (
    <div key={blockName} className={itemClass}>
      <div className={getBlockClass(i + 1, screenType)}>
        <div className={blockNameClass}>{blockName}</div>
        <div className={blockValueClass}>{value}</div>
      </div>
    </div>
  ));

  return (
    <div className={footerWrapClass}>
      <div className={footerClass}>
        {renderWeatherBlocks(screenSize)}
      </div>
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
