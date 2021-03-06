import '../../css/citySelectionStyle.css';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import refreshWeatherData from '../refreshWeatherData';
import { getVariants } from '../utils';
import MeasureUnitsSwitch from './MeasureUnitsSwitch.jsx';

const maxVariantsInList = 7;

const setFocusOnElement = (selector) => {
  const element = document.querySelector(selector);
  element.focus();
};

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
  setAppMode: (arg) => dispatch(actions.setAppMode(arg)),
  loadData: actions.loadData(dispatch),
});

const CitySelection = (props) => {
  const { setAppMode, loadData, getCityData } = props;
  const [text, setText] = useState('');
  const [variants, setVariants] = useState([]);
  const [chosenCityId, setChosenCityId] = useState(null);
  const { ids: cityIds, city } = getCityData();

  const handleChangeText = (e) => {
    e.preventDefault();
    const newText = e.target.value;
    setChosenCityId(null);
    setVariants(getVariants({ cityIds, city }, newText));
    setText(newText);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.length === 0) {
      setAppMode('show');
      return;
    }
    if (chosenCityId !== null) {
      const { latitude, longitude } = city[chosenCityId];
      refreshWeatherData({ lat: latitude, lon: longitude }, loadData);
    } else {
      refreshWeatherData(text, loadData);
    }
  };

  const handlePressKeyOnList = ({ id, cityName }) => (e) => {
    const { target, key } = e;
    const keyHandlers = {
      Enter: () => {
        setChosenCityId(id);
        setText(cityName);
      },
      Escape: () => setAppMode('show'),
      ArrowDown: () => {
        if (target.nextSibling) {
          target.nextSibling.focus();
        }
      },
      ArrowUp: () => {
        if (target.previousSibling) {
          target.previousSibling.focus();
        } else {
          setFocusOnElement('input');
        }
      },
    };
    if (keyHandlers[key]) {
      keyHandlers[key]();
    }
  };

  const handlePressKeyOnInput = (e) => {
    const { key } = e;
    if (key === 'Escape') {
      setAppMode('show');
    }
    if (key === 'ArrowDown') {
      setFocusOnElement('div[name="listItem"]');
    }
  };

  const choseCity = ({ id, cityName }) => (e) => {
    e.stopPropagation();
    setChosenCityId(id);
    setFocusOnElement('input');
    setText(cityName);
  };

  const renderVariants = () => {
    const selctedVariants = variants.length > maxVariantsInList
      ? variants.slice(0, maxVariantsInList) : variants;

    return selctedVariants.map(({ id, cityName }) => (
      <div
        key={id}
        name="listItem"
        role="button"
        className="var-button"
        tabIndex="-1"
        data-testid="city-variant"
        onClick={choseCity({ id, cityName })}
        onKeyDown={handlePressKeyOnList({ id, cityName })}
      >
        <div>{cityName}</div>
      </div>
    ));
  };

  /* eslint-disable jsx-a11y/no-autofocus */
  const renderForm = () => (
    <form className="form-city-name" onSubmit={handleSubmit}>
      <div className="input-city-name-block">
        <input
          className="input-city-name"
          type="text"
          name="city"
          value={text}
          autoComplete="off"
          autoFocus
          onChange={handleChangeText}
          onKeyDown={handlePressKeyOnInput}
        />
        <button className="city-name-submit-button" type="submit">OK</button>
      </div>
    </form>
  );
  /* eslint-enable jsx-a11y/no-autofocus */

  return (
    <div className="container-wrap" data-testid="city-selection">
      <div className="city-select-container">
        {renderForm()}
        <div className="variants">
          <div className="variants-wraper" hidden={variants.length < 1}>
            {renderVariants()}
          </div>
        </div>
      </div>
      {window.innerWidth >= 770 ? <MeasureUnitsSwitch /> : null}
    </div>
  );
};

CitySelection.propTypes = {
  setAppMode: PropTypes.func.isRequired,
  loadData: PropTypes.objectOf(PropTypes.func).isRequired,
  getCityData: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(CitySelection);
