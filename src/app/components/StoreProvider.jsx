import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import App from './App.jsx';
import ShowTemplate from './ShowTemplate.jsx';
import reducer from '../reducers/index';
import { initState } from '../utils';

// eslint-disable no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// eslint-enable

const getStore = (mode = 'app') => {
  const currentState = { ...initState };
  const correctStateMapping = {
    desktop: () => {
      currentState.weatherData.name = 'Омск';
      currentState.weatherData.description = 'Преимущественно солнечно';
    },
    mobile: () => {
      currentState.weatherData.name = 'Омск';
      currentState.weatherData.temp = 14;
      currentState.weatherData.icon = '09d';
      currentState.weatherData.description = 'Дождь';
    },
  };
  if (correctStateMapping[mode]) {
    correctStateMapping[mode]();
  }
  return createStore(reducer, currentState, composeEnhancers(applyMiddleware(thunk)));
};

const StoreProvider = (props) => {
  const { mode } = props;
  const store = getStore(mode);
  return (
    <Provider store={store}>
      {mode === 'desktop' || mode === 'mobile' ? <ShowTemplate /> : <App />}
    </Provider>
  );
};

StoreProvider.propTypes = {
  mode: PropTypes.string.isRequired,
};

export default StoreProvider;
