import axios from 'axios';
import getWeatherApiToken from '../sources/getWeatherApiToken';
import { saveCoords, getSavedCoords, transformPressureUnits } from './utils';

const apiConfig = {
  apiTypes: { current: 'weather', hourly: 'onecall', byCityName: 'weather' },
  baseUrl: 'https://api.openweathermap.org/data/2.5',
  appId: getWeatherApiToken(), // '97d19b5fe75467c34c18e4455586aa9d',
};

const getWindDirection = (value) => {
  const windMapping = {
    северный: [[0, 23], [338, 361]],
    'северо-восточный': [[23, 68]],
    восточный: [[68, 113]],
    'юго-восточный': [[113, 158]],
    южный: [[158, 203]],
    'юго-западный': [[203, 248]],
    западный: [[248, 293]],
    'северо-западный': [[293, 338]],
  };
  let direction = null;
  Object.keys(windMapping)
    .every((wind) => windMapping[wind]
      .every((range) => {
        const [beginig, end] = range;
        if (value >= beginig && value < end) {
          direction = wind;
          return false;
        }
        return true;
      }));
  return direction;
};

const roundValues = (values) => {
  const valuesName = Object.keys(values);
  const newPairs = valuesName.map((item) => [item, Math.round(values[item])]);
  const roundedValues = Object.fromEntries(newPairs);
  return roundedValues;
};

const processCurrentResponse = (response) => {
  const {
    name, coord, weather,
    main: { temp, pressure: presHPa, humidity },
    wind: { speed, deg },
  } = response.data;
  saveCoords(coord);
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

const processHourlyResponse = (response) => {
  const { pop } = response.data.hourly[0];
  const roundedPop = roundValues({ pop: pop * 100 });
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
  return axios.get(`${baseUrl}/${apiTypes[type]}?${query}`).then(callBack);
};

export default (args, setStateFunctions) => {
  const { makeRequest, processSuccessfulAnswer, processFailedAnswer } = setStateFunctions;
  makeRequest();
  if (typeof args === 'string') {
    getWeatherData({ cityName: args }, 'byCityName', processCurrentResponse)
      .then((stateData) => {
        processSuccessfulAnswer({ ...stateData });
        const coords = getSavedCoords();
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
