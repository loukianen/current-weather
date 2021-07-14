import React from 'react';
import PropTypes from 'prop-types';

const MeasureUnitsSwitch = (props) => {
  const { degrees, setCommonState, screenSize } = props;

  const handleClick = (e) => {
    e.stopPropagation();
    const newDegrees = degrees === 'Celsius' ? 'Fahrenheit' : 'Celsius';
    setCommonState({ degrees: newDegrees });
  };

  const isCelsius = degrees === 'Celsius';
  const cClass = isCelsius ? 'active-button c-button item font18' : 'not-active-button c-button item font18';
  const fClass = isCelsius ? 'not-active-button f-button item font18' : 'active-button f-button item font18';
  const letterC = isCelsius ? 'active-letter' : null;
  const letterF = isCelsius ? null : 'active-letter';
  const switchClass = screenSize === 'small' ? 'measure-units-switch-sm' : 'measure-units-switch';

  return (
    <div className={switchClass}>
      <div className="degrees-simbol font18">
        °
      </div>
      <div className="degrees-buttons-block">
        <button className={cClass} type="button" onClick={handleClick} disabled={isCelsius}>
          <div className={letterC}>C</div>
        </button>
        <button className={fClass} type="button" onClick={handleClick} disabled={!isCelsius}>
          <div className={letterF}>F</div>
        </button>
      </div>
    </div>
  );
};

MeasureUnitsSwitch.propTypes = {
  setCommonState: PropTypes.func.isRequired,
  degrees: PropTypes.string.isRequired,
  screenSize: PropTypes.string.isRequired,
};

export default MeasureUnitsSwitch;
