export const localStorageData = '{"lat":"55.7522","lon":"37.6156"}';

export const geolocationData = { coords: { latitude: 50.8047, longitude: 42.0138 } };

export const urupinskCurWeatherData = {
  coord: { lon: 42.0138, lat: 50.8047 },
  name: 'Урюпинск',
  main: {
    humidity: 85,
    pressure: 1014,
    temp: -15.22,
  },
  weather: [
    {
      id: 804,
      main: 'Clouds',
      description: 'пасмурно',
      icon: '04d',
    },
  ],
  wind: { deg: 316, speed: 4.91 },
};

export const urupinskHurlyWeatherData = {
  hourly: [{ pop: 0 }],
};

export const moscowCurWeatherData = {
  coord: { lat: 55.7522, lon: 37.6156 },
  name: 'Москва',
  main: {
    humidity: 99,
    pressure: 1016,
    temp: -22.12,
  },
  weather: [
    {
      id: 804,
      main: 'Clouds',
      description: 'пасмурно',
      icon: '04d',
    },
  ],
  wind: { deg: 287, speed: 2.16 },
};

export const moscowHurlyWeatherData = {
  hourly: [{ pop: 0 }],
};
