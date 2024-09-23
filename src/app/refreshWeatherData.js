import axios from 'axios';
import * as utils from './utils';

const apiConfig = {
  apiTypes: { current: 'weather', hourly: 'onecall', byCityName: 'weather' },
  baseUrl: 'https://api.openweathermap.org/data/2.5',
  appId: process.env.WEATHER_API_TOKEN,
};

const processCurrentResponse = (response) => {
  const {
    name, coord, weather,
    main: { temp, pressure: presHPa, humidity },
    wind: { speed, deg },
  } = response.data;
  utils.saveCoords(coord);
  const pressure = utils.transformPressureUnits(presHPa);
  const { icon, description } = weather[0];
  const direction = utils.getWindDirection(deg);
  const roundedValues = utils.roundValues({
    temp, pressure, humidity, speed,
  });
  const processedData = {
    name, icon, direction, description, ...roundedValues,
  };
  return processedData;
};

const processHourlyResponse = (response) => {
  const { pop } = response.data.hourly[0];
  const roundedPop = utils.roundValues({ pop: pop * 100 });
  return roundedPop;
};

const getQuery = (id, type, queryData) => {
  const { cityName, lat, lon } = queryData;
  const queries = {
    byCityName: `q=${cityName}&appid=${id}&units=metric&lang=ru`,
    current: `lat=${lat}&lon=${lon}&appid=${id}&units=metric&lang=ru`,
    hourly: `lat=${lat}&lon=${lon}&exclude=current,minutely,daily,alertsy&appid=${id}`,
  };
  return queries[type];
};

const getWeatherData = (requestData, type, callBack) => {
  const { baseUrl, apiTypes, appId } = apiConfig;
  const query = getQuery(appId, type, requestData);

  // I made data of probability of precipitation faked, becose api no free from october 2024
  if (type === 'hourly') {
    const fakeData = { data: { hourly: [{ pop: Math.random() }] } };
    const response = new Promise((resolve, reject) => {
      resolve(fakeData);
    });
    return response.then(callBack);
  }

  return axios.get(`${baseUrl}/${apiTypes[type]}?${query}`).then(callBack);
};

export default (args, setStateFunctions) => {
  const { makeRequest, processSuccessfulAnswer, processFailedAnswer } = setStateFunctions;
  makeRequest();
  if (typeof args === 'string') {
    getWeatherData({ cityName: args }, 'byCityName', processCurrentResponse)
      .then((stateData) => {
        processSuccessfulAnswer({ ...stateData });
        const coords = utils.getSavedCoords();
        getWeatherData(coords, 'hourly', processHourlyResponse)
          .then((hourlyData) => processSuccessfulAnswer({ ...hourlyData }))
          .catch(() => processFailedAnswer());
      })
      .catch(() => processFailedAnswer());
  } else {
    getWeatherData(args, 'current', processCurrentResponse)
      .then((stateData) => processSuccessfulAnswer({ ...stateData }))
      .catch(() => processFailedAnswer());

    getWeatherData(args, 'hourly', processHourlyResponse)
      .then((stateData) => processSuccessfulAnswer({ ...stateData }))
      .catch(() => processFailedAnswer());
  }
};
