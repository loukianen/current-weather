import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

let customeStorage = {};

const getScope = (content, apiType) => nock(url.origin)
  .get(`${url.pathname}/${apiType}`)
  .query(() => true)
  .reply(200, content, { 'Access-Control-Allow-Origin': '*' });

const doBeforeTest = () => {
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
};

const doAfterTest = () => {
  nock.cleanAll();
  jest.clearAllMocks();
  customeStorage = {};
  navigator.geolocation = null;
};

describe('App. Check StoreProvider', () => {
  beforeEach(() => {
    doBeforeTest();
  });

  afterEach(() => {
    doAfterTest();
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

    await waitFor(() => expect(screen.getByTestId('cityName')).toHaveTextContent('Урюпинск'));
    await waitFor(() => expect(screen.getByTestId('temp')).toHaveTextContent('-15°'));
    await waitFor(() => expect(screen.getByTestId('description')).toHaveTextContent('пасмурно'));
    await waitFor(() => expect(screen.getByTestId('block-1')).toHaveTextContent('5 м/с, северо-западный'));
    await waitFor(() => expect(screen.getByTestId('block-2')).toHaveTextContent('761 мм рт. ст.'));
    await waitFor(() => expect(screen.getByTestId('block-3')).toHaveTextContent('85%'));
    await waitFor(() => expect(screen.getByTestId('block-4')).toHaveTextContent('0%'));

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

    await waitFor(() => expect(screen.getByTestId('cityName')).toHaveTextContent('Москва'));
    await waitFor(() => expect(screen.getByTestId('temp')).toHaveTextContent('-22°'));
    await waitFor(() => expect(screen.getByTestId('description')).toHaveTextContent('переменная облачность'));
    await waitFor(() => expect(screen.getByTestId('block-1')).toHaveTextContent('2 м/с, западный'));
    await waitFor(() => expect(screen.getByTestId('block-2')).toHaveTextContent('770 мм рт. ст.'));
    await waitFor(() => expect(screen.getByTestId('block-3')).toHaveTextContent('99%'));
    await waitFor(() => expect(screen.getByTestId('block-4')).toHaveTextContent('3%'));

    expect(scope1.isDone()).toBeTruthy();
    expect(scope2.isDone()).toBeTruthy();
  });

  it('should render start page', () => {
    const content = {
      firstPart: fakeData.moscowCurWeatherData,
      secondPart: fakeData.moscowHurlyWeatherData,
    };

    const scope1 = getScope(content.firstPart, 'weather');
    const scope2 = getScope(content.secondPart, 'onecall');

    renderWithRedux(<App />, { state: initState });

    expect(screen.getByTestId('cityName')).toHaveTextContent('Выберите город');
    expect(screen.getByTestId('description')).toHaveTextContent('Не удалось определить местоположение');

    expect(scope1.isDone()).toBeFalsy();
    expect(scope2.isDone()).toBeFalsy();
  });
});

