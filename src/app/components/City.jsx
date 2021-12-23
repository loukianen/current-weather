import '../../css/cityStyle.css';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import refreshWeatherDataByGeolocation from '../refreshWeatherDataByGeolocation';
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
    refreshWeatherDataByGeolocation(loadData, setAppMode);
  };

  const renderButtonBlock = () => (
    <div className="city-buttons-block">
      <button className="city-button" type="button" onClick={handleChangeClick} data-testid="change-city-btn">
        Сменить город
      </button>
      <div>
        <img className="arrow" src="img/location.png" alt="arrow" />
      </div>
      <button className="city-button" type="button" onClick={handleGeoClick} data-testid="get-geo-btn">
        Мое местоположение
      </button>
    </div>
  );

  return (
    <>
      <div className="first-city-block" data-testid="city">
        <div className="city-name" data-testid="cityName">
          {cityName}
        </div>
        <MeasureUnitsSwitch />
      </div>
      {renderButtonBlock()}
    </>
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
