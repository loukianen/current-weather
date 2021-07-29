import { combineReducers } from 'redux';

const degreesTypeReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_DEGREES_TYPE':
      return action.payload;
    default:
      return state;
  }
};

const appModeReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_APP_MODE':
      return action.payload;
    case 'GET_DATA_REQUEST':
      return 'loading';
    case 'GET_DATA_SUCCESS':
      return 'show';
    case 'GET_DATA_FAILURE':
      return 'failure';
    default:
      return state;
  }
};

const startModeReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_START_MODE':
      return action.payload;
    default:
      return state;
  }
};

const weatherDataReducer = (state = {}, action) => {
  switch (action.type) {
    case 'EDIT_WEATHER_DATA':
      return { ...state, ...action.payload };
    case 'GET_DATA_SUCCESS':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

const screenSizeReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_SCREEN_SIZE':
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  degreesType: degreesTypeReducer,
  appMode: appModeReducer,
  startMode: startModeReducer,
  weatherData: weatherDataReducer,
  screenSize: screenSizeReducer,
});
