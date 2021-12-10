import './css/style.css';
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StoreProvider from './app/components/StoreProvider.jsx';

render(
  <Router>
    <Routes>
      <Route exact path="/" element={<StoreProvider />} />
      <Route path="/desktop" element={<StoreProvider mode="desktop" />} />
      <Route path="/mobile" element={<StoreProvider mode="mobile" />} />
      <Route path="*" element={<StoreProvider />} />
    </Routes>
  </Router>,
  document.getElementById('main'),
);
