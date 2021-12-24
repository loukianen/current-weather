import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import reducer from '../src/app/reducers/index';
import { initState } from '../src/app/utils';
import CitySelection from '../src/app/components/CitySelection.jsx';
import getCityData from '../__fixtures__/fakeCityData';

const modifiedState = { ...initState, appMode: 'selection' };

const renderWithRedux = (
  component,
  { state, store = createStore(reducer, state, compose(applyMiddleware(thunk))) } = {},
) => ({
  ...render(<Provider store={store}>{component}</Provider>),
  store,
});

describe('CitySelection', () => {
  it('should show right amount of variants', () => {
    const maxVariantsInList = 7;

    renderWithRedux(<CitySelection getCityData={getCityData} />, { state: modifiedState });
    expect(screen.getByRole('textbox')).toHaveFocus();

    userEvent.type(screen.getByRole('textbox'), 'мо');
    expect(screen.getAllByTestId('city-variant').length).toBe(3);

    userEvent.type(screen.getByRole('textbox'), 'С');
    expect(screen.getAllByTestId('city-variant').length).toBe(2);

    userEvent.type(screen.getByRole('textbox'), 'р');
    expect(screen.queryAllByTestId('city-variant').length).toBe(0);

    userEvent.keyboard('{backspace}');
    userEvent.type(screen.getByRole('textbox'), 'к');
    expect(screen.getAllByTestId('city-variant').length).toBe(1);

    userEvent.keyboard('{backspace}');
    userEvent.keyboard('{backspace}');
    userEvent.keyboard('{backspace}');
    userEvent.keyboard('{backspace}');
    expect(screen.getAllByTestId('city-variant').length).toBe(maxVariantsInList);
    expect(screen.getByRole('textbox')).toHaveFocus();
  });

  it('should choose a city from the list by keyboard', () => {
    renderWithRedux(<CitySelection getCityData={getCityData} />, { state: modifiedState });

    userEvent.type(screen.getByRole('textbox'), 'м');
    userEvent.keyboard('{arrowdown}');
    expect(screen.getAllByTestId('city-variant')[0]).toHaveFocus();

    userEvent.keyboard('{arrowdown}');
    expect(screen.getAllByTestId('city-variant')[1]).toHaveFocus();

    userEvent.keyboard('{enter}');
    expect(screen.getByRole('textbox')).toHaveValue('Мосальск, Калужская область');

    userEvent.keyboard('{arrowdown}');
    expect(screen.getAllByTestId('city-variant')[2]).toHaveFocus();

    userEvent.keyboard('{enter}');
    expect(screen.getByRole('textbox')).toHaveValue('Москва, Москва');

    userEvent.keyboard('{arrowup}');
    userEvent.keyboard('{arrowup}');
    userEvent.keyboard('{arrowup}');
    expect(screen.getByRole('textbox')).toHaveFocus();
  });

  it('should choose a city from the list by mouse', () => {
    renderWithRedux(<CitySelection getCityData={getCityData} />, { state: modifiedState });

    userEvent.type(screen.getByRole('textbox'), 'м');

    userEvent.click(screen.getAllByTestId('city-variant')[1]);
    expect(screen.getByRole('textbox')).toHaveValue('Мосальск, Калужская область');

    userEvent.click(screen.getAllByTestId('city-variant')[2]);
    expect(screen.getByRole('textbox')).toHaveValue('Москва, Москва');
  });
});
