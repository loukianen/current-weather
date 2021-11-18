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
  setStartMode: (arg) => dispatch(actions.setStartMode(arg)),
  loadData: actions.loadData(dispatch),
});

class City extends React.Component {
  constructor(props) {
    super(props);
    this.handleChangeClick = this.handleChangeClick.bind(this);
    this.handleGeoClick = this.handleGeoClick.bind(this);
  }

  handleChangeClick(e) {
    const { setStartMode, setAppMode } = this.props;
    e.stopPropagation();
    setAppMode('selection');
    setStartMode('normal');
  }

  handleGeoClick(e) {
    e.stopPropagation();
    const { loadData, setStartMode, setAppMode } = this.props;
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      const { latitude, longitude } = coords;
      setStartMode('normal');
      refreshWeatherData({ lat: latitude, lon: longitude }, loadData);
    }, () => setAppMode('geolocation_failure'));
  }

  renderButtonBlock() {
    return (
      <div className="city-buttons-block">
        <button className="city-button" type="button" onClick={this.handleChangeClick}>
          Сменить город
        </button>
        <div>
          <img className="arrow" src="img/location.png" alt="arrow" />
        </div>
        <button className="city-button" type="button" onClick={this.handleGeoClick}>
          Мое местоположение
        </button>
      </div>
    );
  }

  render() {
    const { weatherData: { name: cityName } } = this.props;
    return (
      <div className="city">
        <div id="cooseCity">
          <div className="first-city-block">
            <div className="city-name">
              {cityName}
            </div>
            <MeasureUnitsSwitch />
          </div>
          {this.renderButtonBlock()}
        </div>
      </div>
    );
  }
}

City.propTypes = {
  setAppMode: PropTypes.func.isRequired,
  setStartMode: PropTypes.func.isRequired,
  loadData: PropTypes.objectOf(PropTypes.func).isRequired,
  weatherData: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(City);
