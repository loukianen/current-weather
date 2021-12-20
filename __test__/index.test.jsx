import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import AppRouter from '../src/app/components/AppRouter.jsx';

describe('React Router', () => {
  it('should render start page', () => {
    const { getByText } = render(<AppRouter />);
    expect(getByText(/выберите город/i)).toBeInTheDocument();
    expect(getByText(/Не удалось определить местоположение/i)).toBeInTheDocument();
  });

  it('should render desktop page', () => {
    window.history.replaceState({}, undefined, '/desktop');
    const { getByTestId, queryByText } = render(<AppRouter />);
    expect(queryByText(/выберите город/i)).not.toBeInTheDocument();
    expect(getByTestId('cityName').innerHTML).toBe('Омск');
    expect(getByTestId('temp').innerHTML).toBe('19°');
    expect(getByTestId('description').innerHTML).toBe('Преимущественно солнечно');
  });

  it('should render mobile page', () => {
    window.history.replaceState({}, undefined, '/mobile');
    const { getByTestId } = render(<AppRouter />);
    expect(getByTestId('temp').innerHTML).toBe('14°');
    expect(getByTestId('description').innerHTML).toBe('Дождь');
  });
});
