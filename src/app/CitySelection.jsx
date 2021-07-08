import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { getWeatherData, getVariants } from './utils';
import cityDataJson from './cityData';

const { ids: cityIds, city } = JSON.parse(cityDataJson);

const CitySelection = (props) => {
  const { setCommonState } = props;
  const [text, setText] = useState();
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
    if (chosenCityId === null) {
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
  };

  const renderVariants = () => {
    if (variants.length <= 0) {
      return null;
    }
    return variants.map(({ id, cityName }) => (
      <option key={id} type="button" className="var-button" onClick={choseCity({ id, cityName })}>{cityName}</option>
    ));
  };

  const optionsSize = variants.length < 7 ? variants.length : 7;
  /* eslint-disable react/no-unknown-property */
  return (
    <div className="city-select-container">
      <form className="form-city-name" onSubmit={handleSubmit}>
        <input name="city" value={text} autocomplete="off" onChange={handleChangeText} />
        <button type="submit">OK</button>
      </form>
      <div className="variants">
        <select size={optionsSize}>
          {renderVariants()}
        </select>
      </div>
    </div>
  );
};

CitySelection.propTypes = {
  setCommonState: PropTypes.func.isRequired,
};

export default CitySelection;
