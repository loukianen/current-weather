import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import RenderApp from './RenderApp.jsx';
import refreshWeatherData from '../refreshWeatherData';
import { getSavedCoords, isCoordsValid } from '../utils';

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
  loadData: actions.loadData(dispatch),
});

class App extends React.Component {
  componentDidMount() {
    this.normalModeAppStart();
  }

  normalModeAppStart() {
    const { loadData } = this.props;
    const lastCoords = getSavedCoords();
    if (isCoordsValid(lastCoords)) {
      refreshWeatherData(lastCoords, loadData);
    } else {
      this.refreshWeatherDataWithGeoposition();
    }
  }

  refreshWeatherDataWithGeoposition() {
    const { loadData } = this.props;
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      const { latitude, longitude } = coords;
      refreshWeatherData({ lat: latitude, lon: longitude }, loadData);
    });
  }

  render() {
    return <RenderApp renderType="app" />;
  }
}

App.propTypes = {
  loadData: PropTypes.objectOf(PropTypes.func).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
