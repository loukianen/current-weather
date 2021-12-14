import '../../css/cityStyle.css';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import refreshWeatherData from '../refreshWeatherData';
import MeasureUnitsSwitch from './MeasureUnitsSwitch.jsx';

const mapStateToProps = (state) => {
  const { weatherData } = state;
  return { weatherData };
};

const mapDispatchToProps = (dispatch) => ({
  setAppMode: (arg) => dispatch(actions.setAppMode(arg)),
  loadData: actions.loadData(dispatch),
});

const City = (props) => {
  const { loadData, setAppMode, weatherData: { name: cityName } } = props;

  const handleChangeClick = (e) => {
    e.stopPropagation();
    setAppMode('selection');
  };

  const handleGeoClick = (e) => {
    e.stopPropagation();
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      const { latitude, longitude } = coords;
      refreshWeatherData({ lat: latitude, lon: longitude }, loadData);
    }, () => setAppMode('geolocation_failure'));
  };

  const renderButtonBlock = () => (
    <div className="city-buttons-block">
      <button className="city-button" type="button" onClick={handleChangeClick}>
        Сменить город
      </button>
      <div>
        <img className="arrow" src="img/location.png" alt="arrow" />
      </div>
      <button className="city-button" type="button" onClick={handleGeoClick}>
        Мое местоположение
      </button>
    </div>
  );

  return (
    <div>
      <div className="first-city-block">
        <div className="city-name">
          {cityName}
        </div>
        <MeasureUnitsSwitch />
      </div>
      {renderButtonBlock()}
    </div>
  );
};

City.propTypes = {
  setAppMode: PropTypes.func.isRequired,
  loadData: PropTypes.objectOf(PropTypes.func).isRequired,
  weatherData: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(City);
