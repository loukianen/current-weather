import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import RenderApp from './RenderApp.jsx';
import refreshWeatherData from '../refreshWeatherData';
import refreshWeatherDataByGeolocation from '../refreshWeatherDataByGeolocation';
import { getSavedCoords, isCoordsValid } from '../utils';

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
  setAppMode: (arg) => dispatch(actions.setAppMode(arg)),
  loadData: actions.loadData(dispatch),
});

const App = (props) => {
  useEffect(() => {
    const { loadData, setAppMode } = props;
    const lastCoords = getSavedCoords();
    console.log('Saved coords');
    console.log(lastCoords);
    console.log(`Is saved coords valid: ${isCoordsValid(lastCoords)}`);
    if (isCoordsValid(lastCoords)) {
      refreshWeatherData(lastCoords, loadData);
    } else {
      refreshWeatherDataByGeolocation(loadData, setAppMode);
    }
  });

  return <RenderApp renderType="app" />;
};

App.propTypes = {
  setAppMode: PropTypes.func.isRequired,
  loadData: PropTypes.objectOf(PropTypes.func).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
