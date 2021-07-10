import React from 'react';
import PropTypes from 'prop-types';

const MeasureUnitsSwitch = (props) => {
  const { degrees, setCommonState } = props;

  const handleClick = () => {
    const newDegrees = degrees === 'Celsius' ? 'Fahrenheit' : 'Celsius';
    setCommonState({ degrees: newDegrees });
  };

  const isCelsius = degrees === 'Celsius';

  return (
    <div className="measure-units-switch">
      <div className="degrees-simbol">
        °
      </div>
      <div className="degrees-buttons-block">
        <button className="c-button item font18" type="button" onClick={handleClick} disabled={isCelsius}>C</button>
        <button className="f-button item font18" type="button" onClick={handleClick} disabled={!isCelsius}>F</button>
      </div>
    </div>
  );
};

MeasureUnitsSwitch.propTypes = {
  setCommonState: PropTypes.func.isRequired,
  degrees: PropTypes.string.isRequired,
};

export default MeasureUnitsSwitch;
