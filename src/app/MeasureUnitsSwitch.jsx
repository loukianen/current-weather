import React from 'react';

const MeasureUnitsSwitch = (props) => {
  const { degrees, setCommonState } = props;

  const handleClick = () => {
    const newDegrees = degrees === 'Celsius' ? 'Fahrenheit' : 'Celsius';
    setCommonState({ degrees: newDegrees });
  };

  const isCelsius = degrees === 'Celsius';

  return (
    <div className="measure-units-switch">
      <div>
        °
      </div>
      <button className="item" type="button" onClick={handleClick} disabled={isCelsius}>C</button>
      <button className="item" type="button" onClick={handleClick} disabled={!isCelsius}>F</button>
    </div>
  );
};

export default MeasureUnitsSwitch;
