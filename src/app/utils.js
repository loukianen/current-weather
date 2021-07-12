import axios from 'axios';

/* eslint-disable import/prefer-default-export */
export const apiConfig = {
  apiTypes: { current: 'weather', hourly: 'onecall', byCityName: 'weather' },
  baseUrl: 'https://api.openweathermap.org/data/2.5',
  appId: '97d19b5fe75467c34c18e4455586aa9d',
};

export const initState = {
  degrees: 'Celsius', // 'Fahrenheit'
  mode: 'show', // 'selection'
  name: 'Омск',
  temp: 19,
  icon: '01d',
  pressure: 752,
  humidity: 60,
  speed: 5,
  direction: 'западный',
  pop: 10,
  description: 'Преимущественно солнечно',
  screenSize: 'desktop',
};

export const getVariants = ({ city, cityIds }, str) => {
  const strNorm = str.toLowerCase();
  const suitCityIds = cityIds.filter(
    (cityId) => city[cityId].city.toLowerCase().startsWith(strNorm),
  );
  const variants = suitCityIds.map((id) => {
    const { city: cityName, region } = city[id];
    return { id, cityName: `${cityName}, ${region}` };
  });
  return variants;
};

export const getIconFileName = (iconId) => {
  let chosenFileName = 'partly cloudy';
  const mapping = [
    { fileName: 'sun', ids: ['01d', '01n'] },
    { fileName: 'cloud', ids: ['03d', '03n', '04d', '04n'] },
    { fileName: 'rain', ids: ['09d', '09n', '10d', '10n', '13d', '13n', '50d', '50n'] },
    { fileName: 'strom', ids: ['11d', '11n'] },
  ];
  mapping.every(({ fileName, ids }) => {
    if (ids.includes(iconId)) {
      chosenFileName = fileName;
      return false;
    }
    return true;
  });
  return chosenFileName;
};

export const transformDegrees = (celsiusDegrees) => {
  const fahrenheitDegrees = Math.round((celsiusDegrees * 9) / 5 + 32);
  return fahrenheitDegrees;
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

export const isCoordsValid = (coords) => {
  if (coords !== null && coords.lat && coords.lon) {
    const { lat, lon } = coords;
    return lat >= -90 && lat <= 90 && lon >= -180 && lon <= 180;
  }
  return false;
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
  window.localStorage.setItem('currentWeatherCoords', JSON.stringify(coords));
};

export const getSavedCoords = () => {
  const savedData = window.localStorage.getItem('currentWeatherCoords');
  return JSON.parse(savedData);
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

export const makeRequest = (requestData, type, callBack) => {
  const { baseUrl, apiTypes, appId } = apiConfig;
  const query = getQuery(appId, type, requestData);
  return axios.get(`${baseUrl}/${apiTypes[type]}?${query}`).then(callBack);
};

export const processCurrentResponse = (response) => {
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

export const processHourlyResponse = (response) => {
  const { pop } = response.data.hourly[0];
  const roundedPop = roundValues({ pop: pop * 100 });
  return roundedPop;
};

export const getWeatherData = (args, setStateFunc) => {
  if (typeof args === 'string') {
    makeRequest({ cityName: args }, 'byCityName', processCurrentResponse)
      .then((stateData) => {
        setStateFunc({ ...stateData });
        const coords = getSavedCoords();
        makeRequest(coords, 'hourly', processHourlyResponse)
          .then((hourlyData) => setStateFunc({ ...hourlyData }));
      });
  } else {
    makeRequest(args, 'current', processCurrentResponse)
      .then((stateData) => setStateFunc({ ...stateData }));

    makeRequest(args, 'hourly', processHourlyResponse)
      .then((stateData) => setStateFunc({ ...stateData }));
  }
};
