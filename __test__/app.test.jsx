import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import nock from 'nock';
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

describe('App', () => {
  const content = {
    firstPart: fakeData.urupinskCurWeatherData,
    secondPart: fakeData.urupinskHurlyWeatherData,
  };

  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(() => null),
        setItem: jest.fn(() => null),
        removeItem: jest.fn(() => null),
      },
      writable: true,
    });
  });

  afterEach(() => {
    nock.cleanAll();
    jest.clearAllMocks();
  });

  it('should render page with geolocation data', async () => {
    const scope1 = nock(url.origin)
      .get(`${url.pathname}/weather`)
      .query(() => true)
      .reply(200, content.firstPart, { 'Access-Control-Allow-Origin': '*' });
    const scope2 = nock(url.origin)
      .get(`${url.pathname}/onecall`)
      .query(() => true)
      .reply(200, content.secondPart, { 'Access-Control-Allow-Origin': '*' });

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
});
