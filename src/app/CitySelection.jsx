import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { getWeatherData, getVariants } from './utils';
import cityDataJson from './cityData';

const { ids: cityIds, city } = JSON.parse(cityDataJson);

const CitySelection = (props) => {
  const { setCommonState, screenSize } = props;
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

  const choseCity = ({ id, cityName }) => () => {
    setChosenCityId(id);
    setText(cityName);
    const inputElement = document.querySelector('input');
    inputElement.focus();
  };

  const handlePressEnter = ({ id, cityName }) => (e) => {
    if (e.key === 'Enter') {
      setChosenCityId(id);
      setText(cityName);
      const inputElement = document.querySelector('input');
      inputElement.focus();
    }
  };

  const containerClass = screenSize === 'small' ? 'city-select-container-sm' : 'city-select-container';
  const inputBlockClass = screenSize === 'small' ? 'input-city-name-block br-4' : 'input-city-name-block br-8';
  const inputClass = screenSize === 'small' ? 'input-city-name height-53 font15' : 'input-city-name height-97 font30';
  const submitButtonClass = screenSize === 'small' ? 'city-name-submit-button width-22 font15' : 'city-name-submit-button width-55 font30';
  const liClass = screenSize === 'small' ? 'var-button height-22 font35' : 'var-button height-53 font30';

  const renderVariants = () => {
    if (variants.length <= 0) {
      return null;
    }
    const selctedVariants = variants.length > 7 ? variants.slice(0, 6) : variants;
    return selctedVariants.map(({ id, cityName }) => (
      <div key={id} name="li" className={liClass} onClick={choseCity({ id, cityName })} onKeyDown={handlePressEnter({ id, cityName })}>{cityName}</div>
    ));
  };

  const rectangleEscHandle = (e) => {
    if (e.key === 'Escape') {
      setCommonState({ mode: 'show' });
    }
  };

  /* eslint-disable jsx-a11y/no-autofocus */
  return (
    <div className={containerClass}>
      <form className="form-city-name" onSubmit={handleSubmit}>
        <div className={inputBlockClass}>
          <input className={inputClass} name="city" value={text} autoComplete="off" autoFocus="true" onChange={handleChangeText} onKeyDown={rectangleEscHandle} />
          <button className={submitButtonClass} type="submit">OK</button>
        </div>
      </form>
      <div className="variants">
        <div className="variants-wraper">
          {renderVariants()}
        </div>
      </div>
    </div>
  );
};

CitySelection.propTypes = {
  setCommonState: PropTypes.func.isRequired,
  screenSize: PropTypes.string.isRequired,
};

export default CitySelection;
