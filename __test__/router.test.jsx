import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AppRouter from '../src/app/components/AppRouter.jsx';

describe('AppRouter', () => {
  it('should render start page', () => {
    render(<AppRouter />);
    expect(screen.getByText(/выберите город/i)).toBeInTheDocument();
    expect(screen.getByText(/Не удалось определить местоположение/i)).toBeInTheDocument();
  });

  it('should render desktop page', () => {
    window.history.replaceState({}, undefined, '/desktop');
    render(<AppRouter />);
    expect(screen.queryByText(/выберите город/i)).not.toBeInTheDocument();
    expect(screen.getByTestId('cityName').innerHTML).toBe('Омск');
    expect(screen.getByTestId('temp').innerHTML).toBe('19°');
    expect(screen.getByTestId('description').innerHTML).toBe('Преимущественно солнечно');
  });
  it('should render mobile page', () => {
    window.history.replaceState({}, undefined, '/mobile');
    render(<AppRouter />);
    expect(screen.getByTestId('temp').innerHTML).toBe('14°');
    expect(screen.getByTestId('description').innerHTML).toBe('Дождь');
  });

  it('should render start page second time', () => {
    window.history.replaceState({}, undefined, '/');
    const IsoletedAppRouter = AppRouter.bind({});
    render(<IsoletedAppRouter />);
    expect(screen.getByText(/выберите город/i)).toBeInTheDocument();
    expect(screen.getByText(/Данные не загружены/i)).toBeInTheDocument();
  });
});
