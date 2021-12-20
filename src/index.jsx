import './css/style.css';
import React from 'react';
import { render } from 'react-dom';
import AppRouter from './app/components/AppRouter.jsx';

render(
  <AppRouter />,
  document.getElementById('main'),
);
