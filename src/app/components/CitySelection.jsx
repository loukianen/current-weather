import '../../css/citySelectionStyle.css';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import refreshWeatherData from '../refreshWeatherData';
import { getVariants } from '../utils';
import getCityData from '../../sources/getCityData';
import MeasureUnitsSwitch from './MeasureUnitsSwitch.jsx';

const { ids: cityIds, city } = getCityData();

const setFocusOnElement = (selector) => {
  const element = document.querySelector(selector);
  element.focus();
};

const mapStateToProps = (state) => {
  const { screenSize } = state;
  return { screenSize };
};

const mapDispatchToProps = (dispatch) => ({
  setAppMode: (arg) => dispatch(actions.setAppMode(arg)),
  loadData: actions.loadData(dispatch),
});

class CitySelection extends React.Component {
  constructor(props) {
    super(props);
    this.handleChangeText = this.handleChangeText.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.choseCity = this.choseCity.bind(this);
    this.handlePressKeyOnList = this.handlePressKeyOnList.bind(this);
    this.handlePressKeyOnInput = this.handlePressKeyOnInput.bind(this);
    this.state = { text: '' };
    this.variants = [];
    this.chosenCityId = null;
  }

  handleChangeText(e) {
    e.preventDefault();
    const newText = e.target.value;
    this.chosenCityId = null;
    this.variants = getVariants({ cityIds, city }, newText);
    this.setState({ text: newText });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { setAppMode, loadData } = this.props;
    const { text } = this.state;
    if (text.length === 0) {
      setAppMode('show');
      return;
    }
    if (this.chosenCityId !== null) {
      const { latitude, longitude } = city[this.chosenCityId];
      refreshWeatherData({ lat: latitude, lon: longitude }, loadData);
    }
    refreshWeatherData(text, loadData);
  }

  handlePressKeyOnList({ id, cityName }) {
    const { setAppMode } = this.props;
    return (e) => {
      const { target } = e;
      if (e.key === 'Escape') {
        setAppMode('show');
      }
      if (e.key === 'Enter') {
        this.chosenCityId = id;
        this.setState({ text: cityName });
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
          setFocusOnElement('input');
        }
      }
    };
  }

  handlePressKeyOnInput(e) {
    const { setAppMode } = this.props;
    if (e.key === 'Escape') {
      setAppMode('show');
    }
    if (e.key === 'ArrowDown') {
      setFocusOnElement('div[name="listItem"]');
    }
  }

  choseCity({ id, cityName }) {
    return (e) => {
      e.stopPropagation();
      this.chosenCityId = id;
      setFocusOnElement('input');
      this.setState({ text: cityName });
    };
  }

  renderVariants() {
    const selctedVariants = this.variants.length > 7 ? this.variants.slice(0, 7) : this.variants;

    return selctedVariants.map(({ id, cityName }) => (
      <div
        key={id}
        name="listItem"
        role="button"
        className="var-button"
        tabIndex="-1"
        onClick={this.choseCity({ id, cityName })}
        onKeyDown={this.handlePressKeyOnList({ id, cityName })}
      >
        <div>{cityName}</div>
      </div>
    ));
  }

  renderForm() {
    /* eslint-disable jsx-a11y/no-autofocus */
    const { text } = this.state;
    return (
      <form className="form-city-name" onSubmit={this.handleSubmit}>
        <div className="input-city-name-block">
          <input
            className="input-city-name"
            name="city"
            value={text}
            autoComplete="off"
            autoFocus
            onChange={this.handleChangeText}
            onKeyDown={this.handlePressKeyOnInput}
          />
          <button className="city-name-submit-button" type="submit">OK</button>
        </div>
      </form>
    );
    /* eslint-enable jsx-a11y/no-autofocus */
  }

  render() {
    const { screenSize } = this.props;

    return (
      <div className="container-wrap">
        <div className="city-select-container">
          {this.renderForm()}
          <div className="variants">
            <div className="variants-wraper" hidden={this.variants.length < 1}>
              {this.renderVariants()}
            </div>
          </div>
        </div>
        {window.innerWidth >= 450 ? <MeasureUnitsSwitch /> : null}
      </div>
    );
  }
}

CitySelection.propTypes = {
  setAppMode: PropTypes.func.isRequired,
  loadData: PropTypes.objectOf(PropTypes.func).isRequired,
  screenSize: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(CitySelection);
