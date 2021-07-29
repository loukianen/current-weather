/* eslint-disable import/prefer-default-export */

export const editWeatherData = (data) => ({
  type: 'EDIT_WEATHER_DATA',
  payload: data,
});

export const setAppMode = (data) => ({
  type: 'SET_APP_MODE',
  payload: data,
});

export const getDataRequest = () => ({ type: 'GET_DATA_REQUEST' });

export const getDataSuccess = (data) => ({
  type: 'GET_DATA_SUCCESS',
  payload: data,
});

export const getDataFailure = () => ({ type: 'GET_DATA_FAILURE' });

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
