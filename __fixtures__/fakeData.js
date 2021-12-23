export const localStorageData = { lat: 55.7522, lon: 37.6156 };

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
    pressure: 1026,
    temp: -22.12,
  },
  weather: [
    {
      id: 804,
      main: 'Clouds',
      description: 'переменная облачность',
      icon: '04d',
    },
  ],
  wind: { deg: 287, speed: 2.16 },
};

export const moscowHurlyWeatherData = {
  hourly: [{ pop: 0.03 }],
};
export const startPageCurWeatherData = {
  coord: null,
  name: 'Выберите город',
  main: {
    humidity: 60,
    pressure: 1003,
    temp: 19,
  },
  weather: [
    {
      id: 1,
      main: 'Sun',
      description: 'Не удалось определить местоположение',
      icon: '01d',
    },
  ],
  wind: { deg: 287, speed: 5 },
};

export const startPageHurlyWeatherData = {
  hourly: [{ pop: 0.1 }],
};