describe('App. Check buttons.', () => {
  beforeEach(() => {
    doBeforeTest();
  });

  afterEach(() => {
    doAfterTest();
  });
  it('check right working "My geoposition" button', async () => {
    renderWithRedux(<App />, { state: initState });

    expect(screen.getByTestId('cityName')).toHaveTextContent('Выберите город');
    expect(screen.getByTestId('description')).toHaveTextContent('Не удалось определить местоположение');

    navigator.geolocation = { getCurrentPosition: (cb) => cb(fakeData.geolocationData) };

    const content = {
      firstPart: fakeData.urupinskCurWeatherData,
      secondPart: fakeData.urupinskHurlyWeatherData,
    };

    getScope(content.firstPart, 'weather');
    getScope(content.secondPart, 'onecall');

    userEvent.click(screen.getByTestId('get-geo-btn'));

    await waitFor(() => expect(screen.getByTestId('cityName')).toHaveTextContent('Урюпинск'));
    await waitFor(() => expect(screen.getByTestId('description')).toHaveTextContent('пасмурно'));
  });

  it('check right working "Choose city" button', () => {
    renderWithRedux(<App />, { state: initState });

    expect(screen.getByText('Выберите город')).toBeInTheDocument();
    expect(screen.getByTestId('measure-block')).toBeInTheDocument();
    expect(screen.queryByTestId('city-selection')).not.toBeInTheDocument();

    userEvent.click(screen.getByTestId('change-city-btn'));
    expect(screen.queryByText('Выберите город')).not.toBeInTheDocument();
    expect(screen.getByTestId('measure-block')).toBeInTheDocument();
    expect(screen.getByTestId('city-selection')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveFocus();

    userEvent.keyboard('{Esc}');
    expect(screen.getByText('Выберите город')).toBeInTheDocument();
    expect(screen.getByTestId('measure-block')).toBeInTheDocument();
    expect(screen.queryByTestId('city-selection')).not.toBeInTheDocument();
  });
});

describe('App. Check MeasureUnitsSwitch', () => {
  beforeEach(() => {
    doBeforeTest();
  });

  afterEach(() => {
    doAfterTest();
  });

  it('should render temperature value depend a degrees type', async () => {
    renderWithRedux(<App />, { state: initState });
    // checking after first render
    await waitFor(() => expect(screen.getByTestId('measure-block')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByTestId('temp').innerHTML).toBe('19°'));
    await waitFor(() => expect(screen.getByTestId('button-c')).toBeDisabled());
    await waitFor(() => expect(screen.getByTestId('button-f')).toBeEnabled());
    await waitFor(() => expect(screen.getByTestId('button-c')).toHaveClass('active-button'));
    await waitFor(() => expect(screen.getByTestId('button-f')).toHaveClass('not-active-button'));

    userEvent.click(screen.getByTestId('button-f'));
    await waitFor(() => expect(screen.getByTestId('temp').innerHTML).toBe('66°'));
    await waitFor(() => expect(screen.getByTestId('button-f')).toBeDisabled());
    await waitFor(() => expect(screen.getByTestId('button-c')).toBeEnabled());
    await waitFor(() => expect(screen.getByTestId('button-f')).toHaveClass('active-button'));
    await waitFor(() => expect(screen.getByTestId('button-c')).toHaveClass('not-active-button'));
    // if click one more time, nothing should happen
    userEvent.click(screen.getByTestId('button-f'));
    await waitFor(() => expect(screen.getByTestId('temp').innerHTML).toBe('66°'));
    await waitFor(() => expect(screen.getByTestId('button-f')).toBeDisabled());
    await waitFor(() => expect(screen.getByTestId('button-c')).toBeEnabled());
    await waitFor(() => expect(screen.getByTestId('button-f')).toHaveClass('active-button'));
    await waitFor(() => expect(screen.getByTestId('button-c')).toHaveClass('not-active-button'));

    userEvent.click(screen.getByTestId('button-c'));
    await waitFor(() => expect(screen.getByTestId('temp').innerHTML).toBe('19°'));
    await waitFor(() => expect(screen.getByTestId('button-c')).toBeDisabled());
    await waitFor(() => expect(screen.getByTestId('button-f')).toBeEnabled());
    await waitFor(() => expect(screen.getByTestId('button-c')).toHaveClass('active-button'));
    await waitFor(() => expect(screen.getByTestId('button-f')).toHaveClass('not-active-button'));
  });
});

describe('App. Check loading data', () => {
  beforeEach(() => {
    doBeforeTest();
  });

  afterEach(() => {
    doAfterTest();
  });
  it('with chosen city name', async () => {
    const contentForFirstRequest = {
      firstPart: fakeData.urupinskCurWeatherData,
      secondPart: fakeData.urupinskHurlyWeatherData,
    };
    const contentForSecondRequest = {
      firstPart: fakeData.moscowCurWeatherData,
      secondPart: fakeData.moscowHurlyWeatherData,
    };

    const scope11 = getScope(contentForFirstRequest.firstPart, 'weather');
    const scope12 = getScope(contentForFirstRequest.secondPart, 'onecall');
    const scope21 = nock(url.origin)
      .get(`${url.pathname}/weather`)
      .query((queryParts) => (queryParts.lat === '55.753215' && queryParts.lon === '37.622504'))
      .reply(200, contentForSecondRequest.firstPart, { 'Access-Control-Allow-Origin': '*' });
    const scope22 = getScope(contentForSecondRequest.secondPart, 'onecall');

    window.localStorage.setItem('currentWeatherCoords', fakeData.localStorageData);

    renderWithRedux(<App />, { state: initState });

    userEvent.click(screen.getByTestId('change-city-btn'));
    userEvent.type(screen.getByRole('textbox'), 'москва');
    userEvent.keyboard('{arrowdown}');
    userEvent.keyboard('{enter}');
    userEvent.keyboard('{arrowup}');
    userEvent.keyboard('{enter}');

    await waitFor(() => expect(screen.getByTestId('cityName')).toHaveTextContent('Москва'));

    expect(scope11.isDone()).toBeTruthy();
    expect(scope12.isDone()).toBeTruthy();
    expect(scope21.isDone()).toBeTruthy();
    expect(scope22.isDone()).toBeTruthy();
  });

  it('with inputted city name', async () => {
    const contentForFirstRequest = {
      firstPart: fakeData.urupinskCurWeatherData,
      secondPart: fakeData.urupinskHurlyWeatherData,
    };
    const contentForSecondRequest = {
      firstPart: { ...fakeData.moscowCurWeatherData, name: 'Moscow' },
      secondPart: fakeData.moscowHurlyWeatherData,
    };

    const scope11 = getScope(contentForFirstRequest.firstPart, 'weather');
    const scope12 = getScope(contentForFirstRequest.secondPart, 'onecall');
    const scope21 = nock(url.origin)
      .get(`${url.pathname}/weather`)
      .query((queryParts) => (queryParts.q === 'moscow'))
      .reply(200, contentForSecondRequest.firstPart, { 'Access-Control-Allow-Origin': '*' });
    const scope22 = getScope(contentForSecondRequest.secondPart, 'onecall');

    window.localStorage.setItem('currentWeatherCoords', fakeData.localStorageData);

    renderWithRedux(<App />, { state: initState });

    userEvent.click(screen.getByTestId('change-city-btn'));
    userEvent.type(screen.getByRole('textbox'), 'moscow');
    expect(screen.queryAllByTestId('city-variant').length).toBe(0);

    userEvent.keyboard('{enter}');

    await waitFor(() => expect(screen.getByTestId('cityName')).toHaveTextContent('Moscow'));

    expect(scope11.isDone()).toBeTruthy();
    expect(scope12.isDone()).toBeTruthy();
    expect(scope21.isDone()).toBeTruthy();
    expect(scope22.isDone()).toBeTruthy();
  });

  it('with unacceptable city name', async () => {
    const content = {
      firstPart: fakeData.urupinskCurWeatherData,
      secondPart: fakeData.urupinskHurlyWeatherData,
    };

    const scope1 = getScope(content.firstPart, 'weather');
    const scope2 = getScope(content.secondPart, 'onecall');
    const scope3 = nock(url.origin)
      .get(`${url.pathname}/weather`)
      .query(() => true)
      .reply(500, undefined, { 'Access-Control-Allow-Origin': '*' });

    window.localStorage.setItem('currentWeatherCoords', fakeData.localStorageData);

    renderWithRedux(<App />, { state: initState });

    userEvent.click(screen.getByTestId('change-city-btn'));
    userEvent.type(screen.getByRole('textbox'), 'fgfgfgfgfgf');
    expect(screen.queryAllByTestId('city-variant').length).toBe(0);

    userEvent.keyboard('{enter}');

    await waitFor(() => expect(screen.getByTestId('cityName')).toHaveTextContent('Урюпинск'));
    await waitFor(() => expect(screen.getByTestId('description'))
      .toHaveTextContent('Не удалось загрузить данные'));

    expect(scope1.isDone()).toBeTruthy();
    expect(scope2.isDone()).toBeTruthy();
    expect(scope3.isDone()).toBeTruthy();
  });
});
