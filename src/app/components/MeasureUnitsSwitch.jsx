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

const getClassNames = (screenSize, degreesType) => {
  const isScreenSmall = screenSize === 'small';
  const isCelsius = degreesType === 'Celsius';

  const switchClass = cn({
    'measure-units-switch-sm': isScreenSmall,
    'measure-units-switch': !isScreenSmall,
  });
  const buttonBlockClass = cn({
    'degrees-buttons-block-sm': isScreenSmall,
    'degrees-buttons-block': !isScreenSmall,
  });
  const blockClassC = getBlockClass('c', isCelsius);
  const blockClassF = getBlockClass('f', isCelsius);
  const letterClassC = isCelsius ? 'active-letter' : null;
  const letterClassF = isCelsius ? null : 'active-letter';

  return {
    switchClass, buttonBlockClass, blockClassC, blockClassF, letterClassC, letterClassF,
  };
};

const mapStateToProps = (state) => {
  const { screenSize, degreesType } = state;
  return { screenSize, degreesType };
};

const mapDispatchToProps = (dispatch) => ({
  setDegreesType: (arg) => dispatch(actions.setDegreesType(arg)),
});

const MeasureUnitsSwitch = (props) => {
  const { screenSize, degreesType, setDegreesType } = props;
  const isCelsius = degreesType === 'Celsius';
  const handleClick = (e) => {
    e.stopPropagation();
    const newDegrees = degreesType === 'Celsius' ? 'Fahrenheit' : 'Celsius';
    setDegreesType(newDegrees);
  };
  const {
    switchClass, buttonBlockClass, blockClassC, blockClassF, letterClassC, letterClassF,
  } = getClassNames(screenSize, degreesType);

  return (
    <div className={switchClass}>
      <div className="degrees-simbol font18">°</div>
      <div className={buttonBlockClass}>
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
  screenSize: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(MeasureUnitsSwitch);
