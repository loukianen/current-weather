import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import nock from 'nock';
import { omit } from 'lodash';
import reducer from '../src/app/reducers/index';
import { initState } from '../src/app/utils';
import App from '../src/app/components/App.jsx';
import * as fakeData from '../__fixtures__/fakeData';

const renderWithRedux = (
  component,
  { state, store = createStore(reducer, state, compose(applyMiddleware(thunk))) } = {},
) => ({
  ...render(<Provider store={store}>{component}</Provider>),
  store,
});

const url = new URL('https://api.openweathermap.org/data/2.5');

const getScope = (content, apiType) => nock(url.origin)
  .get(`${url.pathname}/${apiType}`)
  .query(() => true)
  .reply(200, content, { 'Access-Control-Allow-Origin': '*' });

describe('App', () => {
  let customeStorage = {};

  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn((key) => customeStorage[key] || null),
        setItem: jest.fn((key, value) => {
          customeStorage[key] = JSON.stringify(value);
        }),
        removeItem: jest.fn((key) => {
          customeStorage = omit(customeStorage, key);
        }),
      },
      writable: true,
    });
    navigator.geolocation = null;
  });

  afterEach(() => {
    nock.cleanAll();
    jest.clearAllMocks();
    customeStorage = {};
    navigator.geolocation = null;
  });

  it('should render page with geolocation data', async () => {
    const content = {
      firstPart: fakeData.urupinskCurWeatherData,
      secondPart: fakeData.urupinskHurlyWeatherData,
    };

    const scope1 = getScope(content.firstPart, 'weather');
    const scope2 = getScope(content.secondPart, 'onecall');

    navigator.geolocation = { getCurrentPosition: (cb) => cb(fakeData.geolocationData) };

    renderWithRedux(<App />, { state: initState });

    await waitFor(() => expect(screen.getByTestId('cityName').innerHTML).toBe('Урюпинск'));
    await waitFor(() => expect(screen.getByTestId('temp').innerHTML).toBe('-15°'));
    await waitFor(() => expect(screen.getByTestId('description').innerHTML).toBe('пасмурно'));
    await waitFor(() => expect(screen.getByTestId('block-1').innerHTML).toBe('5 м/с, северо-западный'));
    await waitFor(() => expect(screen.getByTestId('block-2').innerHTML).toBe('761 мм рт. ст.'));
    await waitFor(() => expect(screen.getByTestId('block-3').innerHTML).toBe('85%'));
    await waitFor(() => expect(screen.getByTestId('block-4').innerHTML).toBe('0%'));

    expect(scope1.isDone()).toBeTruthy();
    expect(scope2.isDone()).toBeTruthy();
  });

  it('should render page with local storage data', async () => {
    const content = {
      firstPart: fakeData.moscowCurWeatherData,
      secondPart: fakeData.moscowHurlyWeatherData,
    };

    const scope1 = getScope(content.firstPart, 'weather');
    const scope2 = getScope(content.secondPart, 'onecall');

    window.localStorage.setItem('currentWeatherCoords', fakeData.localStorageData);

    renderWithRedux(<App />, { state: initState });

    await waitFor(() => expect(screen.getByTestId('cityName').innerHTML).toBe('Москва'));
    await waitFor(() => expect(screen.getByTestId('temp').innerHTML).toBe('-22°'));
    await waitFor(() => expect(screen.getByTestId('description').innerHTML).toBe('переменная облачность'));
    await waitFor(() => expect(screen.getByTestId('block-1').innerHTML).toBe('2 м/с, западный'));
    await waitFor(() => expect(screen.getByTestId('block-2').innerHTML).toBe('770 мм рт. ст.'));
    await waitFor(() => expect(screen.getByTestId('block-3').innerHTML).toBe('99%'));
    await waitFor(() => expect(screen.getByTestId('block-4').innerHTML).toBe('3%'));

    expect(scope1.isDone()).toBeTruthy();
    expect(scope2.isDone()).toBeTruthy();
  });

  it('should render start page', async () => {
    const content = {
      firstPart: fakeData.moscowCurWeatherData,
      secondPart: fakeData.moscowHurlyWeatherData,
    };

    const scope1 = getScope(content.firstPart, 'weather');
    const scope2 = getScope(content.secondPart, 'onecall');

    renderWithRedux(<App />, { state: initState });

    await waitFor(() => expect(screen.getByTestId('cityName').innerHTML).toBe('Выберите город'));
    await waitFor(() => expect(screen.getByTestId('description').innerHTML).toBe('Не удалось определить местоположение'));

    expect(scope1.isDone()).toBeFalsy();
    expect(scope2.isDone()).toBeFalsy();
  });
});
