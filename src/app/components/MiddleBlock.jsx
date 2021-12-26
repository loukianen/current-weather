import '../../css/middleBlockStyle.css';
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { getIconFileName, transformDegrees } from '../utils';

const getDescription = (text, mode) => {
  const textMapping = {
    loading: 'Загрузка данных...',
    failure: 'Не удалось загрузить данные',
    geolocation_failure: 'Не удалось определить местоположение',
  };

  return textMapping[mode] ? textMapping[mode] : text;
};

const mapStateToProps = (state) => {
  const { weatherData, degreesType, appMode } = state;
  return { weatherData, degreesType, appMode };
};

const MiddleBlock = (props) => {
  const { weatherData: { icon: iconId, temp, description }, degreesType, appMode } = props;
  const tempValue = `${degreesType === 'Celsius' ? temp : transformDegrees(temp)}°`;
  const iconFileName = `img/${getIconFileName(iconId)}.png`;
  const isWarning = appMode === 'loading'
    || appMode === 'failure'
    || appMode === 'geolocation_failure';
  const descriptionClass = cn('weather-desc', 'description-font', { 'warning-text': isWarning });

  return (
    <div className="info-area-item middle-block">
      <div className="main-block">
        <img className="weather-picture picture-size" src={iconFileName} alt="weather" data-testid="weather-icon" />
        <div className="temp-font temp" data-testid="temp">{tempValue}</div>
      </div>
      <div className={descriptionClass} data-testid="description">
        {getDescription(description, appMode)}
      </div>
    </div>
  );
};

MiddleBlock.propTypes = {
  weatherData: PropTypes.shape({
    icon: PropTypes.string,
    temp: PropTypes.number,
    description: PropTypes.string,
  }).isRequired,
  degreesType: PropTypes.string.isRequired,
  appMode: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(MiddleBlock);
