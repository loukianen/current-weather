import '../../css/footerStyle.css';
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

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
  const { weatherData } = state;
  return { weatherData };
};

const Footer = (props) => {
  const { weatherData } = props;
  const renderData = getRenderData(weatherData);

  const renderWeatherBlocks = () => renderData.map(({ blockName, value }, i) => (
    <div key={blockName} className="footer-item">
      <div className={`block-${i + 1}`}>
        <div className="weather-block-name">{blockName}</div>
        <div className="weather-block-value">{value}</div>
      </div>
    </div>
  ));

  return (
    <div className="info-area-item footer-wrap">
      <div className="footer">
        {renderWeatherBlocks()}
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
};

export default connect(mapStateToProps)(Footer);
