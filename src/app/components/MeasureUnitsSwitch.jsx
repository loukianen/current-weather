import '../../css/measureUnitsSwitchStyle.css';
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import cn from 'classnames';
import * as actions from '../actions/index';

const getBlockClass = (letter, isCelsius) => {
  const suitableLetter = isCelsius ? 'c' : 'f';
  return cn(`${letter}-button`, 'item', 'font18', {
    'active-button': letter === suitableLetter,
    'not-active-button': letter !== suitableLetter,
  });
};

const mapStateToProps = (state) => {
  const { degreesType } = state;
  return { degreesType };
};

const mapDispatchToProps = (dispatch) => ({
  setDegreesType: (arg) => dispatch(actions.setDegreesType(arg)),
});

const MeasureUnitsSwitch = (props) => {
  const { degreesType, setDegreesType } = props;
  const isCelsius = degreesType === 'Celsius';
  const blockClassC = getBlockClass('c', isCelsius);
  const blockClassF = getBlockClass('f', isCelsius);
  const letterClassC = isCelsius ? 'active-letter' : null;
  const letterClassF = isCelsius ? null : 'active-letter';

  const handleClick = (e) => {
    e.stopPropagation();
    const newDegrees = degreesType === 'Celsius' ? 'Fahrenheit' : 'Celsius';
    setDegreesType(newDegrees);
  };

  return (
    <div className="measure-units-switch">
      <div className="degrees-simbol">°</div>
      <div className="degrees-buttons-block">
        <button className={blockClassC} type="button" onClick={handleClick} disabled={isCelsius}>
          <div className={letterClassC}>C</div>
        </button>
        <button className={blockClassF} type="button" onClick={handleClick} disabled={!isCelsius}>
          <div className={letterClassF}>F</div>
        </button>
      </div>
    </div>
  );
};

MeasureUnitsSwitch.propTypes = {
  setDegreesType: PropTypes.func.isRequired,
  degreesType: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(MeasureUnitsSwitch);
