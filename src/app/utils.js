/* eslint-disable import/prefer-default-export */

export const initState = {
  degreesType: 'Celsius', // 'Fahrenheit'
  appMode: 'show', // 'selection'
  startMode: 'notSet',
  weatherData: {
    name: 'Выберите город',
    temp: 19,
    icon: '01d',
    pressure: 752,
    humidity: 60,
    speed: 5,
    direction: 'западный',
    pop: 10,
    description: 'Данные не загружены',
  },
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

export const isCoordsValid = (coords) => {
  if (coords !== null && coords.lat && coords.lon) {
    const { lat, lon } = coords;
    return lat >= -90 && lat <= 90 && lon >= -180 && lon <= 180;
  }
  return false;
};

export const transformDegrees = (celsiusDegrees) => {
  const fahrenheitDegrees = Math.round((celsiusDegrees * 9) / 5 + 32);
  return fahrenheitDegrees;
};

export const transformPressureUnits = (pressHPa) => {
  const koefTransformation = 0.750063755419211;
  const pressMmHg = pressHPa * koefTransformation;
  return pressMmHg;
};

export const getSavedStartMode = () => window.localStorage.getItem('currentWeatherMode');

export const saveStartMode = (mode) => window.localStorage.setItem('currentWeatherMode', mode);

export const saveCoords = (coords) => {
  window.localStorage.setItem('currentWeatherCoords', JSON.stringify(coords));
};

export const getSavedCoords = () => {
  const savedData = window.localStorage.getItem('currentWeatherCoords');
  return savedData !== null ? JSON.parse(savedData) : null;
};
