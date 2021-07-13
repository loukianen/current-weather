import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { getWeatherData, getVariants } from './utils';
import cityDataJson from './cityData';
import MeasureUnitsSwitch from './MeasureUnitsSwitch.jsx';

const { ids: cityIds, city } = JSON.parse(cityDataJson);

const CitySelection = (props) => {
  const { setCommonState, screenSize, deg } = props;
  const [text, setText] = useState('');
  const [variants, setVariants] = useState([]);
  const [chosenCityId, setChosenCityId] = useState(null);

  const handleChangeText = (e) => {
    e.preventDefault();
    const newText = e.target.value;
    setChosenCityId(null);
    setText(newText);
    setVariants(getVariants({ cityIds, city }, newText));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.length === 0) {
      setCommonState({ mode: 'show' });
    } else if (chosenCityId === null) {
      getWeatherData(text, setCommonState);
    } else {
      const { latitude, longitude } = city[chosenCityId];
      getWeatherData({ lat: latitude, lon: longitude }, setCommonState);
    }
    setCommonState({ mode: 'show' });
  };

  const choseCity = ({ id, cityName }) => (e) => {
    e.stopPropagation();
    setChosenCityId(id);
    setText(cityName);
    const inputElement = document.querySelector('input');
    inputElement.focus();
  };

  const handlePressEnter = ({ id, cityName }) => (e) => {
    const { target } = e;
    if (e.key === 'Escape') {
      setCommonState({ mode: 'show' });
    }
    if (e.key === 'Enter') {
      setChosenCityId(id);
      setText(cityName);
    }
    if (e.key === 'ArrowDown') {
      if (target.nextSibling) {
        target.nextSibling.focus();
      }
    }
    if (e.key === 'ArrowUp') {
      if (target.previousSibling) {
        target.previousSibling.focus();
      } else {
        const inputElement = document.querySelector('input');
        inputElement.focus();
      }
    }
  };

  const isScreenSmall = screenSize === 'small';
  const containerClass = isScreenSmall ? 'city-select-container-sm' : 'city-select-container';
  const inputBlockClass = isScreenSmall ? 'input-city-name-block br-4' : 'input-city-name-block br-8';
  const inputClass = isScreenSmall ? 'input-city-name height-53 font15' : 'input-city-name height-97 font30';
  const submitButtonClass = isScreenSmall ? 'city-name-submit-button width-22 font15' : 'city-name-submit-button width-55 font30';
  const liClass = isScreenSmall ? 'var-button height-22 font22' : 'var-button height-53 font25';

  const renderVariants = () => {
    if (variants.length <= 0) {
      return null;
    }
    const selctedVariants = variants.length > 7 ? variants.slice(0, 7) : variants;
    return selctedVariants.map(({ id, cityName }) => (
      <div key={id} name="li" className={liClass} tabIndex="-1" onClick={choseCity({ id, cityName })} onKeyDown={handlePressEnter({ id, cityName })}>
        <div>{cityName}</div>
      </div>
    ));
  };

  const rectangleEscHandle = (e) => {
    if (e.key === 'Escape') {
      setCommonState({ mode: 'show' });
    }
    if (e.key === 'ArrowDown') {
      const firstVarElement = document.querySelector('div[name="li"');
      firstVarElement.focus();
    }
  };

  /* eslint-disable jsx-a11y/no-autofocus */
  return (
    <div className="container-wrap">
      <div className={containerClass}>
        <form className="form-city-name" onSubmit={handleSubmit}>
          <div className={inputBlockClass}>
            <input className={inputClass} name="city" value={text} autoComplete="off" autoFocus="true" onChange={handleChangeText} onKeyDown={rectangleEscHandle} />
            <button className={submitButtonClass} type="submit">OK</button>
          </div>
        </form>
        <div className="variants">
          <div className="variants-wraper" hidden={variants.length < 1}>
            {renderVariants()}
          </div>
        </div>
      </div>
      {screenSize === 'desktop' ? <MeasureUnitsSwitch degrees={deg} setCommonState={setCommonState} /> : null}
    </div>
  );
};

CitySelection.propTypes = {
  setCommonState: PropTypes.func.isRequired,
  screenSize: PropTypes.string.isRequired,
  deg: PropTypes.string.isRequired,
};

export default CitySelection;
