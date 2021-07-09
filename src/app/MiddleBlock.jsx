import React from 'react';
import PropTypes from 'prop-types';
import { getIconFileName, transformDegrees } from './utils';

const MiddleBlock = (props) => {
  const {
    iconId, temp, degrees, description,
  } = props;
  const tempValue = `${degrees === 'Celsius' ? temp : transformDegrees(temp)}°`;
  const iconFileName = `img/${getIconFileName(iconId)}.png`;
  return (
    <div className="info-area-item middle-block">
      <div className="main-block">
        <img className="whether-picture" src={iconFileName} alt="sun" />
        <div className="temperture"><div>{tempValue}</div></div>
      </div>
      <div className="wether-description">
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
};

export default MiddleBlock;
