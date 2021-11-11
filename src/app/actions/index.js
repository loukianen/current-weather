export const editWeatherData = (data) => ({
  type: 'EDIT_WEATHER_DATA',
  payload: data,
});

export const setAppMode = (data) => ({
  type: 'SET_APP_MODE',
  payload: data,
});

const makeRequest = () => ({ type: 'GET_DATA_REQUEST' });

const processSuccessfulRequestResult = (data) => ({
  type: 'GET_DATA_SUCCESS',
  payload: data,
});

const processFailedRequestResult = () => ({ type: 'GET_DATA_FAILURE' });

export const loadData = (dispatch) => ({
  makeRequest: () => dispatch(makeRequest()),
  processSuccessfulAnswer: (arg) => dispatch(processSuccessfulRequestResult(arg)),
  processFailedAnswer: () => dispatch(processFailedRequestResult()),
});

export const setDegreesType = (data) => ({
  type: 'SET_DEGREES_TYPE',
  payload: data,
});

export const setScreenSize = (data) => ({
  type: 'SET_SCREEN_SIZE',
  payload: data,
});

export const setStartMode = (data) => ({
  type: 'SET_START_MODE',
  payload: data,
});
