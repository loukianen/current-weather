import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { getIconFileName, transformDegrees } from '../utils';

const getClassNames = (screenSize) => {
  const isScreenSmall = screenSize === 'small';

  const middleBlockClass = cn('info-area-item', {
    'middle-block-sm': isScreenSmall,
    'middle-block': !isScreenSmall,
  });
  const infoBlockClass = cn({ 'main-block-sm': isScreenSmall, 'main-block': !isScreenSmall });
  const iconClass = cn('whether-picture', { size100: isScreenSmall, size208: !isScreenSmall });
  const tempClass = cn({ font90: isScreenSmall, 'temp-sm': isScreenSmall, font180: !isScreenSmall });
  const descriptionClass = cn({
    'wether-desc-sm': isScreenSmall,
    font18: isScreenSmall,
    'wether-desc': !isScreenSmall,
    font25: !isScreenSmall,
  });

  return {
    middleBlockClass, infoBlockClass, iconClass, tempClass, descriptionClass,
  };
};

const mapStateToProps = (state) => {
  const { weatherData, screenSize, degreesType } = state;
  return { weatherData, screenSize, degreesType };
};

const MiddleBlock = (props) => {
  const { weatherData: { icon: iconId, temp, description }, degreesType, screenSize } = props;
  const tempValue = `${degreesType === 'Celsius' ? temp : transformDegrees(temp)}°`;
  const iconFileName = `img/${getIconFileName(iconId)}.png`;
  const {
    middleBlockClass, infoBlockClass, iconClass, tempClass, descriptionClass,
  } = getClassNames(screenSize);

  return (
    <div className={middleBlockClass}>
      <div className={infoBlockClass}>
        <img className={iconClass} src={iconFileName} alt="weather" />
        <div className={tempClass}>{tempValue}</div>
      </div>
      <div className={descriptionClass}>
        {description}
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
};

export default connect(mapStateToProps)(MiddleBlock);
