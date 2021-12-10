import iconMapping from '../sources/iconMapping';

export const initState = {
  degreesType: 'Celsius', // 'Fahrenheit'
  appMode: 'show',
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
  if (iconMapping[iconId]) {
    chosenFileName = iconMapping[iconId];
  }
  return chosenFileName;
};

export const isCoordsValid = (coords) => {
  if (coords instanceof Object) {
    const { lat, lon } = coords;
    const isLatitudeValid = lat >= -90 && lat <= 90;
    const isLongitudeValide = lon >= -180 && lon <= 180;
    return isLatitudeValid && isLongitudeValide;
  }
  return false;
};

export const transformDegrees = (celsiusDegrees) => {
  const fahrenheitDegrees = Math.round((celsiusDegrees * 9) / 5 + 32);
  return fahrenheitDegrees;
};

export const transformPressureUnits = (pressHPa) => {
  const transformationKoef = 0.750063755419211;
  const pressMmHg = Math.round(pressHPa * transformationKoef);
  return pressMmHg;
};

export const saveCoords = (coords) => {
  window.localStorage.setItem('currentWeatherCoords', JSON.stringify(coords));
};

export const getSavedCoords = () => {
  const savedData = window.localStorage.getItem('currentWeatherCoords');
  return savedData !== null ? JSON.parse(savedData) : null;
};
