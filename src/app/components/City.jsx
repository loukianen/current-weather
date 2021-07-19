import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cn from 'classnames';
import * as actions from '../actions/index';
import refreshWeatherData from '../refreshWeatherData';
import MeasureUnitsSwitch from './MeasureUnitsSwitch.jsx';

const getClassNames = (screenSize) => {
  const isScreenSmall = screenSize === 'small';

  const buttonClass = cn({
    font15: isScreenSmall,
    'city-button-sm': isScreenSmall,
    font18: !isScreenSmall,
    'city-button': !isScreenSmall,
  });
  const buttonBlockClass = cn({
    'city-buttons-block-sm': isScreenSmall,
    'city-buttons-block': !isScreenSmall,
  });

  const arrowClass = cn({ 'arrow-sm': isScreenSmall, arrow: !isScreenSmall });

  return { buttonClass, buttonBlockClass, arrowClass };
};

const mapStateToProps = (state) => {
  const { weatherData, screenSize } = state;
  return { weatherData, screenSize };
};

const mapDispatchToProps = (dispatch) => ({
  setAppMode: (arg) => dispatch(actions.setAppMode(arg)),
  setStartMode: (arg) => dispatch(actions.setStartMode(arg)),
  editWeatherData: (arg) => dispatch(actions.editWeatherData(arg)),
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
    const { editWeatherData, setStartMode } = this.props;
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      const { latitude, longitude } = coords;
      refreshWeatherData({ lat: latitude, lon: longitude }, editWeatherData);
      setStartMode('normal');
    });
  }

  renderButtonBlock() {
    const { screenSize } = this.props;
    const { buttonClass, buttonBlockClass, arrowClass } = getClassNames(screenSize);
    return (
      <div className={buttonBlockClass}>
        <button className={buttonClass} type="button" onClick={this.handleChangeClick}>
          Сменить город
        </button>
        <div>
          <img className={arrowClass} src="img/location.png" alt="arrow" />
        </div>
        <button className={buttonClass} type="button" onClick={this.handleGeoClick}>
          Мое местоположение
        </button>
      </div>
    );
  }

  render() {
    const { weatherData: { name: cityName }, screenSize } = this.props;
    const isScreenSmall = screenSize === 'small';
    const cityNameClass = cn({ font30: isScreenSmall, font50: !isScreenSmall });
    const firstCityBlockClass = cn({
      'first-city-block-sm': isScreenSmall,
      'first-city-block': !isScreenSmall,
    });
    return (
      <div className="city">
        <div id="cooseCity">
          <div className={firstCityBlockClass}>
            <div className={cityNameClass}>
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
  editWeatherData: PropTypes.func.isRequired,
  weatherData: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
  screenSize: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(City);
