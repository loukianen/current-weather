import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { merge } from 'lodash';
import App from './App.jsx';
import ShowTemplate from './ShowTemplate.jsx';
import reducer from '../reducers/index';
import { initState } from '../utils';

// eslint-disable no-underscore-dangle
const composeEnhancers = compose; // window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// eslint-enable

const getStore = (mode) => {
  const editStateMapping = {
    desktop: { weatherData: { name: 'Омск', description: 'Преимущественно солнечно' } },
    mobile: {
      weatherData: {
        name: 'Омск',
        temp: 14,
        icon: '09d',
        description: 'Дождь',
      },
    },
    default: {},
  };
  const stateUpdate = editStateMapping[mode] ? editStateMapping[mode] : editStateMapping.default;
  const currentState = merge({}, initState, stateUpdate);
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

StoreProvider.defaultProps = {
  mode: 'app',
};

StoreProvider.propTypes = {
  mode: PropTypes.string,
};

export default StoreProvider;
