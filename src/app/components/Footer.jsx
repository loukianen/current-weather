import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import cn from 'classnames';

const getBlockClass = (blockNumber, screenType) => {
  if (screenType === 'small') {
    return `block-${blockNumber}-sm`;
  }
  return `block-${blockNumber}`;
};

const getClassNames = (screenSize) => {
  const isScreenSmall = screenSize === 'small';
  const blockNameClass = cn({
    'weather-block-name-sm': isScreenSmall,
    font15: isScreenSmall,
    'weather-block-name': !isScreenSmall,
    font18: !isScreenSmall,
  });
  const blockValueClass = cn({ 'font18-700': isScreenSmall, font25: !isScreenSmall });
  const blockWrapperClass = cn({
    'footer-item-2': isScreenSmall,
    'footer-item-4': !isScreenSmall,
  });
  const footerClass = cn({ 'footer-sm': isScreenSmall, footer: !isScreenSmall });
  const footerWrapClass = cn('info-area-item', 'footer-wrap');
  return {
    blockNameClass, blockValueClass, blockWrapperClass, footerClass, footerWrapClass,
  };
};

const getRenderData = (data) => {
  const {
    pressure, humidity, speed, direction, pop,
  } = data;

  const windSpeed = { blockName: 'Ветер', value: `${speed} м/с, ${direction}` };
  const atmosphericPressure = { blockName: 'Давление', value: `${pressure} мм рт. ст.` };
  const hum = { blockName: 'Влажность', value: `${humidity}%` };
  const probabilityOfPrecipitation = { blockName: 'Вероятность дождя', value: `${pop}%` };

  return [windSpeed, atmosphericPressure, hum, probabilityOfPrecipitation];
};

const mapStateToProps = (state) => {
  const { weatherData, screenSize } = state;
  return { weatherData, screenSize };
};

const Footer = (props) => {
  const { weatherData, screenSize } = props;
  const {
    blockWrapperClass, blockNameClass, blockValueClass, footerWrapClass, footerClass,
  } = getClassNames(screenSize);
  const renderData = getRenderData(weatherData);

  const renderWeatherBlocks = (screenType) => renderData.map(({ blockName, value }, i) => (
    <div key={blockName} className={blockWrapperClass}>
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
  weatherData: PropTypes.shape({
    pres: PropTypes.number,
    hum: PropTypes.number,
    speed: PropTypes.number,
    direction: PropTypes.string,
    pop: PropTypes.number,
  }).isRequired,
  screenSize: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Footer);
