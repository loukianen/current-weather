import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { getIconFileName, transformDegrees } from '../utils';

const getClassNames = (screenSize, mode) => {
  const isScreenSmall = screenSize === 'small';
  const isWarning = mode === 'loading' || mode === 'failure' || mode === 'geolocation_failure';

  const middleBlockClass = cn('info-area-item', {
    'middle-block-sm': isScreenSmall, 'middle-block': !isScreenSmall,
  });
  const infoBlockClass = cn({ 'main-block-sm': isScreenSmall, 'main-block': !isScreenSmall });
  const iconClass = cn('whether-picture', { size100: isScreenSmall, size208: !isScreenSmall });
  const tempClass = cn({
    font90: isScreenSmall, 'temp-sm': isScreenSmall, font180: !isScreenSmall, temp: !isScreenSmall,
  });
  const descriptionClass = cn({
    'wether-desc-sm': isScreenSmall,
    font18: isScreenSmall,
    'wether-desc': !isScreenSmall,
    font25: !isScreenSmall,
    'warning-text': isWarning,
  });

  return {
    middleBlockClass, infoBlockClass, iconClass, tempClass, descriptionClass,
  };
};

const getDescription = (text, mode) => {
  switch (mode) {
    case 'loading':
      return 'Загрузка данных...';
    case 'failure':
      return 'Не удалось загрузить данные';
    case 'geolocation_failure':
      return 'Не удалось определить местоположение';
    default:
      return text;
  }
};

const mapStateToProps = (state) => {
  const {
    weatherData, screenSize, degreesType, appMode,
  } = state;
  return {
    weatherData, screenSize, degreesType, appMode,
  };
};

const MiddleBlock = (props) => {
  const {
    weatherData: { icon: iconId, temp, description }, degreesType, screenSize, appMode,
  } = props;
  const tempValue = `${degreesType === 'Celsius' ? temp : transformDegrees(temp)}°`;
  const iconFileName = `img/${getIconFileName(iconId)}.png`;
  const {
    middleBlockClass, infoBlockClass, iconClass, tempClass, descriptionClass,
  } = getClassNames(screenSize, appMode);

  return (
    <div className={middleBlockClass}>
      <div className={infoBlockClass}>
        <img className={iconClass} src={iconFileName} alt="weather" />
        <div className={tempClass}>{tempValue}</div>
      </div>
      <div className={descriptionClass}>
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
  screenSize: PropTypes.string.isRequired,
  appMode: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(MiddleBlock);
