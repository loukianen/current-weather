import refreshWeatherData from './refreshWeatherData';

export default (dispatchSuccess, dispatchFalure) => {
  if (!navigator.geolocation) {
    navigator.geolocation = { getCurrentPosition: () => dispatchFalure('geolocation_failure') };
  }
  return navigator.geolocation.getCurrentPosition(({ coords }) => {
    const { latitude, longitude } = coords;
    refreshWeatherData({ lat: latitude, lon: longitude }, dispatchSuccess);
  }, () => dispatchFalure('geolocation_failure'));
};
