import React from 'react';
import PropTypes from 'prop-types';
import { getIconFileName, transformDegrees } from './utils';

const MiddleBlock = (props) => {
  const {
    iconId, temp, degrees, description, screenSize,
  } = props;
  const tempValue = `${degrees === 'Celsius' ? temp : transformDegrees(temp)}°`;
  const iconFileName = `img/${getIconFileName(iconId)}.png`;
  const iconClass = screenSize === 'small' ? 'whether-picture size100' : 'whether-picture size208';
  const tempClass = screenSize === 'small' ? 'font90 temp-sm' : 'font180';
  const descriptionClass = screenSize === 'small' ? 'wether-desc-sm font18' : 'wether-desc font25';
  const middleBlockClass = screenSize === 'small' ? 'info-area-item middle-block-sm' : 'info-area-item middle-block';
  const mainBlockClass = screenSize === 'small' ? 'main-block-sm' : 'main-block';

  return (
    <div className={middleBlockClass}>
      <div className={mainBlockClass}>
        <img className={iconClass} src={iconFileName} alt="sun" />
        <div className={tempClass}>{tempValue}</div>
      </div>
      <div className={descriptionClass}>
        {description}
      </div>
    </div>
  );
};

MiddleBlock.propTypes = {
  iconId: PropTypes.string.isRequired,
  temp: PropTypes.number.isRequired,
  degrees: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  screenSize: PropTypes.string.isRequired,
};

export default MiddleBlock;
