import axios from 'axios';

/* eslint-disable import/prefer-default-export */
export const apiConfig = {
  apiTypes: { current: 'weather', hourly: 'onecall' },
  baseUrl: 'https://api.openweathermap.org/data/2.5',
  appId: '97d19b5fe75467c34c18e4455586aa9d',
};

const getWindDirection = (value) => {
  let direction = 'северный';
  if (value > 22) {
    direction = 'северо-восточный';
  }
  if (value > 67) {
    direction = 'восточный';
  }
  if (value > 112) {
    direction = 'юго-восточный';
  }
  if (value > 157) {
    direction = 'южный';
  }
  if (value > 202) {
    direction = 'юго-западный';
  }
  if (value > 247) {
    direction = 'западный';
  }
  if (value > 292) {
    direction = 'северо-западный';
  }
  if (value > 337) {
    direction = 'северный';
  }
  return direction;
};

const transformPressureUnits = (pressHPa) => {
  const koefTransformation = 0.750063755419211;
  const pressMmHg = pressHPa * koefTransformation;
  return pressMmHg;
};

const roundValues = (values) => {
  const valuesName = Object.keys(values);
  const newPairs = valuesName.map((item) => [item, Math.round(values[item])]);
  const roundedValues = Object.fromEntries(newPairs);
  return roundedValues;
};

export const saveCoords = (coords) => {
  const { latitude, longitude } = coords;
  window.localStorage.setItem('currentWeatherCoords', JSON.stringify({ latitude, longitude }));
};

const getQuery = (lat, lon, id, type) => {
  const queries = {
    current: `lat=${lat}&lon=${lon}&appid=${id}&units=metric&lang=ru`,
    hourly: `lat=${lat}&lon=${lon}&exclude=current,minutely,daily,alertsy&appid=${id}`,
  };
  return queries[type];
};

export const makeRequest = (coords, type, callBack) => {
  const { latitude, longitude } = coords;
  const { baseUrl, apiTypes, appId } = apiConfig;
  const query = getQuery(latitude, longitude, appId, type);
  return axios.get(`${baseUrl}/${apiTypes[type]}?${query}`).then(callBack);
};

export const processCurrentResponse = (response) => {
  const {
    name,
    main: { temp, pressure: presHPa, humidity },
    wind: { speed, deg },
    weather,
  } = response.data;
  const pressure = transformPressureUnits(presHPa);
  const { icon, description } = weather[0];
  const direction = getWindDirection(deg);
  const roundedValues = roundValues({
    temp, pressure, humidity, speed,
  });
  const processedData = {
    name, icon, direction, description, ...roundedValues,
  };
  return processedData;
};

export const processHourlyResponse = (response) => {
  const { pop } = response.data.hourly[0];
  const roundedPop = roundValues({ pop });
  return roundedPop;
};

export const getWeatherData = (coords, setStateFunc) => {
  makeRequest(coords, 'current', processCurrentResponse)
    .then((stateData) => setStateFunc({ ...stateData }));

  makeRequest(coords, 'hourly', processHourlyResponse)
    .then((stateData) => setStateFunc({ ...stateData }));

  saveCoords(coords);
};
